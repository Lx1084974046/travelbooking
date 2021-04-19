import { get,post,deletes } from '@/utils/request.js'
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

//用户订单信息查询(登录时获取)
export const bookcheck = params =>
    get('/bookcheck',params)

//用户订票
export const book = params =>
    post('/book',params)

//用户航班信息查询
export const queryUserList = params =>
    post('/queryUserList',params)

//用户取消航班
export const refund = params =>
    deletes('/refund',params)

//用户改签航班
export const rebook = params =>
    post('/rebook',params)

//用户发圈
export const dynamic = params =>
    post('/dynamic',params)

//查询用户发圈动态信息
export const findDynamic = params =>
    get('/findDynamic',params)

//删除动态
export const delDynamic = params =>
    deletes('/delDynamic',params)

//查询动态社区信息
export const dynamicCommunity = params =>
    get('/dynamicCommunity',params)

//点赞取消点赞
export const likeDynamic = params =>
    post('/likeDynamic',params)

//管理员登录
export const adminLogin = params =>
    post('/adminLogin',params)

//查询航班号是否存在
export const checkFlightNum = params =>
    get('/checkFlightNum',params)

//添加航班
export const addFlight = params =>
    post('/addFlight',params)

//更新航班
export const updateFlight = params =>
    post('/updateFlight',params)

//取消航班
export const delFlight = params =>
deletes('/delFlight',params)

//日期查询航班
export const queryDy = params =>
deletes('/queryDy',params)