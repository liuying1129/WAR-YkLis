	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";
    
	//WebSocket begin
	//判断浏览器是否支持WebSocket
	if (!!window.WebSocket && window.WebSocket.prototype.send){
	    var wsNewValue = new WebSocket(localStorage.getItem("ScheduleWebSocketAddr")+"/websocket/equipMonitor");
	}else{
		alert("浏览器不支持WebSocket");
	}
	 
	//连接发生错误的回调方法
	wsNewValue.onerror = function(){
		alert('WebSocket onerror事件');
	};
	  
	//连接成功建立的回调方法
	wsNewValue.onopen = function(event){
	    console.log("WebSocket onopen事件")
	}

	//接收到消息的回调方法
	wsNewValue.onmessage = function(event){		
		
		var o1 = JSON.parse(event.data);
		
		var minute = dayjs().diff(dayjs(o1.check_date),'minute');
		var showTime;
		if(minute<=0) showTime="刚刚"
			else if(minute<60) showTime=minute+"分钟前"
				else showTime=o1.check_date;
		document.getElementById(o1.equipUnid).querySelector(".recentSpc").querySelector("span").innerHTML = o1.patientname+ "[" + showTime +"]";
		
		document.getElementById(o1.equipUnid).querySelector(".todayNum").querySelector("span").innerHTML = o1.todayNum;
		
		document.getElementById(o1.equipUnid).querySelector(".thisMonthNum").querySelector("span").innerHTML = o1.thisMonthNum;
		
		document.getElementById(o1.equipUnid).querySelector(".yesterdayNum").querySelector("span").innerHTML = o1.yesterdayNum;
		
		document.getElementById(o1.equipUnid).querySelector(".preMonthNum").querySelector("span").innerHTML = o1.preMonthNum;
	}
	  
	//连接关闭的回调方法
	wsNewValue.onclose = function(){
		console.log('WebSocket onclose事件');
	}
	  
	//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = function(){
		wsNewValue.close();
	}			  			  
	//WebSocket end	
	
if(typeof Array.prototype.forEach != "function"){
	alert("浏览器不支持forEach");
}
	
$(document).ready(function() {
	
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'queryEquipList',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {
						
			var x = document.querySelectorAll(".col-md-3");

			x.forEach(function(element,index){

				element.style.display="none";
			});

			data.response.forEach(function(element,index){
				
				//jq中不能使用continue
				if(index < x.length) {
									
					x[index].id=element.Unid;
					
					x[index].querySelector(".equipName").innerHTML = element.Type + "["+element.Model+"]";

					x[index].style.display="";
				}
			});
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:queryEquipList,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});	
});