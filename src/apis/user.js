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
        //  设置拦截器 统一处理：只要有token就带上
        //  设置请求头
        // headers: { Authorization: localStorage.getItem('heimatoutiaoToken') }
    })
}

// 更新用户信息
export const updateUserInfo = (id, data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}

// 关注用户
export const followUser = (id) => {
    return axios({
        method: 'get',
        url: `/user_follows/${id}`,
    })
}
// 取消关注用户
export const unfollowUser = (id) => {
    return axios({
        method: 'get',
        url: `/user_unfollow/${id}`,
    })
}
// 获取用户关注列表
export const getUserfollow = () => {
    return axios({
        url: `/user_follows`,
    })
}
// 收藏文章列表
export const getUserstar = () => {
    return axios({
        url: '/user_star',
    })
}