require("babel-polyfill");
require("babel-register");
const Koa = require("Koa");
const bodyParser = require("koa-bodyparser");
const router = require("koa-router")();
const cors = require("koa2-cors");
const { logger, accessLogger } = require("./middleware/log");

const app = new Koa();

app.on("error", err => {
  logger.error(err);
});

const mysql = require("../mysql/index");
const PORT = process.env.PORT || 5000;

app.context.mysql = mysql;

router.post("/upload", async ctx => {
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
});

router.get("/errors", async ctx => {
  const webErrors = await ctx.mysql.query();
  ctx.body = {
    code: 200,
    msg: "success",
    data: webErrors
  };
});

app.use(accessLogger());

app.use(
  cors({
    origin: "*",
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"] //设置服务器支持的所有头信息字段
  })
);

app.use(bodyParser());

app.use(router.routes());

app.listen(PORT, err => {
  if (err) {
    console.log("server start failed...", err);
    return;
  }

  console.log(`Listening at port ${PORT}, server start...`);
});
