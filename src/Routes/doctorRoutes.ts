import express from 'express';

const doctorRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

doctorRouter.get('/', (req: any, res: any) => {
  res.send('Hello doctorRouter');
});

export default doctorRouter;