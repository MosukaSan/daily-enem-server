import { setQuestion, subjectOptions } from "./question";
import cron from 'node-cron';
import { QuestionObject } from "../types/questionType";
import { fetchWithRetry } from "./api";

export function scheduleQuestion() {
    cron.schedule('0 0 * * *', changeQuestions);
}

export async function changeQuestions(): Promise<string> {
    try {
        subjectOptions.forEach(async (questionSubject) => {
            while (true) {
                const questionNumber = Math.floor(Math.random() * (180 - 1)) + 1;
                const year = Math.floor(Math.random() * (2023 - 2009)) + 2009

                const response = await fetchWithRetry(`https://api.enem.dev/v1/exams/${year}/questions/${questionNumber}`);
                const data: { [key: string]: any } = await response.data;
                const { title, discipline, context, files, alternativesIntroduction, alternatives } = data;
                const questionInfo: QuestionObject = { title, discipline, context, files, alternativesIntroduction, alternatives };
                
                if (questionSubject === 'geral') {
                    setQuestion(questionInfo, questionSubject);  
                    console.log(questionSubject, ' Question Changed!')
                    break;              
                } else {
                    if (discipline !== questionSubject) {
                        continue;
                    }
                    setQuestion(questionInfo, questionSubject);  
                    console.log(questionSubject, ' Question Changed!')
                    break;
                }
            }
        });
        
        return 'success';
    } catch (err) {
        console.error('An error ocurred: ', err);
        return 'error';
    }
}
