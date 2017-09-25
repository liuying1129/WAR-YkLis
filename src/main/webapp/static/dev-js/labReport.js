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
		            tbBody += "<tr><td>" + element.姓名 + "</td><td>" + element.性别 + "</td><td>" + element.性别 + "</td></tr>";
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