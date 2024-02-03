import express from 'express';

const categoryRouter = express.Router();

categoryRouter.get('/', (req: any, res: any) => {
  res.send('Hello categoryRouter');
});

export default categoryRouter;