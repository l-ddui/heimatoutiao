// 获取文章数据api
import axios from '@/utils/request'
export const getPostList = (params) => {
    return axios({
        url: `/post`,
        params
    })
}



//获取指定id的文章详情数据
export const getPostDetail = (id) => {
    return axios({
        url: `/post/${id}`
    })
}