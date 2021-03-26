import { get,post } from '@/utils/request.js'
//用户注册
export const userRegister = params =>
    post('/userRegister',params)

//查询用户
export const userFind = params =>
    get('/userFind',params)

//用户登录
export const userLogin = params =>
    post('/userLogin',params)

//用户信息修改
export const userUpdate = params =>
    post('/userUpdate',params)

//航班查询
export const queryList = params =>
    post('/queryList',params)