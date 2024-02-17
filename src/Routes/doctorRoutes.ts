import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { IDoctor } from '../interfaces/doctorInterface';
import createNewDoctor from '../Controllers/doctor/createNewDoctor';
import getDoctorbyId from '../Controllers/doctor/getDoctorById';
import getDoctorbySpecialization from '../Controllers/doctor/getDocbySpecialization';
import deleteDoc from '../Controllers/doctor/deleteDoc';
import updateDoc from '../Controllers/doctor/updateDoc';
const doctorRouter = express.Router();

// ************ PUBLIC ROUTES ************ //

doctorRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello doctorRouter');
});

doctorRouter.post('/create-new', async (req: Request, res: Response) => {
  try {
    const data: IDoctor = req.body
    const result = await createNewDoctor(data)
    if (result.success) {
      res.status(200).send('Doctor created successfully')
    } else {
      res.status(500).send('There was some error')
    }
  } catch (error) {
    console.log(error)
  }
})

doctorRouter.get('/delete/:docId', async (req: Request, res: Response) => {
  try {
    const docId: string = req.params.docId
    const specialization = req.headers['specialization']
    if (docId && specialization) {
      const result = await deleteDoc(docId, specialization as string)
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

doctorRouter.post('/update/:docId', async (req: Request, res: Response) => {
  try {
    const docId: string = req.params.docId
    const specialization = req.headers['specialization']
    const updateObj = req.body
    if (docId && specialization) {
      const result = await updateDoc(docId, specialization as string, updateObj)
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

doctorRouter.get('/get-doctor/:id', async (req: Request, res: Response) => {
  try {
    const docId: string = req.params.id
    const result = await getDoctorbyId(docId)
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

doctorRouter.get('/specialization/:spec', async (req: Request, res: Response) => {
  try {
    const specialization: string = req.params.spec
    const result = await getDoctorbySpecialization(specialization)
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

export default doctorRouter;