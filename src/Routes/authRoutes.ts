import express from 'express';

const authRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

authRouter.get('/', (req: any, res: any) => {
  res.send('Hello authRouter');
});

export default authRouter;