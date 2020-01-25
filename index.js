require("babel-polyfill");
require("babel-register");
const Koa = require("Koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const errorsRouter = require("./routers/errors");
const sourcemapRouter = require("./routers/sourcemap");
const { logger, accessLogger } = require("./middleware/log");
const mysql = require("./mysql/index");
const { webserver } = require("./config/default");
const PORT = process.env.PORT || webserver.PORT;

const app = new Koa();

app.on("error", err => {
  logger.error(err);
});

app.context.mysql = mysql;

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

app.use(errorsRouter.routes());
app.use(sourcemapRouter.routes());

app.listen(PORT, err => {
  if (err) {
    console.log("server start failed...", err);
    return;
  }
  console.log(`Listening at port ${PORT}, server start...`);
});
