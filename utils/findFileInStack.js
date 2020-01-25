/**
 * 从错误信息栈中找到第一个错误文件位置
 */
const findTheVeryFirstFileInErrorStack = stack => {
  if (!stack) return "";

  // 第一个出错文件
  const reg = /.*\((\S+)\).*/;
  // 去掉域名
  const reg1 = /.*\/\/\S+?(\/.*)/;

  // 找到第一个出错文件
  let x = stack.match(reg)[0];
  // 取出文件地址
  x = x.replace(reg, "$1");
  // 去掉域名
  x = x.replace(reg1, "$1");

  // [path, line, col]
  return x.split(":");
};

module.exports = findTheVeryFirstFileInErrorStack;
