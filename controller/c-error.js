const findTheVeryFirstFileInErrorStack = require("../utils/findFileInStack");
const soucemapParser = require("../utils/soucemapParser");
exports.uploadErrors = async ctx => {
  try {
    const body = ctx.request.body;
    await ctx.mysql.whriteError(body);
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
  JSON.parse(JSON.stringify(webErrors)).map(({ stack }) => {
    const sourceInfo = findTheVeryFirstFileInErrorStack(stack);
    soucemapParser(sourceInfo);
  });
  ctx.body = {
    code: 200,
    msg: "success",
    data: webErrors
  };
};
