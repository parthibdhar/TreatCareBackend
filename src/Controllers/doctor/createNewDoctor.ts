import dynamoDbClient from "../../database/dynamoDbConnection";
import { IDoctor } from "../../interfaces/doctorInterface";
const { v4: uuidv4 } = require('uuid')


export default async function createNewDoctor(data: IDoctor) {

    const docId = uuidv4()
    var params = {
        TableName: process.env.TABLE_NAME as string,
        Item: {
            'PK': `DOC#${docId}`,
            'SK': `SPEC#${data?.specialization}`,
            ...data
        }
    };
    try {
        await dynamoDbClient.put(params).promise();
        return {
            success: true,
            message: 'Created successfully'
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'There was an error'
        }
    }
}