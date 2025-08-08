import { QuestionObject } from "../types/questionType";

export const subjectOptions = ['geral', 'matematica', 'linguagens', 'ciencias-humanas', 'ciencias-natureza'] as const;
export type SubjectOptions = typeof subjectOptions[number];

export const subjectList: SubjectOptions[] = [...subjectOptions];

const questionMap: Partial<Record<SubjectOptions, QuestionObject>> = {};

export function setQuestion(newQuestion: QuestionObject, subject: SubjectOptions): void { 
    questionMap[subject] = newQuestion;
}

export function getQuestion(subject: SubjectOptions): QuestionObject { 
    return questionMap[subject] ?? null;
}
