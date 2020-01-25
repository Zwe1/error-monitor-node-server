const router = require("koa-router")();
const sourcemapController = require("../controller/c-sourcemap");

// 上传sourcemap文件
router.post("/sourcemap/upload", sourcemapController.uploadSourceMap);

module.exports = router;
