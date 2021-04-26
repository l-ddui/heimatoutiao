// 引入axios
import axios from 'axios'
import { Toast } from 'vant';
// 添加默认配置
axios.defaults.baseURL = 'http://157.122.54.189:9083'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    let token = localStorage.getItem('heimatoutiaoToken')
    if (token) {
        // 添加token
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response);
    if (response.data.message == '用户信息验证失败！' || response.data.message == '用户信息验证失败') {
        Toast.fail('用户信息验证失败')
        // 获取当前页面的地址： window.location.href
        // 将当前页面的地址作为参数传递给登陆页面
        window.location.href = '#/login?redirect_url=' + window.location.href
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 暴露
export default axios
