import type {
  Course,
  LearnerProfile,
  SourceMaterial,
  Concept,
  ConceptEdge,
  KnowledgeGraph,
  ChatMessage,
  ConversationSession,
  Quiz,
  Question,
  QuestionFeedback,
  AssessmentReport,
  RootCauseDiagnosis,
  StudyPlan,
  EvalRun,
  EvalMetric,
  EvalTestCase,
  DashboardSummary,
  ActivityItem,
  MasteryDataPoint,
  Recommendation,
  TopicPerformance,
  Misconception,
} from '@/types';

// ─── Course ─────────────────────────────────────────────────

export const demoCourse: Course = {
  id: 'course-calc-101',
  name: 'Calculus I',
  description: 'Introduction to differential calculus, limits, derivatives, and applications',
  materialCount: 4,
  conceptCount: 12,
  createdAt: '2026-09-01T10:00:00Z',
};

export const demoCourses: Course[] = [
  demoCourse,
  {
    id: 'course-linalg-201',
    name: 'Linear Algebra',
    description: 'Vectors, matrices, transformations, and eigenvalues',
    materialCount: 3,
    conceptCount: 9,
    createdAt: '2026-09-15T10:00:00Z',
  },
];

// ─── Learner Profile ────────────────────────────────────────

export const demoProfile: LearnerProfile = {
  id: 'learner-001',
  name: 'Deepak',
  email: 'deepak@university.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
  learningGoal: "Let's turn your questions into understanding.",
  examDate: '2026-11-15',
  preferredLanguage: 'en',
  confidenceLevel: 'intermediate',
  activeCourseId: 'course-calc-101',
};

// ─── Source Materials ───────────────────────────────────────

export const demoMaterials: SourceMaterial[] = [
  {
    id: 'src-001',
    courseId: 'course-calc-101',
    filename: 'Lecture 5 - Chain Rule.pdf',
    sourceType: 'pdf',
    fileSize: 2_400_000,
    uploadedAt: '2026-09-20T14:30:00Z',
    status: 'ready',
    extractedUnits: 42,
    associatedConcepts: 6,
  },
  {
    id: 'src-002',
    courseId: 'course-calc-101',
    filename: 'Derivatives Overview.pptx',
    sourceType: 'pptx',
    fileSize: 5_100_000,
    uploadedAt: '2026-09-22T09:15:00Z',
    status: 'ready',
    extractedUnits: 28,
    associatedConcepts: 5,
  },
  {
    id: 'src-003',
    courseId: 'course-calc-101',
    filename: 'Function Composition Explained.mp4',
    sourceType: 'video',
    fileSize: 45_000_000,
    uploadedAt: '2026-09-25T16:00:00Z',
    status: 'ready',
    extractedUnits: 15,
    associatedConcepts: 3,
  },
  {
    id: 'src-004',
    courseId: 'course-calc-101',
    filename: 'Integration Basics.pdf',
    sourceType: 'pdf',
    fileSize: 1_800_000,
    uploadedAt: '2026-10-01T11:00:00Z',
    status: 'building_concepts',
    extractedUnits: 0,
    associatedConcepts: 0,
  },
];

// ─── Concepts ───────────────────────────────────────────────

