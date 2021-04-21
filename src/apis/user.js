//  添加与用户想关操作
import axios from '@/utils/request'
// 用户登录
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}

// 用户注册
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}

// 根据用户id获取用户详情
export const getUserDetail = (id) => {
    return axios({
        method: 'get',
        // /user/:id 这种形式的参数只能用以下方式获取
        url: `/user/${id}`,
        //  设置请求头
        headers: { Authorization: localStorage.getItem('heimatoutiaoToken') }
    })
}