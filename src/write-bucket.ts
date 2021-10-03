import { S3 } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const BUCKET_NAME = process.env.BUCKET_NAME!;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const s3Client = new S3();

  console.log(event);

  
  try {
    await s3Client.putObject({
      Bucket: BUCKET_NAME,
      Key: "test.json",
      Body: JSON.stringify({
        hello: "world",
      }),
    }).promise();
    return Promise.resolve({statusCode: 200, body: "File Created!"});
  } catch (error) {
    console.error('Could not list items from S3 bucket', error);
    throw error;
  }
}