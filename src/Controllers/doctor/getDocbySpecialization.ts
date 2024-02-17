import dynamoDbClient from "../../database/dynamoDbConnection";

export default async function getDoctorbySpecialization(specialization: string) {

    var params = {
        TableName: process.env.TABLE_NAME as string,
        IndexName: 'SK-index',
        KeyConditionExpression: '#SK = :SK',
        ExpressionAttributeNames: {
            "#SK": "SK",
        },
        ExpressionAttributeValues: {
            ':SK': `SPEC#${specialization}`,
        }
    };

    console.log(params);
    

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