export const demoConcepts: Concept[] = [
  {
    id: 'c-limits',
    name: 'Limits',
    definition: 'The value that a function approaches as the input approaches some value.',
    mastery: 85,
    importance: 'high',
    lastReviewed: '2026-10-05T10:00:00Z',
    misconceptions: [],
    prerequisites: [],
    relatedSourceIds: ['src-001'],
    topic: 'Foundations',
  },
  {
    id: 'c-continuity',
    name: 'Continuity',
    definition: 'A function is continuous at a point if the limit equals the function value.',
    mastery: 78,
    importance: 'medium',
    lastReviewed: '2026-10-04T14:00:00Z',
    misconceptions: [],
    prerequisites: ['c-limits'],
    relatedSourceIds: ['src-001'],
    topic: 'Foundations',
  },
  {
    id: 'c-func-composition',
    name: 'Function Composition',
    definition: 'Combining two functions where the output of one becomes the input of another: (f ∘ g)(x) = f(g(x)).',
    mastery: 38,
    importance: 'high',
    lastReviewed: '2026-10-02T09:00:00Z',
    reviewDue: '2026-10-10T09:00:00Z',
    misconceptions: [
      {
        id: 'mis-001',
        description: 'Confusing f(g(x)) with f(x)·g(x)',
        conceptId: 'c-func-composition',
        frequency: 3,
        correction: 'Function composition means substituting g(x) into f, not multiplying the two functions.',
      },
    ],
    prerequisites: [],
    relatedSourceIds: ['src-003'],
    topic: 'Functions',
  },
  {
    id: 'c-derivative-def',
    name: 'Derivative Definition',
    definition: 'The derivative of f at x is the limit of the difference quotient: f\'(x) = lim_{h→0} [f(x+h) - f(x)] / h.',
    mastery: 71,
    importance: 'high',
    lastReviewed: '2026-10-06T11:00:00Z',
    misconceptions: [],
    prerequisites: ['c-limits'],
    relatedSourceIds: ['src-001', 'src-002'],
    topic: 'Derivatives',
  },
  {
    id: 'c-power-rule',
    name: 'Power Rule',
    definition: 'For f(x) = xⁿ, the derivative is f\'(x) = nxⁿ⁻¹.',
    mastery: 88,
    importance: 'medium',
    lastReviewed: '2026-10-07T10:00:00Z',
    misconceptions: [],
    prerequisites: ['c-derivative-def'],
    relatedSourceIds: ['src-002'],
    topic: 'Derivatives',
  },
  {
    id: 'c-product-rule',
    name: 'Product Rule',
    definition: 'For h(x) = f(x)·g(x), the derivative is h\'(x) = f\'(x)g(x) + f(x)g\'(x).',
    mastery: 65,
    importance: 'medium',
    lastReviewed: '2026-10-05T15:00:00Z',
    misconceptions: [],
    prerequisites: ['c-derivative-def'],
    relatedSourceIds: ['src-002'],
    topic: 'Derivatives',
  },
  {
    id: 'c-chain-rule',
    name: 'Chain Rule',
    definition: 'For h(x) = f(g(x)), the derivative is h\'(x) = f\'(g(x)) · g\'(x).',
    mastery: 52,
    importance: 'high',
    lastReviewed: '2026-10-06T16:00:00Z',
    reviewDue: '2026-10-09T16:00:00Z',
    misconceptions: [
      {
        id: 'mis-002',
        description: 'Forgetting to multiply by the inner derivative g\'(x)',
        conceptId: 'c-chain-rule',
        frequency: 4,
        correction: 'The Chain Rule requires multiplying the outer derivative by the derivative of the inner function.',
      },
    ],
    prerequisites: ['c-func-composition', 'c-derivative-def'],
    relatedSourceIds: ['src-001', 'src-003'],
    topic: 'Derivatives',
  },
  {
    id: 'c-implicit-diff',
    name: 'Implicit Differentiation',
    definition: 'Differentiating both sides of an equation with respect to x, treating y as a function of x.',
    mastery: 45,
    importance: 'medium',
    lastReviewed: '2026-10-03T13:00:00Z',
    misconceptions: [],
    prerequisites: ['c-chain-rule'],
    relatedSourceIds: ['src-001'],
    topic: 'Derivatives',
  },
  {
    id: 'c-related-rates',
    name: 'Related Rates',
    definition: 'Using the Chain Rule to find the rate at which one quantity changes with respect to time given related rates.',
    mastery: 30,
    importance: 'medium',
    reviewDue: '2026-10-11T10:00:00Z',
    misconceptions: [],
    prerequisites: ['c-implicit-diff', 'c-chain-rule'],
    relatedSourceIds: ['src-001'],
    topic: 'Applications',
  },
  {
    id: 'c-trig-derivatives',
    name: 'Trigonometric Derivatives',
    definition: 'Standard derivatives of sin, cos, tan and their inverses.',
    mastery: 60,
    importance: 'medium',
    lastReviewed: '2026-10-04T10:00:00Z',
    misconceptions: [],
    prerequisites: ['c-derivative-def'],
    relatedSourceIds: ['src-002'],
    topic: 'Derivatives',
  },
  {
    id: 'c-max-min',
    name: 'Maxima and Minima',
    definition: 'Finding local and global extrema using the first and second derivative tests.',
    mastery: 55,
    importance: 'high',
    lastReviewed: '2026-10-05T09:00:00Z',
    misconceptions: [],
    prerequisites: ['c-derivative-def', 'c-power-rule'],
    relatedSourceIds: ['src-002'],
    topic: 'Applications',
  },
  {
    id: 'c-mean-value',
    name: 'Mean Value Theorem',
    definition: 'If f is continuous on [a,b] and differentiable on (a,b), there exists c in (a,b) such that f\'(c) = [f(b)-f(a)]/(b-a).',
    mastery: 42,
    importance: 'medium',
    lastReviewed: '2026-10-02T11:00:00Z',
    misconceptions: [],
    prerequisites: ['c-continuity', 'c-derivative-def'],
    relatedSourceIds: ['src-001'],
    topic: 'Theorems',
  },
];

