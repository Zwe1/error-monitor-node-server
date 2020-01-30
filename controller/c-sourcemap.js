const qs = require("querystring");
const path = require("path");
const { sourceMapConfig } = require("../config/default");
const { writeFile, delDir } = require("../utils/writeFile");

exports.uploadSourceMap = ctx => {
  ctx.req
    .on("data", data => {
      const souremapContent = data.toString("utf8");
      const { querystring } = ctx.request;
      const { fileName } = qs.parse(querystring);

      writeFile(path.join(sourceMapConfig.dir, fileName), souremapContent);
    })
    .on("close", () => {})
    .on("error", () => {})
    .on("end", () => {});
};
