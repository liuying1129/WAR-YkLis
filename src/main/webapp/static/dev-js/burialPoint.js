/**
 * 前端埋点通用JS
 * 需要埋点的页面引用该JS即可
 * 参考:https://blog.csdn.net/zmx729618/article/details/58600620/
 * 伪装成图片请求,因为图片请求天然是跨域的
 */

	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";

window.onload = function(){
	  
    var img = new Image();  //创建一个img对象
    img.src = "hm.gif";  //img对象赋值url后自动发送请求,无需插入到页面元素中
};
    
//function sendUrl(url) {
//    var img = new Image();  //创建一个img对象
    //let key = 'project_log_' + Math.floor(Math.random() * 2147483648).toString(36);// 为本次数据请求创建一个唯一id 
 
    //window[key] = img;   // 用一个数组维护img对象
 
    //img.onload = img.onerror = img.onabort = function () {
    //    img.onload = img.onerror = img.onabort = null;  // 清除img元素
    //    window[key] = null;
    //    img = null;  
    //};
//    img.src = url;  // img对象赋值url后自动发送请求,无需插入到页面元素中去
//}