export const demoEdges: ConceptEdge[] = [
  { id: 'e-1', sourceId: 'c-limits', targetId: 'c-continuity', relationship: 'prerequisite' },
  { id: 'e-2', sourceId: 'c-limits', targetId: 'c-derivative-def', relationship: 'prerequisite' },
  { id: 'e-3', sourceId: 'c-derivative-def', targetId: 'c-power-rule', relationship: 'prerequisite' },
  { id: 'e-4', sourceId: 'c-derivative-def', targetId: 'c-product-rule', relationship: 'prerequisite' },
  { id: 'e-5', sourceId: 'c-func-composition', targetId: 'c-chain-rule', relationship: 'prerequisite' },
  { id: 'e-6', sourceId: 'c-derivative-def', targetId: 'c-chain-rule', relationship: 'prerequisite' },
  { id: 'e-7', sourceId: 'c-chain-rule', targetId: 'c-implicit-diff', relationship: 'prerequisite' },
  { id: 'e-8', sourceId: 'c-implicit-diff', targetId: 'c-related-rates', relationship: 'prerequisite' },
  { id: 'e-9', sourceId: 'c-chain-rule', targetId: 'c-related-rates', relationship: 'prerequisite' },
  { id: 'e-10', sourceId: 'c-derivative-def', targetId: 'c-trig-derivatives', relationship: 'prerequisite' },
  { id: 'e-11', sourceId: 'c-derivative-def', targetId: 'c-max-min', relationship: 'prerequisite' },
  { id: 'e-12', sourceId: 'c-power-rule', targetId: 'c-max-min', relationship: 'prerequisite' },
  { id: 'e-13', sourceId: 'c-continuity', targetId: 'c-mean-value', relationship: 'prerequisite' },
  { id: 'e-14', sourceId: 'c-derivative-def', targetId: 'c-mean-value', relationship: 'prerequisite' },
];

export const demoKnowledgeGraph: KnowledgeGraph = {
  concepts: demoConcepts,
  edges: demoEdges,
};

// ─── Chat / Tutor ───────────────────────────────────────────

export const demoConversations: ConversationSession[] = [
  {
    id: 'conv-001',
    courseId: 'course-calc-101',
    title: 'Understanding the Chain Rule',
    messageCount: 8,
    lastMessageAt: '2026-10-08T14:30:00Z',
    createdAt: '2026-10-08T13:00:00Z',
  },
  {
    id: 'conv-002',
    courseId: 'course-calc-101',
    title: 'Function Composition basics',
    messageCount: 5,
    lastMessageAt: '2026-10-07T10:15:00Z',
    createdAt: '2026-10-07T09:00:00Z',
  },
];

