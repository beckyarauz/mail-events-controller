import {
  APIGatewayProxyResult,
} from 'aws-lambda';

import * as AWS from 'aws-sdk';

const stepfunction = new AWS.StepFunctions();

interface StateMachineParams {
  input: string;
  stateMachineArn: string;
}

interface WebhookEvent {
  'event-data': {
    timestamp: number;
    event: string;
    storage?: {
      url: string;
      key: string;
    };
    id: string;
    message: {
      headers: {
        'message-id': string;
      }
    }
  };
  signature: string;
}

export const handler = async <T extends WebhookEvent>(
  event: T
): Promise<APIGatewayProxyResult> => {
  event['event-data'].event = event['event-data'].event.toLowerCase();

  const params: StateMachineParams = {
    input: JSON.stringify(event),
    stateMachineArn: process.env.STATE_MACHINE_ARN || '',
  }

  let response;

  try {
    await stepfunction.startExecution(params).promise();

    response = {
      statusCode: 202,
      body: 'success',
    };
  } catch (e) {
    console.error(e.message);
    response = {
      statusCode: 500,
      body: 'Something went wrong',
    };
  }

  return response;
}
