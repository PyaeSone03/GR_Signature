export type QuestionType = 'text' | 'radio' | 'checkbox' | 'rating' | 'textarea' | 'select';

export interface QuestionOption {
  id: string;
  label: string;
  value: string | number;
}

export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface SurveyResponse {
  id: string;
  responses: Record<string, any>;
  submittedAt: Date;
}

export interface SurveyData {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
}