import * as cdk from '@aws-cdk/core';
import sqs = require('@aws-cdk/aws-sqs');
import lambda =require('@aws-cdk/aws-lambda');
import event_sources = require('@aws-cdk/aws-lambda-event-sources')
import { ApiGatewayOnly } from './apigateway';
import { lambdaHere } from './lambda';
import { Queue } from '@aws-cdk/aws-sqs';
import { others } from './others';

export class HelloCdk4Stack extends cdk.Stack {
  
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // const other = new others(this, 'coreStack', {});
    
    // const lambdaOnly = new lambdaHere(this, 'LambdaOnly',  other, {
      
    // } );
    //lambdaOnly.addDependency(this, "Access Queues");
       
    // const apiGateway =new ApiGatewayOnly(this, 'ApiGateway', lambdaOnly, {});
    //apiGateway.addDependency(lambdaOnly, "Access Lambdas");

  }
}
