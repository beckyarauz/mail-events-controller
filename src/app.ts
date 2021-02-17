import {
  APIGatewayProxyResult,
} from 'aws-lambda';

import * as AWS from 'aws-sdk';

const stepfunction = new AWS.StepFunctions();

interface StateMachineParams {
  input: string;
  stateMachineArn: string;
}

interface EventData {
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
}

interface WebhookEvent<E extends EventData> {
  'event-data': E;
  signature: {
    timestamp: string;
    token: string;
    signature: string;
  };
}

export const handler = async <T extends WebhookEvent<any>>(
  event: T
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  try {
    event['event-data'].event = event['event-data'].event.toLowerCase();

    const params: StateMachineParams = {
      input: JSON.stringify(event),
      stateMachineArn: process.env.STATE_MACHINE_ARN || '',
    }
    await stepfunction.startExecution(params).promise();

    response = {
      statusCode: 202,
      body: 'success',
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
