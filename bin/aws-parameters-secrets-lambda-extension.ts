#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsParametersSecretsLambdaExtensionStack } from "../lib/aws-parameters-secrets-lambda-extension-stack";

const app = new cdk.App();
new AwsParametersSecretsLambdaExtensionStack(
  app,
  "AwsParametersSecretsLambdaExtensionStack",
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: "ap-northeast-1",
    },
  }
);
