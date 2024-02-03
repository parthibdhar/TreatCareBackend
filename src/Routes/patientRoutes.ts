import express from 'express';

const patientRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

patientRouter.get('/', (req: any, res: any) => {
  res.send('Hello patientRouter');
});

export default patientRouter;