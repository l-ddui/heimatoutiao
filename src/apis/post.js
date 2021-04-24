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

// 文章点赞
export const likeThisArticle = (id) => {
    return axios({
        url: '/post_like/' + id
    })
}

// 收藏文章
export const starThisArticle = (id) => {
    return axios({
        url: '/post_star/' + id
    })
}