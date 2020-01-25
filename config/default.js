// db & server config
const path = require("path");

module.exports = {
  webserver: {
    PORT: 5000
  },
  databaseConfig: {
    database: "error_monitor_ci",
    user: "root",
    password: "1234567890",
    host: "localhost"
  },
  sourceMapConfig: {
    dir: path.resolve(process.cwd(), "sourceMaps")
  }
};
