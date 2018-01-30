	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";

window.onload = function(){
	
	var myTBody = document.getElementById("myTBody");
	var trList=myTBody.getElementsByTagName("tr");
	
    for (var i = 0; i < trList.length; i++) {                //遍历Table的所有Row
    	
    	var tdArr=trList[i].getElementsByTagName("td");
    	
    	var cxzf = "";
    	
        for (var j = 0; j < tdArr.length; j++) {   //遍历Row中的每一列

			if(tdArr[j].getAttribute("flag") === "ifValueAlarm"){

				cxzf = tdArr[j].innerText;
			}
        }
        
        if(cxzf == "1"||cxzf == "2"){
        	
            for (var k = 0; k < tdArr.length; k++) {   //遍历Row中的每一列

    			if(tdArr[k].getAttribute("flag") === "itemValue"){
    				if(cxzf == "1"){
    					tdArr[k].setAttribute("style","color:blue");
    				}
    				if(cxzf == "2"){
    					tdArr[k].setAttribute("style","color:red");
    				}
    			}    			
            }
        }
    }
};

/*$(document).ready(function() {
	
	$.ajax({
		
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'showPictureValue',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {
						
			var deptnameSelect = $('select[name="deptname"]');
			deptnameSelect.append(new Option(""));
			
			data.response.forEach(function(element,index){
				
				deptnameSelect.append(new Option(element.Name));
			});
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:loadDeptname,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
});*/