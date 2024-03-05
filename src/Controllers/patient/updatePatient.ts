import dynamoDbClient from "../../database/dynamoDbConnection";
import { IPatient } from "../../interfaces/patientInterface";


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



export default async function updatePat(patId: string, updateObj: Partial<IPatient>) {
    const UpdateExpression = formatObjectAsExpressionAttributeNames(updateObj);
    const attributeName = formatExpressionAttributeNames(updateObj)
    const attributValue = formatExpressionAttributeValues(updateObj)

    const params = {
        TableName: process.env.TABLE_NAME as string,
        Key: { PK: `PAT#${patId}`, SK: `PAT#${patId}`},
        UpdateExpression: `SET ${UpdateExpression}`,
        ExpressionAttributeNames: attributeName,
        ExpressionAttributeValues: attributValue,
        ReturnValuesOnConditionCheckFailure: 'ALL_OLD',
        ReturnValues: 'UPDATED_NEW',
        ConditionExpression: 'attribute_exists(PK)  AND attribute_exists(SK)'
    };

    console.log(params);

    try {
        const data = await dynamoDbClient.update(params).promise();
        console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
        return {
            success: true,
            message: `Patient updated successfully `,
            data
        };
    } catch (error: any) {
        console.error('Error updating Patient:', error);
        if (error.code === 'ConditionalCheckFailedException') {
            return {
                success: false,
                message: `Update failed!!! unknown or invalid patient: ${patId}`
            };
        } else {
        
            return {
                success: false,
                message: `Unable to update item. Error: ${error}`
            };
        }
    }
    }

