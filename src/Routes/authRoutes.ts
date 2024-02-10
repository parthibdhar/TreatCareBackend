/*
1. Authenticate uisng provider (OAuth this step)
2. op1-> store in session later store in database
   op2 -> store in database creating new user.
3. Option wheather Doctor | Patient | Clinic
4. Send registration form.
5. Add data in database.
*/
import express from 'express';
import { Idoctor } from '../interfaces/doctorInterface';
import { IPatient } from '../interfaces/patientInterface';
import { Iclinic } from '../interfaces/clinicInterface';

const authRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

authRouter.get('/', (req: any, res: any) => {
  console.log('hi');
  res.send('Hello authRouter');
});



export default authRouter;
