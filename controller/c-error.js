const findTheVeryFirstFileInErrorStack = require("../utils/findFileInStack");
const soucemapParser = require("../utils/soucemapParser");
exports.uploadErrors = async ctx => {
  try {
    const body = ctx.request.body;
    const { stack } = body;
    // 解析 source-map
    const sourceInfo = findTheVeryFirstFileInErrorStack(stack);
    const sourceMapInfo = await soucemapParser(sourceInfo);
    // 将 source-map 信息插入表中
    await ctx.mysql.whriteError({ ...body, sourcemap: sourceMapInfo });
    ctx.response.type = "json";
    ctx.body = "ok";
  } catch (e) {
    ctx.statusCode = 500;
    ctx.response.type = "json";
    ctx.body = "error";
  }
};

exports.getErrors = async ctx => {
  const webErrors = await ctx.mysql.query();

  ctx.body = {
    code: 200,
    msg: "success",
    data: webErrors
  };
};
