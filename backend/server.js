import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDb } from './db.js';
import launcherRouter from './routes/launchers.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/launchers', launcherRouter);
app.use('/api/auth',authRouter)
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log('server ronning on http://localhost:' + PORT);
    });
  } catch (error) {
    console.log('Database connection failed:');
    console.log(error);
  }
}

startServer();
