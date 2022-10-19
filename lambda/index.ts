import { Handler } from "aws-lambda";
import axios from "axios";
import { GetParameterCommandOutput } from "@aws-sdk/client-ssm";

export const handler: Handler = async () => {
  const { data } = await axios.get<GetParameterCommandOutput>(
    `http://localhost:2773/systemsmanager/parameters/get?name=${process.env.PARAMETER_NAME}`,
    {
      headers: {
        "X-Aws-Parameters-Secrets-Token": process.env.AWS_SESSION_TOKEN,
      },
    }
  );

  return data.Parameter?.Value;
};
