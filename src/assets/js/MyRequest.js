//把ajax封装成promise的形式
/**
  * @Author wx 13804972582
  * @Description:
  * 2022/10/31 17:14
  */

const xhr = new XMLHttpRequest();
export default class MyRequest {
	/**
	 * 这里的data是使用字符串拼接的，已经添加了问号
	 */
    static get(data="",url="",async = true){
        return new Promise(function(resolve,reject){
			try{
				console.log(1);
				xhr.open("get",url + `?${data}`,async);
				// 这个和readyState === 4 是一样的
				xhr.onload = ()=>{
				    resolve(xhr.response)
				}
				xhr.send();
			}catch(e){
				reject(e);
			}
		})
    }
	/**
	 * 这里的data是任意格式的，一般建议使用对象的形式
	 */
    static post(data=null,url="",async = true){
        return new Promise(function(resole, reject){
			xhr.open("post",url,async);
			xhr.onload = ()=>{
			    resole(xhr.response);
			}
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send(JSON.stringify(data));
		});
    }
}
