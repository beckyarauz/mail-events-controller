export interface StateMachineParams {
  input: string;
  stateMachineArn: string;
}

export interface EventData {
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

export interface WebhookEvent<E extends EventData> {
  'event-data': E;
  signature: {
    timestamp: string;
    token: string;
    signature: string;
  };
}
