import 'mocha';
import { handler } from '../../src/app';
import { expect } from 'chai';
import * as deliveredEvent from '../data/delivered.json';
// import AWS from 'aws-sdk-mock';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line

describe('Mail State Executer Function', async () => {
  it('should return accepted response', async () => {
    const result = await handler(deliveredEvent);
    expect(result).to.eql({
      statusCode: 202,
      body: 'success',
    });
  });

  it('should return fail response', async () => {
    const result = await handler({'event-data': {}});

    expect(result).to.have.property('statusCode', 500);
  });
});
