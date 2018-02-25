	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";    

//window.onload = function(){};
//用window.onload的方式时遇到非常奇怪的问题,labReport.jsp页面(动态包含header.jsp)不会进入该window.onload事件
$(document).ready(function() {
	
	//读取授权使用单位
	//原生ajax方式,IE11中设置responseType时报错“InvalidStateError”(jquery报错)
	//估计是由于在jquery的$(document).ready事件中调用原生ajax,不兼容导致
	$.ajax({
		
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'querySqsydw',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		//dataType : 'json',
		success : function(data) {
			
		    //判断变量为有效的字符串
		    //先要确定该变量存在，否则后面的判断会发生错误，还要确定该变量是string数据类型的，
		    //然而，如果该变量是一个String对象，而不是一个直接量，typeof将返回一个'object'数据类型而不是'string'，
		    //这就是为什么要使用valueOf方法，它对所有的javascript对象都可用，不管对象是什么，
		    //都返回其基本值：对于Number，String和布尔类型，返回其原始值；对于函数，是函数文本，
		    //因此，如果该变量是一个String对象，valueOf返回一个字符串直接量，如果该变量已经是一个字符串直接量，
		    //对其应用valueOf方法会临时性地将它封装成一个String对象，这意味着，valueOf仍然将返回一个字符串直接量，
		    //最终，只用测量该字符串长度是否大于0了
			if((typeof data!='undefined')&&(typeof data.valueOf()=='string')&&(data.length>0)){
								
				document.getElementById("hrefSCSYDW").innerHTML = data;
				localStorage.setItem("yklis.SCSYDW", data);
			}else{
				document.getElementById("hrefSCSYDW").innerHTML = "未授权";
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:querySqsydw,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
		
	//读取session中yklis.account的值
	$.ajax({
		
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'querySessionAccount',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		//dataType : 'json',
		success : function(data) {
			
		    //判断变量为有效的字符串
		    //先要确定该变量存在，否则后面的判断会发生错误，还要确定该变量是string数据类型的，
		    //然而，如果该变量是一个String对象，而不是一个直接量，typeof将返回一个'object'数据类型而不是'string'，
		    //这就是为什么要使用valueOf方法，它对所有的javascript对象都可用，不管对象是什么，
		    //都返回其基本值：对于Number，String和布尔类型，返回其原始值；对于函数，是函数文本，
		    //因此，如果该变量是一个String对象，valueOf返回一个字符串直接量，如果该变量已经是一个字符串直接量，
		    //对其应用valueOf方法会临时性地将它封装成一个String对象，这意味着，valueOf仍然将返回一个字符串直接量，
		    //最终，只用测量该字符串长度是否大于0了
			if((typeof data!='undefined')&&(typeof data.valueOf()=='string')&&(data.length>0)){
								
				//存在帐号cookie的情况下,显示帐号信息
				document.getElementById("hrefAccount").innerHTML = data+' <span class="caret"></span>';
				document.getElementById("hrefAccount").setAttribute("href","#");//#表示当前页,且不会刷新页面。#后面跟任意字符效果一样 
				document.getElementById("hrefAccount").setAttribute("class","dropdown-toggle");
				document.getElementById("hrefAccount").setAttribute("data-toggle","dropdown");
				document.getElementById("hrefAccount").setAttribute("role","button");
				document.getElementById("hrefAccount").setAttribute("aria-haspopup","true");
				document.getElementById("hrefAccount").setAttribute("aria-expanded","false");
				$('#hrefAccount').parent('li').attr('class', 'dropdown');
				$('#hrefAccount').parent('li').append('<ul class="dropdown-menu"><li><a href="logout">注销</a></li><li role="separator" class="divider"></li><li><a href="goModifyPwd">修改密码</a></li></ul>');
			}else{
				document.getElementById("hrefAccount").innerHTML = "登录";
				document.getElementById("hrefAccount").setAttribute("href","goLogin");
				document.getElementById("hrefAccount").removeAttribute("class");
				document.getElementById("hrefAccount").removeAttribute("data-toggle");
				document.getElementById("hrefAccount").removeAttribute("role");
				document.getElementById("hrefAccount").removeAttribute("aria-haspopup");
				document.getElementById("hrefAccount").removeAttribute("aria-expanded");
				$('#hrefAccount').parent('li').removeAttr('class');
				$('#hrefAccount').parent('li').children('ul').remove();
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:querySessionAccount,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});	
});

$('#hrefWap').popover({
	//&lt;img width='100px' height='100px' src='static/images/QRCodeURL.png'&gt;
});
