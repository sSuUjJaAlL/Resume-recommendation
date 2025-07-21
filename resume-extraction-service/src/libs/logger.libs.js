import kleur from "kleur";
import winston from "winston";

const { combine, printf } = winston.format;

const myFormat = printf(({ level, message, service }) => {
  let jsonString = `{ "message": "${
    level === "error" ? kleur.red(message) : kleur.gray(message)
  }"`;
  jsonString += `, "level": "${level}", "service": "${kleur.yellow(
    service
  )}" }`;
  return jsonString;
});

function createLogger(service) {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    defaultMeta: { service },
    format: combine(myFormat),
    transports: [new winston.transports.Console()],
  });
}

const extractionLogger = createLogger("resume-extraction-service");

export default extractionLogger;
