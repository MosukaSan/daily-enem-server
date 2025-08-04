export type QuestionObject = { 
    title: string;
    discipline: string;
    context: string;
    files: string[]; 
    alternativesIntroduction: string; 
    alternatives: { letter: string, text: string, file: string | null, isCorrect: boolean }[];
} | null;