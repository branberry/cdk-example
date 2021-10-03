import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { WebSocketApi, WebSocketStage } from '@aws-cdk/aws-apigatewayv2';
import { LambdaWebSocketIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'; 
export default class WebSocketApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope,id, props);

      const connectFunction = new Function(this, "connect-function", {
        code: Code.fromAsset('./dist/src/'),
        handler: 'connect.handler',
        runtime: Runtime.NODEJS_14_X,
      });

      const disconnectFunction = new Function(this, "disconnect-function", {
        code: Code.fromAsset('./dist/src/'),
        handler: 'disconnect.handler',
        runtime: Runtime.NODEJS_14_X,
      });

      const defaultFunction = new Function(this, "default-function", {
        code: Code.fromAsset('./dist/src/'),
        handler: 'default.handler',
        runtime: Runtime.NODEJS_14_X,
      });

      const webSocketApi = new WebSocketApi(this, 'websocketapi', {
        connectRouteOptions: {integration: new LambdaWebSocketIntegration({ handler: connectFunction })},
        defaultRouteOptions: {integration: new LambdaWebSocketIntegration({ handler: disconnectFunction })},
        disconnectRouteOptions: {integration: new LambdaWebSocketIntegration({ handler: defaultFunction })},
      });

      new WebSocketStage(this, 'mystage', {
        webSocketApi,
        stageName: 'dev',
        autoDeploy: true,
      });
  }
}