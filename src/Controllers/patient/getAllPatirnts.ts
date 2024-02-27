
import dynamoDbClient from "../../database/dynamoDbConnection";

const getAllPatients = async () => {

    console.log("hi get all patients")
    try {
        const prefix = 'PAT#';
        const params = {
            TableName: process.env.TABLE_NAME as string,
            // IndexName: 'PK-index',
            FilterExpression: 'begins_with(#PK, :prefix)',
            ExpressionAttributeNames: { // Define the expression attribute name #PK
                "#PK": "PK", // Replace 'pk' with your actual attribute name
            },
            ExpressionAttributeValues: {
                ':prefix': prefix
              }

        }
        const allPatients = await dynamoDbClient.scan(params).promise();
        console.log(allPatients)
        if(allPatients.Count as number > 0){
            return {
                success: true,
                message: 'all patients are fetched successfully',
                data: allPatients
            }
        }
        else{
            return{
                success: false,
                message: 'not found'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'There was an error in fetching patients',
            error
        }
    }
   
}

export default getAllPatients;