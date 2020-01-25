const router = require("koa-router")();
const errorsController = require("../controller/c-error");

// 上传错误信息
router.post("/errors/upload", errorsController.uploadErrors);

// 获取错误信息
router.get("/errors/list", errorsController.getErrors);

module.exports = router;
