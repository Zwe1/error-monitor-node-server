## 错误监控系统 (server）

### 目标

    针对B端应用难以分析远程错误，设想构建一个错误收集监控系统，以便错误记录与收集并展示。

### 架构

    整个系统包含前端系统，后端系统，及数据库服务。前端收集上报发送错误信息到服务端，服务端处理收集存储错误信息到数据库，并支持前端获取处理后的错误信息，在前端进行集中展示。

### 基本功能

1. 错误上报
2. 错误信息输出
3. source-map
4. 统计 uv, pv (C)
5. 前端性能 (C)
6. 用户轨迹 (C)
7. 邮件通知 (hard)
8. ci 系统 （hard）

### 数据结构

```TypeScript
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
    }
    // 发生错误的时间戳
    timestamp: number;
}
```

```TypeScript
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
    }
    // 发生错误的时间戳
    timestamp: number;
}[]
```
