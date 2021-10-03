import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Cors, LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';

export class CdkBlogStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new Bucket(this, 'test-bucket');

    const restApi = new RestApi(this, 'test-api', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      }
    });

    const writeToBucketFunction = new Function(this, 'write-function', {
      code: Code.fromAsset('./dist/src/'),
      handler: 'write-bucket.handler',
      runtime: Runtime.NODEJS_14_X,
      environment: {
        BUCKET_NAME: bucket.bucketName,
      }
    });

    const sunshineFunction = new Function(this, 'sunshine-function', {
      code: Code.fromAsset('./dist/src/'),
      handler: 'sunshine-function.handler',
      runtime: Runtime.NODEJS_14_X,
    })

    bucket.grantWrite(writeToBucketFunction);

    restApi.root.addMethod("POST", new LambdaIntegration(writeToBucketFunction));
    
    const getSunshine = restApi.root.addResource('sunshine', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      }
    });
    
    
    
    getSunshine.addMethod('GET', new LambdaIntegration(sunshineFunction), {
      methodResponses: [{ statusCode: "200"}]
    });

  }
}
