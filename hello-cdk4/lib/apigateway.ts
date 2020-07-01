import * as cdk from '@aws-cdk/core';
import {RestApi, LambdaIntegration} from '@aws-cdk/aws-apigateway';
import { lambdaHere } from './lambda';

export class ApiGatewayOnly extends cdk.NestedStack {
    constructor(scope: cdk.Construct, id: string, secondStack:lambdaHere,  props?: cdk.NestedStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'nestedapi', {
            deployOptions: {
              stageName: 'dev'
            }
          });
          
          api.root.addMethod('POST', new LambdaIntegration(secondStack.arrayOfFunctions[1]));
    }

}
