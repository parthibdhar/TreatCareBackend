import dynamoDbClient from "../../database/dynamoDbConnection";
import { IDoctor } from "../../interfaces/doctorInterface";
import { error, log } from 'console';

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
        ExpressionAttributeValues: attributValue,
        ReturnValuesOnConditionCheckFailure: 'ALL_OLD',
        ReturnValues: 'UPDATED_NEW',
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)'
    };

    console.log(params);
    
    try {
        dynamoDbClient.update(params, (err, data) => {
        console.log(`hi CallBack`);
        if (err) {
            if (err.code === 'ConditionalCheckFailedException') {
                console.error('Update failed due to condition check failure:', err.message);
                // Handle condition check failure gracefully
            } else {
                console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
                // Handle other errors
            }
        } else {
            console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
        }
       });
    //    return {
    //        success: true,
    //        message: res,
    //    }
        
    } catch (error) {
        return {
            success: false,
            message: 'There was an error'
        }
    }
}
