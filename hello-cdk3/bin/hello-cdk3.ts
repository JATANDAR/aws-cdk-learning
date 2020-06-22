#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HelloCdk3Stack } from '../lib/hello-cdk3-stack';

const app = new cdk.App();
new HelloCdk3Stack(app, 'HelloCdk3Stack');
