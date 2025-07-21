import dotenv from "dotenv";
dotenv.config();

const getObjectValue = (obj, key) => {
  return obj[key];
};

const getEnvValue = (key) => {
  return process.env[key];
};
export { getObjectValue, getEnvValue };
