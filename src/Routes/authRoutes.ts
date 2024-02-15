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
import { requireSignedin } from '../Middleware/protectedMiddleWare/requireSignedin';
require('../Middleware/ThirdPartyAuth/googleAuth');
const passport = require('passport');

const authRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

authRouter.get('/', (req, res) => {
  res.send('<a href="/api/auth/google">Authenticate with Google</a>');
});

authRouter.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),

  () => {
    console.log('hi google');
  }
)

// Callback route after successful authentication
authRouter.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8080/api/auth/protected',
    failureRedirect: '/failure'
  }),
);

authRouter.get('/failure', (req, res) => {
  res.send('failed');
})


// ************ PROTECTED ROUTES ************ //
authRouter.get('/protected', requireSignedin, (req: any, res: any) => {
  res.send(`Hello ${req.user.displayName} its protected`);
})


// Logout
authRouter.get('/logout', (req: any, res: any, next: any) => {
  req.logout((err: any) => {
   try {
    if(err) {
       res.send({
        success: false,
        err
      });
    }
    req.session.destroy();
    res.status(304).send({
      success: true
    });
    return
   } catch (error) {
    console.log(error);
    
   }
  });

});



export default authRouter;
