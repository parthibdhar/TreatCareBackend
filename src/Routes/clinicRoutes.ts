import express from 'express';

const clinicRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

clinicRouter.get('/', (req: any, res: any) => {
  res.send('Hello clinicRouter');
});

export default clinicRouter;