import express, { Request, Response } from 'express';
import { changeQuestions, scheduleQuestion } from './questionsHandler/questionsHandler';
import { getQuestion, subjectOptions, SubjectOptions } from './questionsHandler/question';
import cors from 'cors';

const app = express();
const port = 3000;
changeQuestions();
scheduleQuestion();

app.use(cors({
    origin: ['https://www.dailyenem.xyz'],
    credentials: false
}));

app.get('/questions/getDailyQuestion', (req: Request, res: Response) => {
    const subject = req.query.subject;

    if (typeof subject === 'string') {
        if (subjectOptions.includes(subject as any)) {
            const question = getQuestion(subject as SubjectOptions);
            res.send(question);
        } else {
            res.status(400).send({ error: 'Assunto inválido.' });
        }
    } else {
        res.send(getQuestion('geral'));
    }
});

app.listen(port, () => {
    console.log('Server running')
});

