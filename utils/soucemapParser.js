const fs = require("fs");
const { sourceMapConfig } = require("../config/default");

/**
 *
 * @param {文件名称} filename
 *
 * 如何确认一份sourcemap样本
 *
 * 1. 一个租户的一位用户
 * 2. 该用户某一版本的 sourcemap 样本
 *
 */
const findSourcemapFile = (filename, col, line) => {
  const sourcemapDirs = fs.readdirSync(sourceMapConfig.dir);
  let outputSourcemapFilename;

  sourcemapDirs.forEach(dir => {
    const files = fs.readFileSync(dir);
    const manifest = files.filter(f => /manifest\.json/.test(f))[0];

    if (manifest) {
      const content = fs.readFileSync(manifest);
      const { files } = JSON.parse(content);

      outputSourcemapFilename = files[filename];
    }
  });

  return outputSourcemapFilename;
};

/**
 * 根据 sourcemap 文件解析错误源码
 * 1. 根据传入的错误信息确定sourcemap文件
 * 2. 根据错误行列信息转换错误源码
 * 3. 将转换后的错误源码片段入库
 */

module.exports = (info = []) => {
  const [filename, line, col] = info;
  //   if (!col || !line || !filename) {
  //     console.log(
  //       "error info is not complete, please specify the line, col and filename"
  //     );
  //     return;
  //   }

  const hittedFile = findSourcemapFile(filename, Number(col), Number(line));

  fs.readFile(hittedFile, (e, c) => {
    console.log("ec", e, c);
  });
};
