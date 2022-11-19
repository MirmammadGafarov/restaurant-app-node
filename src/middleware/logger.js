const { transports, createLogger, format } = require("winston");
const { combine, timestamp, prettyPrint } = format;
module.exports = createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "DD-MMM-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./src/logs/logs.log", level: "error" }),
  ],
});
