import axios from 'axios'

export default (url, data = {}, method = 'GET') => {
    return new Promise((resolve, rejectd) => {
        // axios.defaults.baseURL = 'http://localhost:8080'
        if (method === 'GET') {
            // 准备url query参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
        }
        axios({
            method,
            url,
            data
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            rejectd(err)
        })
    })
}