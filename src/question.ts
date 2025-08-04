import { QuestionObject } from "./types/questionType";

let question: QuestionObject;

export function setQuestion(newQuestion: QuestionObject): void {
    question = newQuestion;
}

export function getQuestion(): QuestionObject {
    return question;
}


