import dotenv from "dotenv";
dotenv.config();

const getEnvValue = (key: string): string | undefined => {
  let envValue: string | undefined = undefined;
  if (Object.prototype.hasOwnProperty.call(process.env, key)) {
    envValue = process.env[key];
  }

  if (!envValue) {
    throw new Error(
      `The Key : ${key} Does not Exists on the Environment Variable`
    );
  }

  return envValue;
};

export { getEnvValue };
