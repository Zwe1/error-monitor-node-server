const mysql = require("mysql");
const config = require("../config/default");
const sqls = require("./sqls");
const { logger } = require("../middleware/log");

const connection = mysql.createConnection(config.databaseConfig);

class MySQL {
  constructor() {
    this.table = "errors";
    this.init();
  }

  init = () => {
    connection.query(sqls.createTable(this.table), (err, res, fields) => {
      if (err) {
        logger.error("connect errors table failed...", err);
      }
    });
  };

  query = () =>
    new Promise((r, j) => {
      connection.query(sqls.all(this.table), (err, res) => {
        if (err) {
          logger.error(err);
          j(err);
        } else {
          r(res);
        }
      });
    });

  whriteError = error =>
    new Promise((r, j) => {
      connection.query(sqls.writeError(this.table), error, (err, res) => {
        if (err) {
          logger.error(err);
          j(err);
        } else {
          r(res);
        }
      });
    });
}

module.exports = new MySQL();
