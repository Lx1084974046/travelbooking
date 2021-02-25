import { get,post } from '@/utils/request.js'
//用户注册
export const userRegister = params =>
    post('/userRegister',params)

//查询用户
export const userFind = params =>
    get('/userFind',params)