import * as cdk from '@aws-cdk/core';
import sqs = require('@aws-cdk/aws-sqs');
import lambda =require('@aws-cdk/aws-lambda');
import event_sources = require('@aws-cdk/aws-lambda-event-sources')
import dynamoDB =require('@aws-cdk/aws-dynamodb')
import {RestApi, LambdaIntegration} from '@aws-cdk/aws-apigateway';

export class HelloCdk3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const queue = new sqs.Queue(this, 'dev-HelloQueue-3');

    const fn = new lambda.Function(this, 'dev-HelloFunction-3',{
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset('lambda'),
      handler: 'index.handler',
      // environment:{
      //   QUEUE_URL: queue.queueUrl
      // }
    } 
  );

  fn.addEventSource(new event_sources.SqsEventSource(queue));

  const publishFunction = new lambda.Function(this, 'publishFunction', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset('lambda'),
      handler: 'publish.handler'
  });

  const api = new RestApi(this, 'api', {
    deployOptions: {
      stageName: 'dev'
    }
  });
  
  api.root.addMethod('POST', new LambdaIntegration(publishFunction));


  const table = new dynamoDB.Table(this, 'dev-QueueRecorderTable-3', {
    partitionKey :{
        name: 'id', type: dynamoDB.AttributeType.STRING
    }
});


  console.log("table.tableName=", table.tableName)
  console.log("queue.queueName=", queue.queueName)
  fn.addEnvironment('TableName', table.tableName);
  publishFunction.addEnvironment('QUEUE_URL', queue.queueUrl);

  queue.grantSendMessages(publishFunction);
  table.grantWriteData(fn);
  
  
}
}