export const demoChatMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'user',
    content: 'Can you explain the Chain Rule using my lecture notes?',
    timestamp: '2026-10-08T13:00:00Z',
  },
  {
    id: 'msg-002',
    role: 'assistant',
    content: `The Chain Rule states that if you have a composite function h(x) = f(g(x)), then the derivative is:

h'(x) = f'(g(x)) · g'(x)

Think of it as peeling layers: first differentiate the outer function, keeping the inner function as-is, then multiply by the derivative of the inner function.

**From your lecture notes:** "When differentiating composite functions, always identify the outer and inner functions first. The Chain Rule multiplies their derivatives together."

For example, if h(x) = sin(x²), then:
- Outer function: f(u) = sin(u), so f'(u) = cos(u)
- Inner function: g(x) = x², so g'(x) = 2x
- Chain Rule: h'(x) = cos(x²) · 2x`,
    citations: [
      {
        id: 'cit-001',
        sourceId: 'src-001',
        sourceType: 'pdf',
        filename: 'Lecture 5 - Chain Rule.pdf',
        location: 'Page 12',
        pageNumber: 12,
        excerpt: 'When differentiating composite functions, always identify the outer and inner functions first.',
      },
      {
        id: 'cit-002',
        sourceId: 'src-003',
        sourceType: 'video',
        filename: 'Function Composition Explained.mp4',
        location: '12:41',
        timestamp: 761,
        excerpt: 'Think of composition as putting one function inside another.',
      },
    ],
    claims: [
      {
        id: 'claim-001',
        text: 'The Chain Rule states that if you have a composite function h(x) = f(g(x)), then the derivative is h\'(x) = f\'(g(x)) · g\'(x)',
        verification: 'supported',
        citations: [
          {
            id: 'cit-001',
            sourceId: 'src-001',
            sourceType: 'pdf',
            filename: 'Lecture 5 - Chain Rule.pdf',
            location: 'Page 12',
            pageNumber: 12,
            excerpt: 'When differentiating composite functions, always identify the outer and inner functions first.',
          },
        ],
      },
      {
        id: 'claim-002',
        text: 'Think of it as peeling layers: first differentiate the outer function, keeping the inner function as-is',
        verification: 'supported',
        citations: [
          {
            id: 'cit-002',
            sourceId: 'src-003',
            sourceType: 'video',
            filename: 'Function Composition Explained.mp4',
            location: '12:41',
            timestamp: 761,
            excerpt: 'Think of composition as putting one function inside another.',
          },
        ],
      },
    ],
    timestamp: '2026-10-08T13:01:00Z',
  },
  {
    id: 'msg-003',
    role: 'user',
    content: 'Why do I need function composition to understand the Chain Rule?',
    timestamp: '2026-10-08T13:05:00Z',
  },
  {
    id: 'msg-004',
    role: 'assistant',
    content: `Function composition is the foundation of the Chain Rule. You **must** understand how composite functions work before you can differentiate them.

**What is composition?** When you write f(g(x)), you're feeding the output of g into f. For example:
- g(x) = x² + 1 (inner function)
- f(u) = √u (outer function)
- f(g(x)) = √(x² + 1) (composite)

**Why it matters for the Chain Rule:** The Chain Rule breaks differentiation into layers that mirror the composition structure. If you can't identify the inner and outer functions, you can't apply the rule correctly.

Your lecture video explains this with a "machine analogy": each function is a machine, and composition chains them together.`,
    citations: [
      {
        id: 'cit-003',
        sourceId: 'src-003',
        sourceType: 'video',
        filename: 'Function Composition Explained.mp4',
        location: '5:23',
        timestamp: 323,
        excerpt: 'Each function is like a machine. Composition means chaining machines: the output of one feeds into the next.',
      },
    ],
    claims: [
      {
        id: 'claim-003',
        text: 'Function composition is the foundation of the Chain Rule',
        verification: 'supported',
        citations: [
          {
            id: 'cit-003',
            sourceId: 'src-003',
            sourceType: 'video',
            filename: 'Function Composition Explained.mp4',
            location: '5:23',
            timestamp: 323,
          },
        ],
      },
    ],
    timestamp: '2026-10-08T13:06:00Z',
  },
];

// ─── Quiz ───────────────────────────────────────────────────

export const demoQuestions: Question[] = [
  {
    id: 'q-001',
    quizId: 'quiz-001',
    text: 'If h(x) = (3x + 1)⁵, what is h\'(x)?',
    type: 'mcq',
    options: [
      '5(3x + 1)⁴',
      '15(3x + 1)⁴',
      '5(3x + 1)⁴ · 3',
      '(3x + 1)⁴',
    ],
    conceptId: 'c-chain-rule',
    difficulty: 'medium',
    order: 1,
  },
  {
    id: 'q-002',
    quizId: 'quiz-001',
    text: 'What is the derivative of sin(x²)?',
    type: 'mcq',
    options: [
      'cos(x²)',
      '2x · cos(x²)',
      'cos(2x)',
      '2x · sin(x²)',
    ],
    conceptId: 'c-chain-rule',
    difficulty: 'medium',
    order: 2,
  },
  {
    id: 'q-003',
    quizId: 'quiz-001',
    text: 'If f(x) = x² and g(x) = 3x + 1, what is (f ∘ g)(x)?',
    type: 'mcq',
    options: [
      '3x² + 1',
      '(3x + 1)²',
      '9x² + 1',
      'x²(3x + 1)',
    ],
    conceptId: 'c-func-composition',
    difficulty: 'easy',
    order: 3,
  },
  {
    id: 'q-004',
    quizId: 'quiz-001',
    text: 'What is the derivative of eˢⁱⁿ⁽ˣ⁾?',
    type: 'mcq',
    options: [
      'eˢⁱⁿ⁽ˣ⁾',
      'cos(x) · eˢⁱⁿ⁽ˣ⁾',
      'sin(x) · eˢⁱⁿ⁽ˣ⁾',
      'eᶜᵒˢ⁽ˣ⁾',
    ],
    conceptId: 'c-chain-rule',
    difficulty: 'hard',
    order: 4,
  },
  {
    id: 'q-005',
    quizId: 'quiz-001',
    text: 'Using the power rule, find the derivative of f(x) = 4x³.',
    type: 'mcq',
    options: [
      '12x²',
      '4x²',
      '12x³',
      '3x²',
    ],
    conceptId: 'c-power-rule',
    difficulty: 'easy',
    order: 5,
  },
];

