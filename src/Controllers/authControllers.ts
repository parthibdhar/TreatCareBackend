// import { v4 as uuidv4 } from 'uuid';
import dynamoDbClient from '../database/dynamoDbConnection';
import dotenv from 'dotenv';

dotenv.config();
// const pId = uuidv4();


export const patientRegistration = async (name: any) => {

  var params = {
    TableName: process.env.PATIENT_TABLE as string,
    Item: {
      'PK': 'ORG#svddsvs',
      'SK': 'EMP#svsv',
      'name': name,

    },
  };

  dynamoDbClient.put(params, (err: any) => {
    if (err) {
        throw err;
    } else {
        console.log('Created Successfully');
    }
})
};