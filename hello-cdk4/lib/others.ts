import * as cdk from '@aws-cdk/core';
import sqs = require('@aws-cdk/aws-sqs');
import { Queue } from '@aws-cdk/aws-sqs';
import dynamoDB =require('@aws-cdk/aws-dynamodb')

export class others extends cdk.NestedStack {
    public readonly arrayOfQueues: Queue[] = new Array(4)
    public readonly dynamoDBTable: dynamoDB.Table
    constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const queue = new sqs.Queue(this, 'dev-HelloQueue');
        this.arrayOfQueues[0] = queue

        const table = new dynamoDB.Table(this, 'dev-QueueRecorderTable-4', {
            partitionKey :{
                name: 'id', type: dynamoDB.AttributeType.STRING
            }
        });
        
          this.dynamoDBTable = table
          console.log("table.tableName=", table.tableName)
          console.log("queue.queueName=", queue.queueName)
    }
}