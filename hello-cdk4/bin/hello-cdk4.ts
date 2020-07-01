#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HelloCdk4Stack } from '../lib/hello-cdk4-stack';
import { others } from '../lib/others';
import { lambdaHere } from '../lib/lambda';
import { ApiGatewayOnly } from '../lib/apigateway';


const app = new cdk.App();
var baseStack = new HelloCdk4Stack(app, 'HelloCdk4Stack', {});
const other = new others(baseStack, 'coreStack', {});
const lambdaOnly = new lambdaHere(baseStack, 'LambdaOnly',  other, {
} );
const apiGateway = new ApiGatewayOnly(baseStack, 'ApiGateway', lambdaOnly, {});
app.synth()
