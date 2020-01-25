const path = require("path");
const log4js = require("koa-log4");

log4js.configure({
  appenders: {
    access: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd.log",
      encoding: "utf-8",
      filename: path.join(process.cwd(), "logs", "access.log")
    },
    application: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd.log",
      encoding: "utf-8",
      filename: path.join(process.cwd(), "logs", "application.log")
    },
    out: {
      type: "console"
    }
  },
  categories: {
    default: { appenders: ["out"], level: "info" },
    access: { appenders: ["access"], level: "info" },
    application: { appenders: ["application"], level: "WARN" }
  }
});

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger("access"));
exports.logger = log4js.getLogger("application");