export const demoQuiz: Quiz = {
  id: 'quiz-001',
  courseId: 'course-calc-101',
  config: {
    conceptIds: ['c-chain-rule', 'c-func-composition', 'c-power-rule'],
    questionCount: 5,
    questionType: 'mcq',
    difficulty: 'adaptive',
  },
  questions: demoQuestions,
  status: 'completed',
  startedAt: '2026-10-08T15:00:00Z',
  completedAt: '2026-10-08T15:25:00Z',
  score: 60,
};

export const demoFeedback: QuestionFeedback[] = [
  {
    questionId: 'q-001',
    isCorrect: false,
    correctAnswer: '15(3x + 1)⁴',
    explanation: 'Using the Chain Rule: the outer function is u⁵, derivative 5u⁴. The inner function is 3x+1, derivative 3. Multiply: 5(3x+1)⁴ · 3 = 15(3x+1)⁴.',
    misconceptionId: 'mis-002',
    citations: [
      {
        id: 'cit-fb-001',
        sourceId: 'src-001',
        sourceType: 'pdf',
        filename: 'Lecture 5 - Chain Rule.pdf',
        location: 'Page 14',
        pageNumber: 14,
        excerpt: 'Always multiply by the derivative of the inner function.',
      },
    ],
    learnerAnswer: '5(3x + 1)⁴',
    confidence: 'sure',
  },
  {
    questionId: 'q-002',
    isCorrect: true,
    correctAnswer: '2x · cos(x²)',
    explanation: 'Outer: sin(u) → cos(u). Inner: x² → 2x. Chain Rule gives cos(x²) · 2x.',
    citations: [],
    learnerAnswer: '2x · cos(x²)',
    confidence: 'maybe',
  },
  {
    questionId: 'q-003',
    isCorrect: false,
    correctAnswer: '(3x + 1)²',
    explanation: '(f ∘ g)(x) means f(g(x)). Substitute g(x) = 3x+1 into f(u) = u²: f(g(x)) = (3x+1)².',
    misconceptionId: 'mis-001',
    citations: [
      {
        id: 'cit-fb-002',
        sourceId: 'src-003',
        sourceType: 'video',
        filename: 'Function Composition Explained.mp4',
        location: '8:15',
        timestamp: 495,
        excerpt: 'Composition means substituting one function into another, not multiplying.',
      },
    ],
    learnerAnswer: '3x² + 1',
    confidence: 'sure',
  },
  {
    questionId: 'q-004',
    isCorrect: true,
    correctAnswer: 'cos(x) · eˢⁱⁿ⁽ˣ⁾',
    explanation: 'Outer: eᵘ → eᵘ. Inner: sin(x) → cos(x). Chain Rule gives cos(x) · eˢⁱⁿ⁽ˣ⁾.',
    citations: [],
    learnerAnswer: 'cos(x) · eˢⁱⁿ⁽ˣ⁾',
    confidence: 'guess',
  },
  {
    questionId: 'q-005',
    isCorrect: true,
    correctAnswer: '12x²',
    explanation: 'Power Rule: d/dx(4x³) = 4 · 3x² = 12x².',
    citations: [],
    learnerAnswer: '12x²',
    confidence: 'sure',
  },
];

// ─── Assessment Report ──────────────────────────────────────

