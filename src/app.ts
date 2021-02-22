import {
  APIGatewayProxyResult,
} from 'aws-lambda';
import { WebhookEvent } from './interfaces';
import { StepFunctionTriggerer } from './StepFunctionTriggerer';

export const handler = async <T extends WebhookEvent<any>>(
  event: T
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  try {
    const stepTrigger = new StepFunctionTriggerer(event);
    const result = await stepTrigger.executeFunction();

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
