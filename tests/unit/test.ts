import 'mocha';
import { handler } from '../../src/app';
import { expect } from 'chai';
import * as AWSMock from 'aws-sdk-mock';
import * as deliveredEvent from '../data/delivered.json';

describe('Mail State Executer Function', async () => {
  before(() => {
    AWSMock.mock('StepFunctions', 'startExecution', (params) => {
      expect(params).to.have.property('input', JSON.stringify(deliveredEvent));
      return Promise.resolve({
        "executionArn": "mock-arn",
        "startDate": 123
      });
    });
  })

  it('should return accepted response', async () => {
    const result = await handler(deliveredEvent);
    expect(result).to.eql({
      statusCode: 202,
      body: JSON.stringify({
        message: 'success',
        startDate: 123
      }),
    });
  });

  after(() => {
    AWSMock.restore('StepFunctions');
  })
});
