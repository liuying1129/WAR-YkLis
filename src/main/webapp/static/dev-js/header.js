function getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return arr[1];
        }
    }
    return "";
}

$(document).ready(function() {
	
	var strCookie = getCookie("yklis.account");
	var strSCSYDWCookie = getCookie("yklis.SCSYDW");
	
    //判断变量为有效的字符串
    //先要确定该变量存在，否则后面的判断会发生错误，还要确定该变量是string数据类型的，
    //然而，如果该变量是一个String对象，而不是一个直接量，typeof将返回一个'object'数据类型而不是'string'，
    //这就是为什么要使用valueOf方法，它对所有的javascript对象都可用，不管对象是什么，
    //都返回其基本值：对于Number，String和布尔类型，返回其原始值；对于函数，是函数文本，
    //因此，如果该变量是一个String对象，valueOf返回一个字符串直接量，如果该变量已经是一个字符串直接量，
    //对其应用valueOf方法会临时性地将它封装成一个String对象，这意味着，valueOf仍然将返回一个字符串直接量，
    //最终，只用测量该字符串长度是否大于0了
    //if((typeof data.msg!='undefined')&&(typeof data.msg.valueOf()=='string')&&(data.msg.length>0)) alert(data.msg);	
	if((typeof strCookie!='undefined')&&(typeof strCookie.valueOf()=='string')&&(strCookie.length>0)){
		
		//存在帐号cookie的情况下,显示帐号信息		
		document.getElementById("hrefAccount").innerHTML = strCookie;
		document.getElementById("hrefAccount").setAttribute("href","#");//#表示当前页,且不会刷新页面。#后面跟任意字符效果一样 
	}else{
		document.getElementById("hrefAccount").innerHTML = "登录";
		document.getElementById("hrefAccount").setAttribute("href","goLogin");
	}
	
	if((typeof strSCSYDWCookie!='undefined')&&(typeof strSCSYDWCookie.valueOf()=='string')&&(strSCSYDWCookie.length>0)){
		
		document.getElementById("hrefSCSYDW").innerHTML = strSCSYDWCookie;
	}else{
		document.getElementById("hrefSCSYDW").innerHTML = "未授权";
	}	
});