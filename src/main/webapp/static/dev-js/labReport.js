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

				//console.log(data);
				//console.log(data.response);
				$.each(data.response, function(index,element) {
		            var tbBody = ""
		            var trColor;
		            if (index % 2 == 0) {
		              trColor = "even";
		            }
		            else {
		              trColor = "odd";
		            }
		            tbBody += "<tr><td>" + element.姓名 + "</td><td>" + element.性别 + "</td><td>" + element.年龄 + "</td><td>" + element.选择 + "</td><td>" + element.病历号 + "</td><td>" + element.床号 + "</td><td>" + element.送检科室 + "</td><td>" + element.送检医生 + "</td><td>" + element.检查日期 + "</td><td>" + element.申请日期 + "</td><td>" + element.审核者 + "</td><td>" + element.工作组 + "</td><td>" + element.操作者 + "</td><td>" + element.优先级别 + "</td><td>" + element.打印次数 + "</td><td>" + element.样本类型 + "</td><td>" + element.临床诊断 + "</td><td>" + element.样本情况 + "</td><td>" + element.备注 + "</td><td>" + element.唯一编号 + "</td><td>" + element.His唯一编号 + "</td><td>" + element.His门诊或住院 + "</td><td>" + element.所属部门 + "</td><td>" + element.工种 + "</td><td>" + element.工号 + "</td><td>" + element.婚否 + "</td><td>" + element.籍贯 + "</td><td>" + element.住址 + "</td><td>" + element.电话 + "</td><td>" + element.所属公司 + "</td><td>" + element.审核时间 + "</td><td>" + element.ifCompleted + "</td><td>" + element.联机号 + "</td><td>" + element.流水号 + "</td></tr>";
		            $("#myTb").append(tbBody);
		          });
			},
			error : function(xhr, type, errorThrown) {
				console.log(xhr.status);
				console.log(xhr.readyState);
				console.log(textStatus);
			}
		});
	});	
		
});