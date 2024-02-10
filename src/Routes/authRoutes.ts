/*
1. Authenticate uisng provider (OAuth this step)
2. op1-> store in session later store in database
   op2 -> store in database creating new user.
3. Option wheather Doctor | Patient | Clinic
4. Send registration form.
5. Add data in database.
*/

import express from 'express';
import { patientRegistrationController } from '../Controllers/patientControllers';
import { Idoctor } from '../interfaces/doctorInterface';
import { IPatient } from '../interfaces/patientInterface';
import { Iclinic } from '../interfaces/clinicInterface';
import { patientRegistration } from '../Controllers/authControllers';

const authRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

authRouter.post('/', (req: any, res: any) => {
  console.log('hi');
  const userData: Idoctor | IPatient | Iclinic = req.body.userData;
  console.log(userData);

  //add data to database

  res.send('Hello authRouter');
});

authRouter.post('/createNew', async (req: any, res: any) => {
  try {
    const name = req.body.name;
    console.log(name)
    await patientRegistration(name);
    res.status(200).send("Created successfully")
  } catch (err) {
    res.status(500).send("Error creating employee")
    console.log(err);
  }

})

export default authRouter;
