import { S3 } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const BUCKET_NAME = process.env.BUCKET_NAME!;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const s3Client = new S3();

  console.log(event);

  try {
    const results =  await s3Client.listObjectsV2({
      Bucket: BUCKET_NAME,
    }).promise();
    console.log(results.Contents);
    return Promise.resolve({statusCode: 200, body: `${JSON.stringify(results.Contents)}`});
  } catch (error) {
    console.error('Could not list items from S3 bucket', error);
    throw error;
  }
}