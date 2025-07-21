import path from "path";
import extractionLogger from "../libs/logger.libs.js";

const getCVPayload = (prefixPath) => {
  const currentPath = process.cwd().split("\\").slice(0, -1).join("\\");

  extractionLogger.info(process.cwd())
  return path.join(currentPath, "resume-matcher-backend", prefixPath);
};

export { getCVPayload };
