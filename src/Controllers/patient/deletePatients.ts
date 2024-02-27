import dynamoDbClient from "../../database/dynamoDbConnection";


export default async function deletePat(patId: string, ) {

    var params = {
        TableName: process.env.TABLE_NAME as string,
        Key: { PK: `PAT#${patId}`, SK: `PAT#${patId}` }
    };

    try {
        const res = await dynamoDbClient.delete(params).promise()


        if (res) {
            return {
                success: true,
                message: 'deleted successfully',
            }
        } else {
            return {
                success: false,
                message: 'Error deleteting'
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