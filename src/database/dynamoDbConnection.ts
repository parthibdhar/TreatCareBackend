import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
console.log(`dynamoDb Connectedt: ${dynamoDbClient}`);

