import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';

export class CdkBlogStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new Bucket(this, 'test-bucket');

    const writeToBucketFunction = new Function(this, 'write-function', {
      code: Code.fromAsset('./dist/src/'),
      handler: 'write-bucket.handler',
      runtime: Runtime.NODEJS_14_X,
      environment: {
        BUCKET_NAME: bucket.bucketName,
      }
    });

    bucket.grantWrite(writeToBucketFunction);
  }
}
