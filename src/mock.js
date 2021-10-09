const Mock = require('mockjs')
const Random = Mock.Random
console.log('mock')
Mock.setup({ timeout: '2000-3000' });  //设置响应时间
//Mock.mock('/api/po/data','put',(req,res)=>{})  get传参无法拦截，需用正则处理
Mock.mock(RegExp('/api/po/data' + ".*"),(req,res)=>{
    console.log(JSON.parse(req.body))   //请求被转为JSON字符串
    let len = JSON.parse(req.body).num;
    let list = [];
    for(let i = 0; i < len; i++) {
        let listObject = {
            title: Random.csentence(5, 10),//随机生成一段中文文本。
            company: Random.csentence(5, 10),
            attention_degree: Random.integer(100, 9999),//返回一个随机的整数。
            photo: Random.image('114x83', '#00405d', '#FFF', 'Mock.js')
        }
        list.push(listObject);
    }
    return {
        data: list
    }
})