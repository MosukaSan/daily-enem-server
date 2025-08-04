import express, { Request, Response } from 'express';
import { changeQuestion, scheduleQuestion } from './scheduleQuestion';
import { getQuestion } from './question';
import cors from 'cors';

const app = express();
const port = 3000;
changeQuestion();
scheduleQuestion();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8080', 'https://daily-enem-production.up.railway.app/'],
    credentials: false
}));

app.get('/questions/getDailyQuestion', (req: Request, res: Response) => {
    const question = getQuestion();
    res.send(question);
});

app.listen(port, () => {
    console.log('Server running')
});

