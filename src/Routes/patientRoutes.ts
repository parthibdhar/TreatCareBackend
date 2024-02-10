import express from 'express';

const patientRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

patientRouter.post('/:role', (req: any, res: any) => {
  
  res.send('Hello patientRouter');
});

export default patientRouter;