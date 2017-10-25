	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";

var btnQuery = document.getElementById("btnQuery");
btnQuery.onclick = function() {
	
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
				
	            var tbBody = "";
	            var trColor = "white";
	            if (index % 2 == 0) {
	              trColor = "#a4c2f4";
	            }		            
	           		            
	            tbBody += "<tr style='background-color:"+trColor+"'><td><a href='checkValue?unid="+element.唯一编号+"&ifCompleted="+element.ifCompleted+"' target='_blank'>" + element.姓名 + "</a></td><td>" + element.性别 + "</td><td>" + element.年龄 + "</td><td><input type='checkbox' /></td><td>" + element.病历号 + "</td><td>" + element.床号 + "</td><td>" + element.送检科室 + "</td><td>" + element.送检医生 + "</td><td>" + element.检查日期 + "</td><td>" + element.申请日期 + "</td><td>" + element.审核者 + "</td><td>" + element.工作组 + "</td><td>" + element.操作者 + "</td><td>" + element.优先级别 + "</td><td>" + element.打印次数 + "</td><td>" + element.样本类型 + "</td><td>" + element.临床诊断 + "</td><td>" + element.样本情况 + "</td><td>" + element.备注 + "</td><td flag='unid'>" + element.唯一编号 + "</td><td>" + element.His唯一编号 + "</td><td>" + element.His门诊或住院 + "</td><td>" + element.所属部门 + "</td><td>" + element.工种 + "</td><td>" + element.工号 + "</td><td>" + element.婚否 + "</td><td>" + element.籍贯 + "</td><td>" + element.住址 + "</td><td>" + element.电话 + "</td><td>" + element.所属公司 + "</td><td>" + element.审核时间 + "</td><td flag='ifCompleted'>" + element.ifCompleted + "</td><td>" + element.联机号 + "</td><td>" + element.流水号 + "</td></tr>";
	            $("#myTBody").append(tbBody);
	          });
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log(xhr.status);
			console.log(xhr.readyState);
			console.log(textStatus);
		}
	});	
};

