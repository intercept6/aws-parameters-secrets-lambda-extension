import * as cdk from "aws-cdk-lib";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

export class AwsParametersSecretsLambdaExtensionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const param = new StringParameter(this, "Parameter", {
      parameterName: "mySsmParameter",
      stringValue: "mySsmParameterValue",
    });

    const handler = new NodejsFunction(this, "Function", {
      entry: "lambda/index.ts",
      environment: {
        PARAMETER_NAME: param.parameterName,
      },
    });
    handler.addLayers(
      LayerVersion.fromLayerVersionArn(
        this,
        "ParametersAndSecretsLambda",
        "arn:aws:lambda:ap-northeast-1:133490724326:layer:AWS-Parameters-and-Secrets-Lambda-Extension:2"
      )
    );
    param.grantRead(handler);
  }
}
