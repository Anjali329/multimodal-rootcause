// ─── Domain Types ───────────────────────────────────────────

export interface Course {
  id: string;
  name: string;
  description: string;
  materialCount: number;
  conceptCount: number;
  createdAt: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  learningGoal?: string;
  examDate?: string;
  preferredLanguage: string;
  confidenceLevel: 'beginner' | 'intermediate' | 'advanced';
  activeCourseId?: string;
}

// ─── Source / Library Types ─────────────────────────────────

export type SourceType = 'pdf' | 'pptx' | 'video' | 'youtube';

export type ProcessingStatus =
  | 'uploaded'
  | 'extracting'
  | 'parsing'
  | 'capturing_diagrams'
  | 'building_concepts'
  | 'indexing'
  | 'ready'
  | 'failed';

export interface SourceMaterial {
  id: string;
  courseId: string;
  filename: string;
  sourceType: SourceType;
  fileSize: number;
  uploadedAt: string;
  status: ProcessingStatus;
  extractedUnits: number;
  associatedConcepts: number;
  thumbnailUrl?: string;
  errorMessage?: string;
}

export interface SourceUnit {
  id: string;
  sourceId: string;
  content: string;
  pageNumber?: number;
  slideNumber?: number;
  timestamp?: number;
  type: 'text' | 'diagram' | 'equation' | 'transcript';
}

// ─── Knowledge Graph Types ──────────────────────────────────

export interface Concept {
  [key: string]: unknown;
  id: string;
  name: string;
  definition: string;
  mastery: number;
  importance: 'high' | 'medium' | 'low';
  lastReviewed?: string;
  reviewDue?: string;
  misconceptions: Misconception[];
  prerequisites: string[];
  relatedSourceIds: string[];
  topic?: string;
}

export interface ConceptEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: 'prerequisite' | 'related';
}

export interface KnowledgeGraph {
  concepts: Concept[];
  edges: ConceptEdge[];
}

export interface Misconception {
  id: string;
  description: string;
  conceptId: string;
  frequency: number;
  correction: string;
}

// ─── Tutor / Chat Types ─────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: Citation[];
  claims?: Claim[];
  timestamp: string;
  isStreaming?: boolean;
}

export interface Citation {
  id: string;
  sourceId: string;
  sourceType: SourceType;
  filename: string;
  location: string;
  pageNumber?: number;
  slideNumber?: number;
  timestamp?: number;
  excerpt?: string;
}

export type ClaimVerification = 'supported' | 'partially_supported' | 'outside_material' | 'unverified';

export interface Claim {
  id: string;
  text: string;
  verification: ClaimVerification;
  citations: Citation[];
  explanation?: string;
}

export interface ConversationSession {
  id: string;
  courseId: string;
  title: string;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
}

// ─── Quiz Types ─────────────────────────────────────────────

export type QuestionType = 'mcq' | 'short_answer' | 'numerical';
export type Confidence = 'sure' | 'maybe' | 'guess';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'adaptive';

export interface QuizConfig {
  conceptIds: string[];
  questionCount: number;
  questionType: QuestionType;
  difficulty: Difficulty;
  timerMinutes?: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  config: QuizConfig;
  questions: Question[];
  status: 'in_progress' | 'completed' | 'abandoned';
  startedAt: string;
  completedAt?: string;
  score?: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  type: QuestionType;
  options?: string[];
  conceptId: string;
  difficulty: Difficulty;
  order: number;
}

export interface Answer {
  questionId: string;
  selectedOption?: number;
  textAnswer?: string;
  confidence: Confidence;
  submittedAt: string;
}

export interface QuestionFeedback {
  questionId: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  misconceptionId?: string;
  citations: Citation[];
  learnerAnswer: string;
  confidence: Confidence;
}

// ─── Report Types ───────────────────────────────────────────

export interface AssessmentReport {
  id: string;
  quizId: string;
  courseId: string;
  score: number;
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  topicPerformance: TopicPerformance[];
  misconceptions: Misconception[];
  rootCauseDiagnosis?: RootCauseDiagnosis;
  masteryBefore?: number;
  masteryAfter?: number;
  conceptsForRevision: string[];
}

export interface TopicPerformance {
  conceptId: string;
  conceptName: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
}

export interface RootCauseDiagnosis {
  affectedConcept: string;
  affectedConceptId: string;
  suspectedPrerequisite: string;
  suspectedPrerequisiteId: string;
  evidence: string[];
  confidence: 'high' | 'medium' | 'low';
  sourceId?: string;
  sourceCitation?: Citation;
  isConfirmed: boolean;
}

// ─── Study Plan Types ───────────────────────────────────────

export type TaskType = 'review' | 'quiz' | 'practice' | 'rewatch' | 'reread';
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

export interface StudyTask {
  id: string;
  conceptId: string;
  conceptName: string;
  taskType: TaskType;
  description: string;
  priority: TaskPriority;
  estimatedMinutes?: number;
  dueDate: string;
  status: TaskStatus;
  completedAt?: string;
  sourceId?: string;
}

export interface StudyPlan {
  id: string;
  courseId: string;
  tasks: StudyTask[];
  generatedAt: string;
  examDate?: string;
}

// ─── Evaluation Types ───────────────────────────────────────

export interface EvalMetric {
  name: string;
  value: number;
  baseline?: number;
  description: string;
  category: 'retrieval' | 'generation' | 'grounding' | 'learning';
}

export interface EvalRun {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  metrics: EvalMetric[];
  testCases: EvalTestCase[];
  isDemo?: boolean;
}

export interface EvalTestCase {
  id: string;
  query: string;
  expectedAnswer: string;
  actualAnswer: string;
  isCorrect: boolean;
  faithfulness?: number;
  relevancy?: number;
  retrievalHits?: number;
}

// ─── Dashboard Types ────────────────────────────────────────

export interface DashboardSummary {
  overallMastery: number;
  conceptsMastered: number;
  conceptsNeedingRevision: number;
  studyStreak: number;
  completedSessions: number;
}

export interface ActivityItem {
  id: string;
  type: 'quiz' | 'revision' | 'tutoring' | 'upload';
  title: string;
  description: string;
  timestamp: string;
  result?: string;
}

export interface MasteryDataPoint {
  date: string;
  mastery: number;
}

export interface Recommendation {
  id: string;
  type: 'revisit' | 'quiz' | 'review' | 'retest';
  title: string;
  description: string;
  conceptId?: string;
  actionLabel: string;
  actionRoute: string;
}

