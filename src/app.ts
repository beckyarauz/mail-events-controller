import {
  APIGatewayProxyResult,
} from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { StateMachineParams, WebhookEvent } from './interfaces';

export const handler = async <T extends WebhookEvent<any>>(
  event: T
): Promise<APIGatewayProxyResult> => {
  const stepFunction = new AWS.StepFunctions();
  let response: APIGatewayProxyResult;
  try {
    event['event-data'].event = event['event-data'].event.toLowerCase();

    const params: StateMachineParams = {
      input: JSON.stringify(event),
      stateMachineArn: process.env.STATE_MACHINE_ARN || '',
    }
    const result = await stepFunction.startExecution(params).promise();

    response = {
      statusCode: 202,
      body: JSON.stringify({
        message: 'success',
        startDate: result.startDate
      }),
    };
  } catch (e) {
    console.error(e.message);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong',
        error: e.message,
      }),
    };
  }

  return response;
}