var btnPrint = document.getElementById("btnPrint");
btnPrint.onclick = function() {
	
	var lsSelected = [];
	
	var myTBody=document.getElementById("myTBody");

	var trList=myTBody.getElementsByTagName("tr");
	for (var i=0;i<trList.length;i++) {

		var checked = false;
		
		var inputArr=trList[i].getElementsByTagName("input");
		if (inputArr.length>0) {
			checked = inputArr[0].checked;
		}
		
		if(checked){
			
			var objSelected = {};
			
			var tdArr=trList[i].getElementsByTagName("td");

			for (var j=0;j<tdArr.length;j++) {
							
				if(tdArr[j].getAttribute("flag") === "unid"){
					objSelected.unid = tdArr[j].innerText;
				}
				if(tdArr[j].getAttribute("flag") === "ifCompleted"){
					objSelected.ifCompleted = tdArr[j].innerText;
				}
			}
			
			lsSelected.push(objSelected);
			
		}
	}
	
	if(lsSelected.length<=0){
		return;
	}
	
	/*//原生ajax方式中文返回乱码，只好放弃
	var xhr = new XMLHttpRequest();
	xhr.responseType = "json";//默认为text
	xhr.onreadystatechange = function(){ 
		if (xhr.readyState == 4){ 
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){ 
				
				//var data = JSON.parse(xhr.responseText);
				var data = xhr.response;//responseType = "json"时只能用xhr.response
				
			} else { 
				console.log("Request was unsuccessful,状态码:" + xhr.status +",状态说明:"+ xhr.statusText);
			} 
		}
	};
	xhr.open("post", "printReport?"+params, true);
	xhr.send(null);//*/
			
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'printReport',
		data : {lsSelected : JSON.stringify(lsSelected)},
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {
			
			if(typeof Array.prototype.forEach != "function"){
				alert("浏览器不支持forEach");
				return;
			}
			
			var strSCSYDWCookie = getCookie("yklis.SCSYDW");
			
			var LODOP=getLodop();
			LODOP.PRINT_INIT("printReport");//首先一个初始化语句//参数为打印任务名
			LODOP.SET_PRINT_PAGESIZE(2,0,0,"A5");//A5横向
			
			//$.each(data.response.chkvalu, function(index,element) {
			//IE8及以下版本不支持forEach//上面是jQuery的each方法,效果一样
			data.forEach(function(element2,index2){
				
				LODOP.ADD_PRINT_TEXT(10,10,774,24,decodeURI(strSCSYDWCookie)+"检验报告单");
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
				LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
				LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
				LODOP.ADD_PRINT_TEXT(45,50,250,20,"姓名："+element2.response.patientname);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(45,310,250,20,"门诊/住院号："+element2.response.Caseno);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(45,600,250,20,"检验单号："+element2.response.LSH+" "+element2.response.checkid);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(65,50,250,20,"性别："+element2.response.sex);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(65,310,250,20,"科室："+element2.response.deptname);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(65,600,250,20,"标本类型："+element2.response.flagetype);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(85,50,250,20,"年龄："+element2.response.age);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(85,310,250,20,"床号："+element2.response.bedno);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(85,600,250,20,"标本状态："+element2.response.typeflagcase);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(105,50,250,20,"送检医生："+element2.response.check_doctor);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(105,310,250,20,"临床诊断："+element2.response.diagnose);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(105,600,250,20,"备注："+element2.response.issure);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				
				LODOP.ADD_PRINT_LINE(120,30,120,750,0,1);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);

				LODOP.ADD_PRINT_TEXT(125,100,100,20,"检验项目");
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(125,220,100,20,"英文名");
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(125,340,100,20,"检验结果");
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(125,460,100,20,"单位");
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(125,640,100,20,"参考范围");
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				
				LODOP.ADD_PRINT_LINE(140,30,140,750,0,1);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				
				if(typeof Array.prototype.forEach != "function"){
					alert("浏览器不支持forEach");
					return;
				}
				
				//$.each(data.response.chkvalu, function(index,element) {
				//IE8及以下版本不支持forEach//上面是jQuery的each方法,效果一样
				element2.response.chkvalu.forEach(function(element,index){
								                
					var FIRST_ROW_TOP = 145;//第一条明细的top
					var PAGE_RECORDERS = 17;//每页行数
					var ROW_HEIGHT = 20;//每条明细占用的高度
					
					LODOP.ADD_PRINT_TEXT(FIRST_ROW_TOP+(index % PAGE_RECORDERS)*ROW_HEIGHT,100,100,20,element.Name);
					LODOP.ADD_PRINT_TEXT(FIRST_ROW_TOP+(index % PAGE_RECORDERS)*ROW_HEIGHT,220,100,20,element.english_name);
					LODOP.ADD_PRINT_TEXT(FIRST_ROW_TOP+(index % PAGE_RECORDERS)*ROW_HEIGHT,340,100,20,element.itemvalue);
					LODOP.ADD_PRINT_TEXT(FIRST_ROW_TOP+(index % PAGE_RECORDERS)*ROW_HEIGHT,460,100,20,element.Unit);
					LODOP.ADD_PRINT_TEXT(FIRST_ROW_TOP+(index % PAGE_RECORDERS)*ROW_HEIGHT,555,100,20,element.前段参考范围);	
					LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
					LODOP.ADD_PRINT_TEXT(FIRST_ROW_TOP+(index % PAGE_RECORDERS)*ROW_HEIGHT,655,100,20,element.后段参考范围);	
					
					if((index % PAGE_RECORDERS)+1 === PAGE_RECORDERS){
						LODOP.NewPage();
					}
				});
				
				LODOP.ADD_PRINT_LINE(495,30,495,750,0,1);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				
				LODOP.ADD_PRINT_TEXT(500,50,250,20,"申请日期："+element2.response.report_date);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(500,296,250,20,"检查日期："+element2.response.check_date);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(500,520,100,20,"操作者："+element2.response.operator);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(500,620,100,20,"审核者："+element2.response.report_doctor);
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(520,50,250,20,"本结果仅对该份标本负责!");
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(520,296,250,20,"打印时间："+dateFtt("yyyy-MM-dd hh:mm:ss",new Date()));
				LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
				LODOP.ADD_PRINT_TEXT(520,520,100,20, "共&页/第#页");
		        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
		        
		        LODOP.NewPage();
			});
						
			LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向打印的预览默认旋转90度（正向显示）
			LODOP.PREVIEW();//最后一个打印(或预览、维护、设计)语句//PRINT_DESIGN();
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log(xhr.status);
			console.log(xhr.readyState);
			console.log(textStatus);
		}
	});//*/									
};