const demoMisconceptions: Misconception[] = [
  {
    id: 'mis-001',
    description: 'Confusing f(g(x)) with f(x)·g(x)',
    conceptId: 'c-func-composition',
    frequency: 3,
    correction: 'Function composition means substituting g(x) into f, not multiplying.',
  },
  {
    id: 'mis-002',
    description: 'Forgetting to multiply by the inner derivative g\'(x)',
    conceptId: 'c-chain-rule',
    frequency: 4,
    correction: 'Always multiply by the derivative of the inner function when applying the Chain Rule.',
  },
];

const demoTopicPerformance: TopicPerformance[] = [
  { conceptId: 'c-chain-rule', conceptName: 'Chain Rule', questionsAttempted: 3, correctAnswers: 1, accuracy: 33 },
  { conceptId: 'c-func-composition', conceptName: 'Function Composition', questionsAttempted: 1, correctAnswers: 0, accuracy: 0 },
  { conceptId: 'c-power-rule', conceptName: 'Power Rule', questionsAttempted: 1, correctAnswers: 1, accuracy: 100 },
];

export const demoRootCause: RootCauseDiagnosis = {
  affectedConcept: 'Chain Rule',
  affectedConceptId: 'c-chain-rule',
  suspectedPrerequisite: 'Function Composition',
  suspectedPrerequisiteId: 'c-func-composition',
  evidence: [
    'Missed Chain Rule question by omitting inner derivative (Question 1)',
    'Confused composition with multiplication (Question 3)',
    'Function Composition mastery is 38%, below prerequisite threshold',
  ],
  confidence: 'high',
  sourceId: 'src-003',
  sourceCitation: {
    id: 'cit-rc-001',
    sourceId: 'src-003',
    sourceType: 'video',
    filename: 'Function Composition Explained.mp4',
    location: '5:23',
    timestamp: 323,
    excerpt: 'Each function is like a machine. Composition means chaining machines.',
  },
  isConfirmed: false,
};

export const demoReport: AssessmentReport = {
  id: 'report-001',
  quizId: 'quiz-001',
  courseId: 'course-calc-101',
  score: 60,
  accuracy: 60,
  totalQuestions: 5,
  correctAnswers: 3,
  completedAt: '2026-10-08T15:25:00Z',
  topicPerformance: demoTopicPerformance,
  misconceptions: demoMisconceptions,
  rootCauseDiagnosis: demoRootCause,
  masteryBefore: 55,
  masteryAfter: 52,
  conceptsForRevision: ['c-func-composition', 'c-chain-rule'],
};

// ─── Dashboard ──────────────────────────────────────────────

export const demoDashboardSummary: DashboardSummary = {
  overallMastery: 62,
  conceptsMastered: 4,
  conceptsNeedingRevision: 5,
  studyStreak: 7,
  completedSessions: 12,
};

export const demoActivities: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'quiz',
    title: 'Chain Rule Quiz',
    description: 'Completed 5 questions on Chain Rule and Function Composition',
    timestamp: '2026-10-08T15:25:00Z',
    result: '3/5 correct (60%)',
  },
  {
    id: 'act-002',
    type: 'tutoring',
    title: 'AI Tutor: Chain Rule Discussion',
    description: 'Explored Chain Rule with source-grounded explanations',
    timestamp: '2026-10-08T14:30:00Z',
  },
  {
    id: 'act-003',
    type: 'upload',
    title: 'Uploaded Integration Basics.pdf',
    description: 'New material added, currently processing',
    timestamp: '2026-10-08T11:00:00Z',
  },
  {
    id: 'act-004',
    type: 'revision',
    title: 'Reviewed Limits',
    description: 'Mastery increased from 80% to 85%',
    timestamp: '2026-10-05T10:00:00Z',
    result: '+5% mastery',
  },
];

export const demoMasteryTrend: MasteryDataPoint[] = [
  { date: '2026-09-25', mastery: 35 },
  { date: '2026-09-27', mastery: 40 },
  { date: '2026-09-29', mastery: 45 },
  { date: '2026-10-01', mastery: 48 },
  { date: '2026-10-03', mastery: 52 },
  { date: '2026-10-05', mastery: 58 },
  { date: '2026-10-07', mastery: 60 },
  { date: '2026-10-09', mastery: 62 },
];

