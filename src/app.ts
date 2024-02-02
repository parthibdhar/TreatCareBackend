import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './Routes/authRoutes';


require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Main Route
app.get('/', (req, res) => {
  res.json({
    message: 'Server is Running',
  });

  // Other Routes
  app.use('/api/auth', authRouter);
});


export default app;
