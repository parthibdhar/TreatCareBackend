import express from 'express';
import { IPatient } from '../interfaces/patientInterface';
import createNewPatient from '../Controllers/patient/createNewPatient';
import getAllPatients from '../Controllers/patient/getAllPatirnts';
import { log } from 'console';


const patientRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

// patientRouter.post('/:role', async (req: any, res: any) => {
  
//   res.send('Hello patientRouter');
// });



patientRouter.post('/create-new', async (req: Request, res: any) => {
  try {
    console.log("pat new")
    const data: IPatient | any = req.body  instanceof ReadableStream ? " hi " : req.body;
    console.log("data :")
    console.log(data)
    const result = await createNewPatient(data)
    if (result.success) {
      res.status(200).send(result.message)
    } else {
      res.status(500).send(result.message)
    }
  } catch (error) {
    console.log(error)
  }
})

patientRouter.get('/', async (req: Request, res: any) => {
  try {
    const result = await getAllPatients()
    if (result.success) {
      console.log(result)
     
      res.status(200).send(
          result.data
      )
    } else {
      res.status(500).send(result.message)
    }
  } catch (error) {
    console.log(error)
  }
})


export default patientRouter;