import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from '../routes/routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
