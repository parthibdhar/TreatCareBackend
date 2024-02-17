import dynamoDbClient from "../../database/dynamoDbConnection";


export default async function getDoctorbyId(docId: string) {

    var params = {
        TableName: process.env.TABLE_NAME as string,
        KeyConditionExpression: '#PK = :PK',
        ExpressionAttributeNames: {
            "#PK": "PK",
        },
        ExpressionAttributeValues: {
            ':PK': `DOC#${docId}`,
        }
    };
    console.log(docId);


    try {
        const queryPromise = await dynamoDbClient.query(params).promise()
        console.log(queryPromise);

        if (queryPromise) {
            if (queryPromise.Count as number === 0) {
                return {
                    success: true,
                    message: 'Not found',
                }
            } else if (queryPromise.Count as number > 0) {
                return {
                    success: true,
                    message: 'fetched successfully',
                    data: queryPromise
                }
            }else{
                return {
                    success: false,
                    message: 'Error fetching'
                } 
            }
        } else {
            return {
                success: false,
                message: 'Error fetching'
            }
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'There was an error'
        }
    }
}