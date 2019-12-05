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
		
		//alert(event.data);
		document.getElementById("unid").innerHTML = "";
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