export const demoRecommendations: Recommendation[] = [
  {
    id: 'rec-001',
    type: 'revisit',
    title: 'Revisit Function Composition',
    description: 'Your Chain Rule struggles trace back to function composition. Watch the video explanation from 5:23.',
    conceptId: 'c-func-composition',
    actionLabel: 'Watch video',
    actionRoute: '/tutor',
  },
  {
    id: 'rec-002',
    type: 'quiz',
    title: 'Quick Diagnostic: Function Composition',
    description: 'Take a short quiz to assess your current understanding of function composition.',
    conceptId: 'c-func-composition',
    actionLabel: 'Start quiz',
    actionRoute: '/quiz',
  },
  {
    id: 'rec-003',
    type: 'review',
    title: 'Review Chain Rule Lecture Notes',
    description: 'Re-read pages 12-15 of Lecture 5 where the Chain Rule is derived step by step.',
    conceptId: 'c-chain-rule',
    actionLabel: 'Open notes',
    actionRoute: '/tutor',
  },
  {
    id: 'rec-004',
    type: 'retest',
    title: 'Retest: Related Rates',
    description: 'This topic builds on the Chain Rule. Retest after improving prerequisites.',
    conceptId: 'c-related-rates',
    actionLabel: 'Start quiz',
    actionRoute: '/quiz',
  },
];

// ─── Study Plan ─────────────────────────────────────────────

export const demoStudyPlan: StudyPlan = {
  id: 'plan-001',
  courseId: 'course-calc-101',
  generatedAt: '2026-10-09T08:00:00Z',
  examDate: '2026-11-15',
  tasks: [
    {
      id: 'task-001',
      conceptId: 'c-func-composition',
      conceptName: 'Function Composition',
      taskType: 'rewatch',
      description: 'Re-watch the Function Composition video starting at 5:23',
      priority: 'urgent',
      estimatedMinutes: 20,
      dueDate: '2026-10-10',
      status: 'pending',
      sourceId: 'src-003',
    },
    {
      id: 'task-002',
      conceptId: 'c-func-composition',
      conceptName: 'Function Composition',
      taskType: 'quiz',
      description: 'Complete diagnostic quiz on Function Composition',
      priority: 'urgent',
      estimatedMinutes: 10,
      dueDate: '2026-10-10',
      status: 'pending',
    },
    {
      id: 'task-003',
      conceptId: 'c-chain-rule',
      conceptName: 'Chain Rule',
      taskType: 'review',
      description: 'Review Chain Rule lecture notes (pages 12-15)',
      priority: 'high',
      estimatedMinutes: 25,
      dueDate: '2026-10-11',
      status: 'pending',
      sourceId: 'src-001',
    },
    {
      id: 'task-004',
      conceptId: 'c-chain-rule',
      conceptName: 'Chain Rule',
      taskType: 'practice',
      description: 'Practice Chain Rule with 5 adaptive questions',
      priority: 'high',
      estimatedMinutes: 15,
      dueDate: '2026-10-12',
      status: 'pending',
    },
    {
      id: 'task-005',
      conceptId: 'c-mean-value',
      conceptName: 'Mean Value Theorem',
      taskType: 'reread',
      description: 'Re-read Mean Value Theorem section in lecture notes',
      priority: 'medium',
      estimatedMinutes: 20,
      dueDate: '2026-10-13',
      status: 'pending',
      sourceId: 'src-001',
    },
    {
      id: 'task-006',
      conceptId: 'c-implicit-diff',
      conceptName: 'Implicit Differentiation',
      taskType: 'review',
      description: 'Review implicit differentiation technique',
      priority: 'medium',
      estimatedMinutes: 20,
      dueDate: '2026-10-14',
      status: 'pending',
    },
    {
      id: 'task-007',
      conceptId: 'c-related-rates',
      conceptName: 'Related Rates',
      taskType: 'practice',
      description: 'Solve related rates problems after prerequisite review',
      priority: 'low',
      estimatedMinutes: 30,
      dueDate: '2026-10-16',
      status: 'pending',
    },
  ],
};

// ─── Evaluation Lab ─────────────────────────────────────────

