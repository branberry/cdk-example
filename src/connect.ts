import { APIGatewayEvent, Callback } from "aws-lambda";

import Websocket from 'ws';

export const handler = (event: APIGatewayEvent, context: any, callback: Callback) => {
  console.log("CONNECTED!");
  console.log(JSON.stringify(event, null, 2));
  try {
    const body = JSON.parse(event.body ?? "");
    const response = { statusCode: 200, body: "Connected! Woohoo!"};
    console.log("body");
    console.log(event.requestContext.connectionId);
    callback(null, response);
  } catch (error) {

    throw error;
  }

}