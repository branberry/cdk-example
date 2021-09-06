import { Callback } from "aws-lambda";

export const handler = (event: any, context: any, callback: Callback) => {
  console.log("CONNECTED!");
  console.log(JSON.stringify(event, null, 2));

  const response = { statusCode: 200, body: "Connected! Woohoo!"};
  callback(null, response);
}