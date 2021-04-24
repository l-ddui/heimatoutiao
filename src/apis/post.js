// 获取文章数据api
import axios from '@/utils/request'
export const getPostList = (params) => {
    return axios({
        url: `/post`,
        params
    })
}