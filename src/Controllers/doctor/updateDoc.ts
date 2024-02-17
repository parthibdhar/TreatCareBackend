import dynamoDbClient from "../../database/dynamoDbConnection";
import { IDoctor } from "../../interfaces/doctorInterface";

function formatObjectAsExpressionAttributeNames(obj: any) {
    const expressions = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const formattedKey = `#${key}`;
            const formattedExpression = `${formattedKey} = :${key}`;
            expressions.push(formattedExpression);
        }
    }
    return expressions.join(', ');
}

function formatExpressionAttributeNames(obj: { [key: string]: any }): { [key: string]: string } {
    let expression: { [key: string]: string } = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            expression[`#${key}`] = key;
        }
    }
    return expression;
}


function formatExpressionAttributeValues(obj: { [key: string]: any }): { [key: string]: any } {
    let expression: { [key: string]: any } = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            expression[`:${key}`] = obj[key];
        }
    }
    return expression;
}



export default async function updateDoc(docId: string, specialization: string, updateObj: Partial<IDoctor>) {
    const UpdateExpression = formatObjectAsExpressionAttributeNames(updateObj);
    const attributeName = formatExpressionAttributeNames(updateObj)
    const attributValue = formatExpressionAttributeValues(updateObj)

    const params = {
        TableName: process.env.TABLE_NAME as string,
        Key: { PK: `DOC#${docId}`, SK: `SPEC#${specialization}` },
        UpdateExpression: `SET ${UpdateExpression}`,
        ExpressionAttributeNames: attributeName,
        ExpressionAttributeValues: attributValue
    };

    console.log(params);
    
    try {
        await  dynamoDbClient.update(params).promise()
        return {
            success: true,
            message: 'Updated successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: 'There was an error'
        }
    }
}