const demoMetrics: EvalMetric[] = [
  { name: 'Faithfulness', value: 0.92, baseline: 0.78, description: 'Proportion of claims supported by source material', category: 'grounding' },
  { name: 'Answer Relevancy', value: 0.88, baseline: 0.82, description: 'How relevant answers are to the student query', category: 'generation' },
  { name: 'Context Precision', value: 0.85, baseline: 0.71, description: 'Precision of retrieved context chunks', category: 'retrieval' },
  { name: 'Context Recall', value: 0.91, baseline: 0.76, description: 'Recall of relevant context chunks', category: 'retrieval' },
  { name: 'Retrieval Hit@3', value: 0.94, baseline: 0.80, description: 'At least one relevant chunk in top-3 results', category: 'retrieval' },
  { name: 'MRR', value: 0.87, baseline: 0.73, description: 'Mean Reciprocal Rank of relevant results', category: 'retrieval' },
  { name: 'Citation Accuracy', value: 0.89, baseline: 0.65, description: 'Proportion of citations pointing to correct source locations', category: 'grounding' },
  { name: 'Refusal Precision', value: 0.95, baseline: 0.60, description: 'Correctly refusing out-of-scope questions', category: 'grounding' },
  { name: 'Refusal Recall', value: 0.82, baseline: 0.55, description: 'Recall on out-of-scope question detection', category: 'grounding' },
  { name: 'Quiz Answer-Key Accuracy', value: 0.96, baseline: 0.88, description: 'Accuracy of generated quiz answer keys', category: 'generation' },
  { name: 'Duplicate Question Rate', value: 0.03, baseline: 0.12, description: 'Rate of duplicate questions in generated quizzes (lower is better)', category: 'generation' },
  { name: 'Mastery Estimation Error', value: 0.08, baseline: 0.18, description: 'Mean absolute error in mastery estimation (lower is better)', category: 'learning' },
];

const demoTestCases: EvalTestCase[] = [
  {
    id: 'tc-001',
    query: 'What is the Chain Rule?',
    expectedAnswer: "The Chain Rule states that for h(x) = f(g(x)), h'(x) = f'(g(x)) · g'(x)",
    actualAnswer: "The Chain Rule says that if h(x) = f(g(x)), then h'(x) = f'(g(x)) · g'(x). It applies to composite functions.",
    isCorrect: true,
    faithfulness: 0.95,
    relevancy: 0.92,
    retrievalHits: 3,
  },
  {
    id: 'tc-002',
    query: 'Explain quantum entanglement',
    expectedAnswer: '[Should refuse - outside course material]',
    actualAnswer: 'This question is not covered by your uploaded course material on Calculus.',
    isCorrect: true,
    faithfulness: 1.0,
    relevancy: 1.0,
    retrievalHits: 0,
  },
  {
    id: 'tc-003',
    query: 'What is function composition?',
    expectedAnswer: '(f ∘ g)(x) = f(g(x)), substituting g into f',
    actualAnswer: 'Function composition combines two functions where the output of g becomes the input of f: (f ∘ g)(x) = f(g(x)).',
    isCorrect: true,
    faithfulness: 0.90,
    relevancy: 0.95,
    retrievalHits: 2,
  },
  {
    id: 'tc-004',
    query: 'What is the derivative of ln(sin(x))?',
    expectedAnswer: 'cos(x)/sin(x) = cot(x)',
    actualAnswer: 'Using the Chain Rule: the derivative of ln(sin(x)) is (1/sin(x)) · cos(x) = cot(x).',
    isCorrect: true,
    faithfulness: 0.88,
    relevancy: 0.90,
    retrievalHits: 2,
  },
  {
    id: 'tc-005',
    query: 'Who invented calculus?',
    expectedAnswer: '[Should refuse or flag as outside material]',
    actualAnswer: 'While your course materials don\'t cover the history of calculus in detail, Newton and Leibniz are generally credited.',
    isCorrect: false,
    faithfulness: 0.40,
    relevancy: 0.60,
    retrievalHits: 0,
  },
];

export const demoEvalRun: EvalRun = {
  id: 'eval-001',
  name: 'Full System Evaluation v1.0',
  status: 'completed',
  startedAt: '2026-10-08T20:00:00Z',
  completedAt: '2026-10-08T20:15:00Z',
  metrics: demoMetrics,
  testCases: demoTestCases,
  isDemo: true,
};

export const demoEvalRuns: EvalRun[] = [
  demoEvalRun,
  {
    id: 'eval-baseline',
    name: 'Baseline (No Grounding)',
    status: 'completed',
    startedAt: '2026-10-07T18:00:00Z',
    completedAt: '2026-10-07T18:10:00Z',
    metrics: demoMetrics.map(m => ({
      ...m,
      value: m.baseline ?? m.value * 0.8,
      baseline: undefined,
    })),
    testCases: demoTestCases.map(tc => ({
      ...tc,
      isCorrect: Math.random() > 0.4,
      faithfulness: (tc.faithfulness ?? 0.8) * 0.75,
    })),
    isDemo: true,
  },
];

