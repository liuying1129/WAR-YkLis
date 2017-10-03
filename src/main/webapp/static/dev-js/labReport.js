$(document).ready(function() {
	
	$('#btnQuery').click(function(){
		$.ajax({
			//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
			async : true,
			//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
			type : 'POST',
			//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
			//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
			//contentType : "application/x-www-form-urlencoded",//application/json
			url : 'selectLabReport',
			data : $("#frmQuery").serialize(),
			//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
			dataType : 'json',
			success : function(data) {
				
				$("#myTBody").html("");

				//console.log(data);
				//console.log(data.response);
				$.each(data.response, function(index,element) {
					
		            var tbBody = ""
		            var trColor = "white";
		            if (index % 2 == 0) {
		              trColor = "#a4c2f4";
		            }		            
		           		            
		            tbBody += "<tr style='background-color:"+trColor+"'><td><a href='checkValue?unid="+element.唯一编号+"&ifCompleted="+element.ifCompleted+"' target='_blank'>" + element.姓名 + "</a></td><td>" + element.性别 + "</td><td>" + element.年龄 + "</td><td><input type='checkbox' /></td><td>" + element.病历号 + "</td><td>" + element.床号 + "</td><td>" + element.送检科室 + "</td><td>" + element.送检医生 + "</td><td>" + element.检查日期 + "</td><td>" + element.申请日期 + "</td><td>" + element.审核者 + "</td><td>" + element.工作组 + "</td><td>" + element.操作者 + "</td><td>" + element.优先级别 + "</td><td>" + element.打印次数 + "</td><td>" + element.样本类型 + "</td><td>" + element.临床诊断 + "</td><td>" + element.样本情况 + "</td><td>" + element.备注 + "</td><td>" + element.唯一编号 + "</td><td>" + element.His唯一编号 + "</td><td>" + element.His门诊或住院 + "</td><td>" + element.所属部门 + "</td><td>" + element.工种 + "</td><td>" + element.工号 + "</td><td>" + element.婚否 + "</td><td>" + element.籍贯 + "</td><td>" + element.住址 + "</td><td>" + element.电话 + "</td><td>" + element.所属公司 + "</td><td>" + element.审核时间 + "</td><td>" + element.ifCompleted + "</td><td>" + element.联机号 + "</td><td>" + element.流水号 + "</td></tr>";
		            $("#myTBody").append(tbBody);
		          });
			},
			error : function(xhr, textStatus, errorThrown) {
				console.log(xhr.status);
				console.log(xhr.readyState);
				console.log(textStatus);
			}
		});
	});
	
	$('#btnPrint').click(function(){
		
		var myTBody=document.getElementById("myTBody");

		var trList=myTBody.getElementsByTagName("tr");
		for (var i=0;i<trList.length;i++) {

			var href = "";//checkValue?unid=1234&ifCompleted=1
			var checked = false;
			
			var tdArr=trList[i].getElementsByTagName("td");

			for (var j=0;j<tdArr.length;j++) {

				var aArr=tdArr[j].getElementsByTagName("a");
				if (aArr.length>0) {
					href = aArr[0].getAttribute("href");
				};
				var inputArr=tdArr[j].getElementsByTagName("input");
				if (inputArr.length>0) {
					checked = inputArr[0].checked;
				};				
			}
			
			var params="";//unid=1234&ifCompleted=1
			var s1 = href.split("?");
			if(s1.length>1){
				params=s1[1];
			}

			if(checked&&(params.length>0)){
				
				$.ajax({
					//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
					async : true,
					//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
					type : 'POST',
					//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
					//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
					//contentType : "application/x-www-form-urlencoded",//application/json
					url : 'printReport?'+params,
					//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
					dataType : 'json',
					success : function(data) {
						console.log(data);
						
						var LODOP=getLodop();
						LODOP.PRINT_INIT("printReport");//首先一个初始化语句//参数为打印任务名
						LODOP.ADD_PRINT_RECT(10,55,360,220,0,1);
						LODOP.SET_PRINT_STYLE("FontSize",11);
						LODOP.ADD_PRINT_TEXT(20,180,100,25,"郭德强");
						LODOP.SET_PRINT_STYLEA(2,"FontName","隶书");
						LODOP.SET_PRINT_STYLEA(2,"FontSize",15);
						LODOP.ADD_PRINT_TEXT(53,187,75,20,"科学家");
						LODOP.ADD_PRINT_TEXT(100,131,272,20,"地址：中国北京社会科学院附近东大街西胡同");
						LODOP.ADD_PRINT_TEXT(138,132,166,20,"电话：010-88811888");
						LODOP.PREVIEW();//最后一个打印(或预览、维护、设计)语句
					},
					error : function(xhr, textStatus, errorThrown) {
						console.log(xhr.status);
						console.log(xhr.readyState);
						console.log(textStatus);
					}
				});				
			}
		}						
	});	
		
});