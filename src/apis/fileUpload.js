//  实现文件上传
import axios from '@/utils/request'
export const uploadFile = (data) => {
    return axios({
        url: '/upload',
        method: 'post', data
    })
}