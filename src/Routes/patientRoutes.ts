import express from 'express';
import { IPatient } from '../interfaces/patientInterface';
import createNewPatient from '../Controllers/patient/createNewPatient';
import getAllPatients from '../Controllers/patient/getAllPatirnts';
import { log } from 'console';
import getPatientById from '../Controllers/patient/getPatientsById';
import { Request, Response } from 'express';
import updatePat from '../Controllers/patient/updatePatient';
import deletePat from '../Controllers/patient/deletePatients';

const patientRouter = express.Router();



// ************ PUBLIC ROUTES ************ //



// create New Patient
patientRouter.post('/create-new', async (req: Request, res: any) => {
  try {
    console.log("pat new")
    const data: IPatient | any = req.body instanceof ReadableStream ? " hi " : req.body;
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


// Get All Patients
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


// Get Patient by id
patientRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const patId: string = req.params.id
    const result = await getPatientById(patId)
    if (result.success) {
      if (result.message === 'Not found') {
        res.status(404).send(result.message)
      } else {
        res.status(200).json(result.data)
      }
    } else {
      res.status(500).send(result.message)

    }
  } catch (error) {
    console.log(error)
  }
})


// update patient
patientRouter.put('/:patId', async (req: Request, res: Response) => {
  try {
    const patId: string = req.params.patId
    const updateObj = req.body
    console.log(patId)
    if (patId) {
      const result = await updatePat(patId, updateObj)
      if (result?.success) {
        res.status(200).json({
          message: result.message,
          data: result.data
        })
      }
      else {
        res.status(500).send(result?.message)
      }
    } else {
      res.status(500).send('invalid patient ')
    }
  } catch (error) {
    console.log(error)
  }
})


  // delete patient
patientRouter.delete('/:patId', async (req: Request, res: Response) => {
  try {
    const patId: string = req.params.patId
    if (patId ) {
      const result = await deletePat(patId)
      if (result.success) {
        res.status(200).json(result.message)
      }
      else {
        res.status(500).send(result.message)
      }
    } else {
      res.status(500).send('No header found')
    }

  } catch (error) {
    console.log(error)
  }
})





export default patientRouter;