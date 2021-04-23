// 获取栏目数据api
import axios from '@/utils/request'
export const getCateList = () => {
    return axios({
        method: 'get',
        url: '/category'
    })
}