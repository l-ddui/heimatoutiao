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


// 获取评论列表
export const getCommentList = (id) => {
    return axios({
        url: '/post_comment/' + id
    })
}

// 发布评论
export const postComment = (id, data) => {
    return axios({
        method: 'post',
        url: `/post_comment/${id}`,
        data
    })
}