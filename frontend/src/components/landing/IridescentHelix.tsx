import { useEffect, useRef } from 'react';

export function IridescentHelix({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = x * 0.4;
      targetTiltY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particles floating around
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 500,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 300,
      size: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.5 ? 280 : 195,
      alpha: Math.random() * 0.7 + 0.2,
    }));

    const render = () => {
      time += 0.016;
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.52;
      const centerY = height * 0.48;

      // Draw subtle background radial ambient glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        30,
        centerX,
        centerY,
        width * 0.5
      );
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
      glowGrad.addColorStop(0.4, 'rgba(59, 130, 246, 0.18)');
      glowGrad.addColorStop(0.8, 'rgba(6, 182, 212, 0.05)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Render floating particles in background
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -300) p.y = 300;
        const pScale = 400 / (400 + p.z);
        const px = centerX + p.x * pScale;
        const py = centerY + p.y * pScale;

        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * pScale, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Parametric 3D Iridescent Spiral Helix ─────────────────────
      // Coils: 4.8 turns, expanding slightly toward the top
      const turns = 4.8;
      const totalPoints = 360;
      const radiusBase = Math.min(width, height) * 0.28;
      const totalHeight = Math.min(width, height) * 0.76;
      const tubeRadius = Math.min(width, height) * 0.052;

      // Rotation angles with gentle floating wobble
      const rotY = time * 0.75 + currentTiltX * 2.2;
      const tiltAngle = -0.42 + Math.sin(time * 0.8) * 0.04 + currentTiltY;
      const slantAngle = 0.25; // diagonal lean

      // Generate points on the helical spine
      interface HelixPoint {
        x: number;
        y: number;
        z: number;
        t: number;
        nx: number;
        ny: number;
        nz: number;
        screenX: number;
        screenY: number;
        scale: number;
      }

      const points: HelixPoint[] = [];

      for (let i = 0; i <= totalPoints; i++) {
        const progress = i / totalPoints; // 0 to 1
        const theta = progress * turns * Math.PI * 2;

        // Radius expands gracefully toward top (tornado/spiral aesthetic in ref image)
        const currentRadius = radiusBase * (0.65 + progress * 0.5);
        const yPos = (progress - 0.5) * totalHeight;

        // Base 3D coordinate
        let x = currentRadius * Math.cos(theta + rotY);
        let y = yPos;
        let z = currentRadius * Math.sin(theta + rotY);

        // Apply pitch tilt (around X)
        const cosTilt = Math.cos(tiltAngle);
        const sinTilt = Math.sin(tiltAngle);
        const y1 = y * cosTilt - z * sinTilt;
        const z1 = y * sinTilt + z * cosTilt;

        // Apply roll/slant (around Z)
        const cosSlant = Math.cos(slantAngle);
        const sinSlant = Math.sin(slantAngle);
        const x2 = x * cosSlant - y1 * sinSlant;
        const y2 = x * sinSlant + y1 * cosSlant;

        // Perspective projection
        const fov = 500;
        const depth = fov / (fov + z1 + 180);
        const screenX = centerX + x2 * depth;
        const screenY = centerY + y2 * depth;

        points.push({
          x: x2,
          y: y2,
          z: z1,
          t: progress,
          nx: Math.cos(theta + rotY),
          ny: 0,
          nz: Math.sin(theta + rotY),
          screenX,
          screenY,
          scale: depth,
        });
      }

      // Group into segments to draw with depth sorting
      interface Segment {
        p1: HelixPoint;
        p2: HelixPoint;
        avgZ: number;
        index: number;
      }

      const segments: Segment[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        segments.push({
          p1: points[i],
          p2: points[i + 1],
          avgZ: (points[i].z + points[i + 1].z) * 0.5,
          index: i,
        });
      }

      // Sort back-to-front (painter's algorithm)
      segments.sort((a, b) => a.avgZ - b.avgZ);

      // Draw each tube segment with iridescent glass shaders
      segments.forEach((seg) => {
        const { p1, p2, avgZ } = seg;
        const currentScale = (p1.scale + p2.scale) * 0.5;
        const r = tubeRadius * currentScale;
        const tVal = (p1.t + p2.t) * 0.5;

        // Chromatic dispersion hue shifts along the spiral length and rotation
        const huePhase = (tVal * 360 * 2.5 + time * 45 + avgZ * 0.3) % 360;

        // 1. Soft Outermost Iridescent Glow Pass
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Depth fog / translucency
        const depthAlpha = Math.min(
          1,
          Math.max(0.2, (avgZ + 150) / 300)
        );

        // Glow stroke
        ctx.lineWidth = r * 2.8;
        const glowColor = `hsla(${huePhase}, 95%, 65%, ${0.18 * depthAlpha})`;
        ctx.strokeStyle = glowColor;
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);
        ctx.stroke();

        // 2. Glass Base Body (Transparent Cyan/Blue/Violet)
        ctx.lineWidth = r * 2.0;
        const bodyGrad = ctx.createLinearGradient(
          p1.screenX - r,
          p1.screenY - r,
          p1.screenX + r,
          p1.screenY + r
        );
        // Rainbow caustic stops matching the reference image's chromatic dispersion
        bodyGrad.addColorStop(0.0, `hsla(${(huePhase + 60) % 360}, 95%, 70%, ${0.85 * depthAlpha})`); // Magenta/Cyan
        bodyGrad.addColorStop(0.25, `hsla(${(huePhase + 180) % 360}, 100%, 65%, ${0.9 * depthAlpha})`); // Electric Blue
        bodyGrad.addColorStop(0.55, `hsla(${(huePhase + 240) % 360}, 95%, 60%, ${0.85 * depthAlpha})`); // Royal Blue/Violet
        bodyGrad.addColorStop(0.8, `hsla(${(huePhase + 320) % 360}, 100%, 72%, ${0.85 * depthAlpha})`); // Golden Lime / Pink
        bodyGrad.addColorStop(1.0, `hsla(${(huePhase + 40) % 360}, 90%, 80%, ${0.9 * depthAlpha})`);

        ctx.strokeStyle = bodyGrad;
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);
        ctx.stroke();

        // 3. Inner Refraction Core (Bright Liquid Light)
        ctx.lineWidth = r * 1.0;
        const innerGrad = ctx.createLinearGradient(
          p1.screenX,
          p1.screenY - r * 0.5,
          p1.screenX,
          p1.screenY + r * 0.5
        );
        innerGrad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * depthAlpha})`);
        innerGrad.addColorStop(0.5, `hsla(${(huePhase + 190) % 360}, 100%, 80%, ${0.7 * depthAlpha})`);
        innerGrad.addColorStop(1, `hsla(${(huePhase + 310) % 360}, 100%, 75%, ${0.35 * depthAlpha})`);

        ctx.strokeStyle = innerGrad;
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);
        ctx.stroke();

        // 4. Razor-Sharp Specular Glass Highlight (Pure White Gloss Glare)
        ctx.lineWidth = Math.max(1.5, r * 0.35);
        // Slightly offset along normal for edge sheen
        const dx = p2.screenX - p1.screenX;
        const dy = p2.screenY - p1.screenY;
        const len = Math.hypot(dx, dy) || 1;
        const offsetDist = r * 0.55;
        const ox = (-dy / len) * offsetDist;
        const oy = (dx / len) * offsetDist;

        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.95, 0.45 + (avgZ > 0 ? 0.45 : 0.1))})`;
        ctx.beginPath();
        ctx.moveTo(p1.screenX + ox, p1.screenY + oy);
        ctx.lineTo(p2.screenX + ox, p2.screenY + oy);
        ctx.stroke();

        // 5. Secondary Rim Specular
        ctx.lineWidth = Math.max(1, r * 0.15);
        ctx.strokeStyle = `hsla(${(huePhase + 90) % 360}, 100%, 90%, ${0.5 * depthAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.screenX - ox * 0.6, p1.screenY - oy * 0.6);
        ctx.lineTo(p2.screenX - ox * 0.6, p2.screenY - oy * 0.6);
        ctx.stroke();

        ctx.restore();
      });

      // Render top and bottom end caps with caustic flare
      if (points.length > 0) {
        const topPt = points[points.length - 1];
        const rTop = tubeRadius * topPt.scale * 1.1;
        ctx.save();
        ctx.beginPath();
        ctx.arc(topPt.screenX, topPt.screenY, rTop, 0, Math.PI * 2);
        const capGrad = ctx.createRadialGradient(
          topPt.screenX - rTop * 0.3,
          topPt.screenY - rTop * 0.3,
          rTop * 0.1,
          topPt.screenX,
          topPt.screenY,
          rTop
        );
        capGrad.addColorStop(0, '#ffffff');
        capGrad.addColorStop(0.3, '#38bdf8');
        capGrad.addColorStop(0.7, '#c084fc');
        capGrad.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
        ctx.fillStyle = capGrad;
        ctx.fill();

        // White flare star
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(topPt.screenX - rTop * 1.5, topPt.screenY);
        ctx.lineTo(topPt.screenX + rTop * 1.5, topPt.screenY);
        ctx.moveTo(topPt.screenX, topPt.screenY - rTop * 1.5);
        ctx.lineTo(topPt.screenX, topPt.screenY + rTop * 1.5);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-auto ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[620px] max-h-[620px] object-contain drop-shadow-[0_20px_50px_rgba(168,85,247,0.25)]"
      />
    </div>
  );
}
