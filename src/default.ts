
export const handler = (event: any, context: any, callback: any) => {
  console.log("CONNECTED!");
  console.log(JSON.stringify(event, null, 2));

  return { statusCode: 200, body: "Connected! Woohoo!"};
}