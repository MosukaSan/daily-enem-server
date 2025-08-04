import axios from "axios";
import { setQuestion } from "./question";
import cron from 'node-cron';
import { QuestionObject } from "./types/questionType";

export function scheduleQuestion() {
    cron.schedule('10 18 * * *', changeQuestion);
}

export async function changeQuestion(): Promise<string> {
    try {
        const questionNumber = Math.floor(Math.random() * (180 - 1)) + 1;
        const year = Math.floor(Math.random() * (2023 - 2009)) + 2009

        const response = await axios.get(`https://api.enem.dev/v1/exams/${year}/questions/${questionNumber}`);
        const data: { [key: string]: any } = await response.data;
        const { title, discipline, context, files, alternativesIntroduction, alternatives } = data;
        const questionInfo: QuestionObject = { title, discipline, context, files, alternativesIntroduction, alternatives };
        
        setQuestion(questionInfo);
        console.log('Question Changed!')
        return 'success';
    } catch (err) {
        console.error('An error ocurred: ', err);
        return 'error';
    }
}

