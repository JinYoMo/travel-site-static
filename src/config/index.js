
// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    timeout: 8000,
    maxContentLength: 20480000000,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: process.env.VUE_APP_BASE_URL,
    uploadURL: '/file/upload'
};

// 开启请求参数打印
export const CONSOLE_REQUEST_ENABLE = false;
// 开启响应参数打印
export const CONSOLE_RESPONSE_ENABLE = false;

// API 默认配置
export const API_DEFAULT_CONFIG = {
    mockBaseURL: process.env.MOCK_URL, // mock地址
    mock: process.env.IS_MOCK || false, // 是否开启mock
    debug: false, // 是否开启debug模式
    sep: '/' // 接口调用分隔符
};