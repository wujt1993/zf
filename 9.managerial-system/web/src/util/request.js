import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
})
// request拦截器
service.interceptors.request.use(
    config => {
        let contenType = config.headers['Content-Type'] || "application/x-www-form-urlencoded";
        config.headers["Content-Type"] = contenType;
        return config
    },
    error => {
        Promise.reject(error)
    }
)
let islock = false
// response 拦截器
service.interceptors.response.use(
    response => {
        const statusCodeValue = response.data.code
        if (statusCodeValue < 200 || statusCodeValue > 300 ) {
            if(!islock){
                islock = true
                if(statusCodeValue == 401){
                    router.push("/login")
                }else if(statusCodeValue == 403){
                    Message({
                        message: "您暂无权限",
                        type: "error",
                        showClose: true,
                        duration: 2000
                    });
                }else{
                    Message({
                        message: response.data.msg,
                        type: "error",
                        showClose: true,
                        duration: 10000
                    });
                }
            }
            setTimeout(()=>{
                islock = false
            },5000)    
            return Promise.reject('error')
        } else {
            islock = false
            return response.data
            
        }
    },
    error => {
        if(!islock){
            islock = true
            Message({
                message: "服务端错误",
                type: "error",
                showClose: true,
                duration: 2000
            });
        }
        setTimeout(()=>{
            islock = false
        },5000)   
        return Promise.reject('error')
    }
)
export default service
