// 获取文章数据api
import axios from '@/utils/request'
export const getPostList = (category) => {
    return axios({
        url: `/post?category=${category}`
    })
}