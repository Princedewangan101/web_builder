import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import cors from 'cors'

const app = express();

const corsOptions = {
    origin : process.env.TRUSTED_ORIGINS?.split(',') || [],
    credential: true,
}

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});