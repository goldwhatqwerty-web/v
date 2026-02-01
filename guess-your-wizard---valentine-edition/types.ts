
export interface Question {
  id: number;
  text: string;
  answer: string;
  placeholder: string;
  icon: string;
}

export interface QuizState {
  currentStep: number;
  answers: Record<number, string>;
  isFinished: boolean;
  hintsUsed: number;
}
