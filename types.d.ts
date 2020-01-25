/**
 * 接受到的错误信息消息体，包含以下信息：
 * 1. 用户信息
 * 2. 请求信息
 * 3. 用户设备信息
 * 4. 错误信息
 */
type uploadErrorInfo = {
  /**
   * 用户id
   */
  userId: string;
  /**
   * 账户名称
   */
  username: string;
  /**
   * 租户
   */
  tenant: string;
  /**
   * 请求信息
   */
  request: {
    /**
     * 请求方法
     */
    method: string;
    /**
     * 请求地址
     */
    url: string;
    /**
     * 请求源地址
     */
    origin: string;
    /**
     * 用户设备
     */
    userAgent: string;
  };
  /**
   * 错误信息单元
   */
  error: {
    /**
     * 错误信息
     */
    message: string;
    /**
     * 错误栈，详细信息
     */
    stack: string;
    /**
     * 错误文件名称
     */
    filename: string;
    /**
     * 错误行
     */
    line: number;
    /**
     * 错误列
     */
    column: number;
    /**
     * 错误类型
     */
    type: string;
  };
  // 发生错误的时间戳
  timestamp: number;
};

/**
 * 发送给前端的错误信息消息体，包含以下信息：
 * 1. 用户信息
 * 2. 请求信息
 * 3. 用户设备信息
 * 4. 错误信息（sourcemap 解析后）
 */
type ErrorList = {
  /**
   * 用户id
   */
  userId: string;
  /**
   * 账户名称
   */
  username: string;
  /**
   * 租户
   */
  tenant: string;
  /**
   * 请求信息
   */
  request: {
    /**
     * 请求方法
     */
    method: string;
    /**
     * 请求地址
     */
    url: string;
    /**
     * 请求源地址
     */
    origin: string;
    /**
     * 用户设备
     */
    userAgent: string;
  };
  /**
   * 错误信息单元
   */
  error: {
    /**
     * 错误信息
     */
    message: string;
    /**
     * 错误栈，详细信息
     */
    stack: string;
    /**
     * 错误文件名称
     */
    filename: string;
    /**
     * 源文件名
     */
    sourceFilename: string;
    /**
     * 错误信息片段，sourcemap解析后
     */
    info: string;
    /**
     * 错误行
     */
    line: number;
    /**
     * 错误列
     */
    column: number;
    /**
     * 错误类型
     */
    type: string;
  };
  // 发生错误的时间戳
  timestamp: number;
}[];
