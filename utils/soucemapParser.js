const fs = require("fs");
const path = require("path");
const sourceMapTool = require("source-map");
const { sourceMapConfig } = require("../config/default");

// 检验是否为文件夹
const notStrictlyIsDir = p => !/\./.test(p);

// 检测manifest文件
const isManifest = p => /manifest\.json/.test(p);

// 从sourcemap目录解析文件
const sourcemapPrefix = p => path.join(sourceMapConfig.dir, p);

// 从sourcemap目录中找到sourcemap文件
const findManifest = baseDir => {
  const files = fs.readdirSync(baseDir);

  if (files.some(f => isManifest(f))) {
    return path.join(baseDir, files.filter(f => isManifest(f))[0]);
  }

  files.forEach(f => {
    if (notStrictlyIsDir(f)) {
      findManifest(path.join(baseDir, f));
    }
  });
};

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
  // 找到source-map文件
  const manifest = findManifest(sourceMapConfig.dir);
  let outputSourcemapFilename = "";

  if (manifest) {
    const content = fs.readFileSync(manifest);
    const { files } = JSON.parse(content);
    outputSourcemapFilename = files[`${filename}.map`];
  }

  return outputSourcemapFilename;
};

/**
 *
 * @param {sourcemap 文件} sourcemapFile
 * @param {行号} line
 * @param {列号} col
 *
 * 通过 sourec-map 来解析错误源码
 */
const parseJSError = (sourcemapFile, line, col) => {
  return new Promise(resolve => {
    fs.readFile(sourcemapFile, "utf8", function readContent(
      err,
      sourcemapcontent
    ) {
      sourceMapTool.SourceMapConsumer.with(sourcemapcontent, null, consumer => {
        const parseData = consumer.originalPositionFor({
          line: parseInt(line),
          column: parseInt(col)
        });

        resolve(JSON.stringify(parseData));
      });
    });
  });
};

/**
 * 根据 sourcemap 文件解析错误源码
 * 1. 根据传入的错误信息确定sourcemap文件
 * 2. 根据错误行列信息转换错误源码
 * 3. 将转换后的错误源码片段入库
 */

module.exports = (info = []) => {
  const [filename, line, col] = info;

  // 错误文件的 map 文件
  const sourcemapFileName = `${sourceMapConfig.dir}${filename}.map`;

  if (fs.existsSync(sourcemapFileName)) {
    return parseJSError(sourcemapFileName, line, col);
  }

  return Promise.resolve(JSON.stringify({}));
};
