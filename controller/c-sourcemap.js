const qs = require("querystring");
const path = require("path");
const { sourceMapConfig } = require("../config/default");
const writeFile = require("../utils/writeFile");

exports.uploadSourceMap = ctx => {
  ctx.req
    .on("data", data => {
      const souremapContent = data.toString("utf8");
      const { querystring } = ctx.request;
      const { timeStamp, fileName } = qs.parse(querystring);

      writeFile(
        path.join(sourceMapConfig.dir, timeStamp, fileName),
        souremapContent
      );
    })
    .on("close", () => {})
    .on("error", () => {})
    .on("end", () => {});
};
