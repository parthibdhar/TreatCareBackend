import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './Routes/authRoutes';
import categoryRouter from './Routes/categoryRoutes';
import clinicRouter from './Routes/clinicRoutes';
import doctorRouter from './Routes/doctorRoutes';
import patientRouter from './Routes/patientRoutes';
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
dotenv.config()

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors());

//routes
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/clinic', clinicRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/patient', patientRouter);

// Main Route
app.get('/', (req, res) => {
  res.json({
    message: 'Server is Running',
  })
});


export default app;
