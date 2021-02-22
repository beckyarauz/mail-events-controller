import * as AWS from 'aws-sdk'
import StepFunctions = require('aws-sdk/clients/stepfunctions')
import { StateMachineParams, WebhookEvent } from './interfaces';

export class StepFunctionTriggerer<T extends WebhookEvent<any>> {
  private stepFunction: StepFunctions;
  private parameters: StateMachineParams;
  private stateMachineArn: string;
  private input: any;

  constructor(event: T) {
    this.stateMachineArn = process.env.STATE_MACHINE_ARN || '';
    this.stepFunction = new AWS.StepFunctions();
    this.input = event;
  }

  preprocessEventString() {
    this.input['event-data'].event = this.input['event-data'].event.toLowerCase();
  }

  generateParameters() {
    this.parameters = {
      input: this.input,
      stateMachineArn: this.stateMachineArn,
    };
  }

  stringifyInputData() {
    if (typeof this.input !== 'string') {
      this.input = JSON.stringify(this.input);
    }
  }

  async executeFunction() {
    this.preprocessEventString();
    this.stringifyInputData();
    this.generateParameters();
    return this.stepFunction.startExecution(this.parameters).promise();
  }
}
