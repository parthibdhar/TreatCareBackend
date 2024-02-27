import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './Routes/authRoutes';
import categoryRouter from './Routes/categoryRoutes';
import clinicRouter from './Routes/clinicRoutes';
import doctorRouter from './Routes/doctorRoutes';
import patientRouter from './Routes/patientRoutes';
const session = require('express-session');

const passport = require('passport');
// require('../src/Middleware/ThirdPartyAuth/LocalAuth')(passport);

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET, // replace with a strong secret
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/clinic', clinicRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);

// Main Route
app.get('/', (req, res) => {
  res.json({
    message: 'Server is Running',
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.end();
})


export default app;
