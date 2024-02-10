import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
export default dynamoDbClient;


/*
1. primary key is made of sort key + partition key
2. The partition key determines the partition (or segment) in which an item is stored,
   The sort key determines the sort order of items within that partition
  
   PK -> unique  
    Doctor -> DOC#yt3y598y2525
    Patient -> PAT#9u395u306u52t
    Clinic -> CLNC#9638y28528

  SK -> 
    1.
    2. PAT#{patID}



    1. get all doc of a clinic
    2. get doc by id
    3. get all the patient of doc
*/