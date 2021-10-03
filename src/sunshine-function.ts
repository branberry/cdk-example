import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback } from "aws-lambda";
import axios from 'axios';
const NASA_POWER_API = "https://power.larc.nasa.gov/api/";
export const handler = async (event: APIGatewayProxyEvent, context: any, callback: Callback): Promise<APIGatewayProxyResult> => {
  try {
    const DATA_REQUEST_URL = `${NASA_POWER_API}temporal/${event.queryStringParameters?.["resolution"] || "climatology"}/point?parameters=${event.queryStringParameters?.['parameters']}&community=SB&longitude=${event.queryStringParameters?.['longitude']}&latitude=${event.queryStringParameters?.['latitude']}&start=${event.queryStringParameters?.['start']}&end=${event.queryStringParameters?.['end']}&format=JSON`;
    console.log(DATA_REQUEST_URL);
    const results = await axios.get(DATA_REQUEST_URL);
    console.log("RESULTS", JSON.stringify(results.data));
    return Promise.resolve({
      statusCode: 200, 
      body: JSON.stringify(results.data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Headers" : "Content-Type",
        'Content-Type': 'application/json',


      }
    });
  } catch (error) {
    console.log(`ERROR: COULD NOT MAKE REQUEST. \n ${(error as Error).message}`);
    throw error;
  }
} 