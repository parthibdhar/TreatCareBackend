import { IPatient } from './../../interfaces/patientInterface.d';
import dynamoDbClient from "../../database/dynamoDbConnection";
// import { IPatient} from "../../interfaces/patientInterface";
const { v4: uuidv4 } = require('uuid')


export default async function createNewPatient(data: IPatient) {
    console.log("hi create patient controller")
    console.log(data)
    const patId = uuidv4();
    var params = {
        TableName: process.env.TABLE_NAME as string,
        Item: {
            'PK': `PAT#${patId}`,
            'SK': `PAT#${patId}`,
            ...data
        }
    };
    try {
        await dynamoDbClient.put(params).promise();
        return {
            success: true,
            message: 'patient Created successfully'
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'There was an error in creating patient'
        }
    }
}