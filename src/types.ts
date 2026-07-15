export type ExamLevel = 'KET' | 'PET' | 'FCE' | 'IELTS';

export interface GrammarPoint {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  examples: string[];
  levels: ExamLevel[];
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  position: { x: number; y: number }; // Relative to map or continent
  territoryPath?: string; // SVG path for the "country" boundary
  dependencies?: string[]; // Prerequisite grammar point IDs
}

export interface Continent {
  id: string;
  name: string;
  chineseName: string;
  color: string;
  points: GrammarPoint[];
  position: { x: number; y: number };
  path?: string; // SVG path
}

export interface UserProgress {
  completedPoints: string[]; // IDs of completed grammar points
}
