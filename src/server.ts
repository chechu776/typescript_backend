import express from 'express';
import dotenv from 'dotenv';
import router from '../routes/routes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', router);

const dbUrl = async ()=>{
  try{
    await mongoose.connect(process.env.DBURL || '');
    console.log('Connected to the database'); 
  }
  catch(error){
    console.error('Database connection error:', error);
  } 
}
dbUrl();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
