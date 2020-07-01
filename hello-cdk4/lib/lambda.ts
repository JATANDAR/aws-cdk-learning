import * as cdk from '@aws-cdk/core';
import lambda =require('@aws-cdk/aws-lambda');
import sqs = require('@aws-cdk/aws-sqs');
import event_sources = require('@aws-cdk/aws-lambda-event-sources')
import dynamoDB =require('@aws-cdk/aws-dynamodb');
import {RestApi, LambdaIntegration} from '@aws-cdk/aws-apigateway';
import { others } from './others';

export class lambdaHere extends cdk.NestedStack {
    public readonly arrayOfFunctions :lambda.Function[] = new Array(4)
    constructor(scope: cdk.Construct, id: string, mainStack: others, props?: cdk.NestedStackProps) {
        super(scope, id, props);

        

        const helloFunction = new lambda.Function(this, 'dev-NestedHelloFunction-4',{
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset('lambda'),
            handler: 'index.handler',
            environment:{
                TableName: mainStack.dynamoDBTable.tableName
            }
          } );
         
          helloFunction.addEventSource(new event_sources.SqsEventSource(mainStack.arrayOfQueues[0]));
          helloFunction.addEnvironment('TableName', mainStack.dynamoDBTable.tableName);
          this.arrayOfFunctions[0] = helloFunction;
          //new cdk.CfnOutput(this, "dev-HelloQueue", {})
         // helloFunction.addEventSource(new event_sources.SqsEventSource(new cdk.Fn.ref("dev-HelloQueue")));
          
          const publishFunction = new lambda.Function(this, 'publishFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset('lambda'),
            handler: 'publish.handler',
            environment:{
                QUEUE_URL: mainStack.arrayOfQueues[0].queueUrl
              }
        });
        this.arrayOfFunctions[1] = publishFunction;

        mainStack.arrayOfQueues[0].grantSendMessages(publishFunction);
        mainStack.dynamoDBTable.grantWriteData(helloFunction);
        
        // api.root.addMethod('POST', new LambdaIntegration(publishFunction));
        // const table = new dynamoDB.Table(this, 'dev-QueueRecorderTable-3', {
        //     partitionKey :{
        //         name: 'id', type: dynamoDB.AttributeType.STRING
        //     }
        // });
        
    }
}