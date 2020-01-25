const fs = require("fs");
const path = require("path");

const writeFile = (fileName, content, options = {}) => {
  if (!content || !fileName) {
    throw new Error("'content', 'fileName' is required!!");
  }

  try {
    const { prefixDir = process.cwd() } = options;
    const pieces = fileName
      .replace(prefixDir, "")
      .split(/\//)
      .filter(p => !!p);
    let i = 0;
    if (pieces.length > 1) {
      let currentPath = prefixDir;
      // 自动创建空目录
      while (i < pieces.length - 1) {
        const checkedPath = path.resolve(currentPath, pieces[i]);
        if (!fs.existsSync(checkedPath)) {
          fs.mkdirSync(checkedPath);
        }
        currentPath = checkedPath;
        i++;
      }
    }
    fs.writeFile(fileName, content, e => {
      if (e) throw e;
    });
  } catch (e) {
    throw new Error("write file failed, beacuse of these:", e);
  }
};

module.exports = writeFile;
