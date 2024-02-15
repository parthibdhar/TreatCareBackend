import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './Routes/authRoutes';
import categoryRouter from './Routes/categoryRoutes';
import clinicRouter from './Routes/clinicRoutes';
import doctorRouter from './Routes/doctorRoutes';
import patientRouter from './Routes/patientRoutes';
const session = require('express-session');

const passport = require('passport');

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

app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/clinic', clinicRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/patient', patientRouter);

// Main Route
app.get('/', (req, res) => {
  res.json({
    message: 'Server is Running',
  });
});


export default app;
