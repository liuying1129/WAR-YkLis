	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";
    
if(!window.localStorage){
	alert("浏览器不支持localStorage");
}

var strSCSYDW = localStorage.getItem("yklis.SCSYDW");
if(typeof strSCSYDW == "undefined"||strSCSYDW ==null||strSCSYDW.length == 0){
	strSCSYDW = "未授权";
}

var LODOP; //声明为全局变量

var strAccountCookie;// = getCookie("yklis.account")
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
			strAccountCookie = data;
			
			//WebSocket begin
			//依赖strAccountCookie的值，故放在这里
			//判断浏览器是否支持WebSocket
			if (!!window.WebSocket && window.WebSocket.prototype.send){
			    var wsNewValue = new WebSocket(localStorage.getItem("ScheduleWebSocketAddr")+"/websocket/newValueTips/"+strAccountCookie);
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
				
				var notyf = new Notyf({delay:5000});
				notyf.confirm(event.data);
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
		}
	},
	error : function(xhr, textStatus, errorThrown) {
		console.log("ajax请求失败,请求:querySessionAccount,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
	}
});

if(typeof Array.prototype.forEach != "function"){
	alert("浏览器不支持forEach");
}

window.onunload = function(){
	//保存用户的选择//该方法对IE无效
	//var f = document.getElementById('frmQuery');
	//localStorage.setItem("check_date", f['checkDate'].value);//检查日期
	//localStorage.setItem("printtimes", f['printtimes'].value);//打印状态
	
	//保存用户的选择begin
	//检查日期
	var radiosCheckDate = document.getElementsByName("checkDate");
    for (var i = 0; i < radiosCheckDate.length; i++) {
        if(radiosCheckDate[i].checked){
        	localStorage.setItem("check_date", radiosCheckDate[i].value);
        }
    }
    
    //打印状态
	var radiosPrinttimes = document.getElementsByName("printtimes");
    for (var j = 0; j < radiosPrinttimes.length; j++) {
        if(radiosPrinttimes[j].checked){
        	localStorage.setItem("printtimes", radiosPrinttimes[j].value);
        }
    }
    
    //送检医生
    var selectCheckDoctorData = $('select[name="check_doctor"]').select2('data');
    if(selectCheckDoctorData.length>0){
      localStorage.setItem("check_doctor", selectCheckDoctorData[0].text);
    }
	//保存用户的选择end
};

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
		//serialize()方法将表单内容序列化为字符串(标准 URL编码表示的文本字符串)。操作对象是代表表单元素集合的 jQuery对象。必须给input加name属性
		data : $("#frmQuery").serialize(),
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		beforeSend: function () {			
			document.getElementById("maskLayer").style.display="block";
        },
		success : function(data) {
			
			$('#myTBody').bootstrapTable('load', data.response);
			
			$('#myTBody').bootstrapTable({
				
			    data: data.response,
				detailView:true,
			    detailFormatter:function(index, row, element){

			        var html = [];

			        $.each(row, function (key, value) {

			        	if((key==="唯一编号")||(key==="His唯一编号")||(key==="His门诊或住院")||(key==="所属部门")||(key==="工种")||(key==="工号")||(key==="婚否")||(key==="籍贯")||(key==="住址")||(key==="电话")||(key==="所属公司")||(key==="ifCompleted")||(key==="联机号")||(key==="流水号")||(key==="打印次数"))
			            	html.push('<p><b>' + key + ':</b> ' + value + '</p>');

			        });
			        return html.join('');
			    },
		        columns: [{
			        field: '姓名',
			        title: '姓名',
			        formatter: function formatter(value, row, index, field) {
			        	
			        	return "<a href='checkValue?unid="+row.唯一编号+"&ifCompleted="+row.ifCompleted+"' target='_blank'>" + value + "</a>";
			        }
			    }, {
			        field: '性别',
			        title: '性别'
			    }, {
			        field: '年龄',
			        title: '年龄'
			    }, {
			    	checkbox: true
			    }, {
			        field: '病历号',
			        title: '病历号'
			    }, {
			        field: '床号',
			        title: '床号'
			    }, {
			        field: '送检科室',
			        title: '送检科室'
			    }, {
			        field: '送检医生',
			        title: '送检医生'
			    }, {
			        field: '检查日期',
			        title: '检查日期'
			    }, {
			        field: '申请日期',
			        title: '申请日期'
			    }, {
			        field: '审核者',
			        title: '审核者'
			    }, {
			        field: '工作组',
			        title: '工作组'
			    }, {
			        field: '操作者',
			        title: '操作者'
			    }, {
			        field: '优先级别',
			        title: '优先级别'
			    }, {
			        field: '样本类型',
			        title: '样本类型'
			    }, {
			        field: '临床诊断',
			        title: '临床诊断'
			    }, {
			        field: '样本情况',
			        title: '样本情况'
			    }, {
			        field: '备注',
			        title: '备注'
			    }, {
			        field: '审核时间',
			        title: '审核时间'
			    }, {
			    	width: '0px',//todo-list,不起作用
			        field: '唯一编号',
			        //title: '唯一编号',//为减小宽度而注释
			        class: 'unid'//用于打印
			    }, {
			    	width: '0px',//todo-list,不起作用
			        field: 'ifCompleted',
			        //title: 'ifCompleted',//为减小宽度而注释
				    class: 'ifCompleted'//用于打印
			    }, {
			    	width: '0px',//todo-list,不起作用
			        field: '打印次数',
			        //title: '打印次数',//为减小宽度而注释
				    class: 'printtimes'//用于打印
			    }]
			});
						
			document.getElementById("maskLayer").style.display="none";
		},
		error : function(xhr, textStatus, errorThrown) {
			
			document.getElementById("maskLayer").style.display="none";
			console.log("ajax请求失败,请求:selectLabReport,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
};

function createPageHeaderContent(parmSCSYDW,parmElement) {
	//创建页头内容
	//参数.parmSCSYDW:授权使用单位;parmElement:该条病人记录
	
	LODOP.ADD_PRINT_TEXT(10,10,774,24,parmSCSYDW+"检验报告单");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"FontName","隶书");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
	LODOP.ADD_PRINT_TEXT(45,50,250,20,"姓名："+parmElement.patientname);
	LODOP.ADD_PRINT_TEXT(45,310,250,20,"门诊/住院号："+parmElement.Caseno);
	LODOP.ADD_PRINT_TEXT(45,600,250,20,"检验单号："+parmElement.LSH+" "+parmElement.checkid);
	LODOP.ADD_PRINT_TEXT(65,50,250,20,"性别："+parmElement.sex);
	LODOP.ADD_PRINT_TEXT(65,310,250,20,"科室："+parmElement.deptname);
	LODOP.ADD_PRINT_TEXT(65,600,250,20,"标本类型："+parmElement.flagetype);
	LODOP.ADD_PRINT_TEXT(85,50,250,20,"年龄："+parmElement.age);
	LODOP.ADD_PRINT_TEXT(85,310,250,20,"床号："+parmElement.bedno);
	LODOP.ADD_PRINT_TEXT(85,600,250,20,"标本状态："+parmElement.typeflagcase);
	LODOP.ADD_PRINT_TEXT(105,50,250,20,"送检医生："+parmElement.check_doctor);
	LODOP.ADD_PRINT_TEXT(105,310,250,20,"临床诊断："+parmElement.diagnose);
	LODOP.ADD_PRINT_TEXT(105,600,250,20,"备注："+parmElement.issure);
	
	LODOP.ADD_PRINT_LINE(120,30,120,750,0,1);

	LODOP.ADD_PRINT_TEXT(125,100,100,20,"检验项目");
	LODOP.ADD_PRINT_TEXT(125,245,100,20,"英文名");
	LODOP.ADD_PRINT_TEXT(125,340,100,20,"检验结果");
	LODOP.ADD_PRINT_TEXT(125,460,100,20,"单位");
	LODOP.ADD_PRINT_TEXT(125,640,100,20,"参考范围");
	
	LODOP.ADD_PRINT_LINE(140,30,140,750,0,1);
}

function createPageFooterContent(parmElement,parmPageTotal,parmPageNum) {
	//创建页脚内容
	//参数.parmElement:该条病人记录;parmPageTotal:该条病人记录总页数;parmPageNum:该条病人记录当前页码
	
	LODOP.ADD_PRINT_LINE(495,30,495,750,0,1);
	
	LODOP.ADD_PRINT_TEXT(500,50,250,20,"申请日期："+parmElement.report_date);
	LODOP.ADD_PRINT_TEXT(500,296,250,20,"检查日期："+parmElement.check_date);
	LODOP.ADD_PRINT_TEXT(500,520,100,20,"操作者："+parmElement.operator);
	LODOP.ADD_PRINT_TEXT(500,620,100,20,"审核者："+parmElement.report_doctor);
	LODOP.ADD_PRINT_TEXT(520,50,250,20,"本结果仅对该份标本负责!");
	LODOP.ADD_PRINT_TEXT(520,296,250,20,"打印时间："+dayjs().format("YYYY-MM-DD HH:mm:ss"));
	LODOP.ADD_PRINT_TEXT(520,520,100,20, "共"+parmPageTotal+"页/第"+parmPageNum+"页");
}

function createDetailContent(parmTop,parmElement) {
	//创建明细内容(该条记录)
	//参数.parmTop:该条明细记录打印的Top位置;parmElement:该条明细记录
	
	LODOP.ADD_PRINT_TEXT(parmTop,100,145,20,parmElement.Name);
	LODOP.ADD_PRINT_TEXT(parmTop,245,95,20,parmElement.english_name);
	var cxzf = "";
	switch (parmElement.ifValueAlarm){
		case 1:
			cxzf = "↓";
			break;
		case 2:
			cxzf = "↑";
			break;
	}
	LODOP.ADD_PRINT_TEXT(parmTop,340,120,20,parmElement.itemvalue+" "+cxzf);
	LODOP.ADD_PRINT_TEXT(parmTop,460,95,20,parmElement.Unit);
	LODOP.ADD_PRINT_TEXT(parmTop,555,100,20,parmElement.前段参考范围);	
	LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
	LODOP.ADD_PRINT_TEXT(parmTop,655,100,20,parmElement.后段参考范围);
}

//var btnPrint = document.getElementById("btnPrint");
var btnPrint = document.querySelector('img[alt="打印"]');
btnPrint.onclick = function() {
	
	var lsSelected = $('#myTBody').bootstrapTable('getSelections');
	
	if(lsSelected.length<=0){
		return;
	}
				
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
			
			//var LODOP=getLodop();
			LODOP=getLodop();
			LODOP.PRINT_INIT("printReport");//首先一个初始化语句//参数为打印任务名
			LODOP.SET_PRINT_PAGESIZE(2,0,0,"A5");//A5横向
			
			//$.each(data.response.chkvalu, function(index,element) {
			//IE8及以下版本不支持forEach//上面是jQuery的each方法,效果一样
			//forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数
			//forEach() 对于空数组是不会执行回调函数
			data.forEach(function(element2,index2){				
				
				var PAGE_RECORDERS = 17;//每页行数
				var iPageNum = 1;//页码.仅用于打印在页脚
				
				//打印页头							
				createPageHeaderContent(strSCSYDW,element2);
				
				var iPageTotal = Math.ceil(element2.chkvalu.length/PAGE_RECORDERS);//该条病人记录的总页数
				//打印页脚
				createPageFooterContent(element2,iPageTotal,iPageNum);
				
				//明细循环begin
				element2.chkvalu.forEach(function(element,index){
													                
					var FIRST_ROW_TOP = 145;//第一条明细的top
					var ROW_HEIGHT = 20;//每条明细占用的高度
					
					if((index % PAGE_RECORDERS === 0)&&(index != 0)){
						//index为每页行数的整数倍时换页(index从0开始).第一次(index=0)时不换页
						
						LODOP.NewPageA();
						
						iPageNum = iPageNum + 1;
						
						//打印明细时,若出现换页,则需再次打印页头、页脚(原封不动的copy上面的代码即可)
						//打印页头
						createPageHeaderContent(strSCSYDW,element2);
						
						//打印页脚
						createPageFooterContent(element2,iPageTotal,iPageNum);
					}
					
					var iRowTop = FIRST_ROW_TOP+(index % PAGE_RECORDERS)*ROW_HEIGHT;//该条明细记录打印的Top位置					
					//打印明细
					createDetailContent(iRowTop,element);
				});
				//明细循环end
				
		        LODOP.NewPageA();
			});
						
			LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向打印的预览默认旋转90度（正向显示）
			
            if (LODOP.CVERSION) {
            	CLODOP.On_Return=function(TaskID,Value){
            		//打印后的回调函数(如果打印预览,点击打印按钮且关闭预览窗口才会触发)
            		if(Value>0){
            			
            			lsSelected.forEach(function(element,index){

            				if(element.打印次数 == 0){
            					//修改打印次数
            					
            					//原生ajax方式.注:中文返回乱码
            					var xhr = new XMLHttpRequest();
            					xhr.responseType = "json";//默认为text
            					xhr.onreadystatechange = function(){ 
            						if (xhr.readyState == 4){ 
            							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){ 
            								
            								console.log(xhr.response);
            								var data = xhr.response;//responseType = "json"时只能用xhr.response,否则可用xhr.responseText
            								if(!data.success){
            									alert("更新打印次数失败");
            								}
            								
            							} else { 
            								console.log("ajax请求失败,请求:updatePrinttimes,状态码:"+xhr.status +",状态说明:"+ xhr.statusText+",xhr readyState:"+xhr.readyState);
            							} 
            						}
            					};
            					xhr.open("post", "updatePrinttimes", true);
            					xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
            					xhr.send("ifCompleted="+element.ifCompleted+"&unid="+element.唯一编号);//*/
            				}
            				
        					//原生ajax方式.注:中文返回乱码
        					var xhr2 = new XMLHttpRequest();
        					xhr2.responseType = "json";//默认为text
        					xhr2.onreadystatechange = function(){
        						if (xhr2.readyState == 4){ 
        							if ((xhr2.status >= 200 && xhr2.status < 300) || xhr2.status == 304){ 
        								
        								console.log(xhr2.response);
        								var data = xhr2.response;//responseType = "json"时只能用xhr.response,否则可用xhr.responseText
        								if(!data.success){
        									alert("插入打印记录失败");
        								}							
        							} else { 
        								console.log("ajax请求失败,请求:insertPrinttimes,状态码:"+xhr2.status +",状态说明:"+ xhr2.statusText+",xhr readyState:"+xhr2.readyState);
        							} 
        						}
        					};
        					xhr2.open("post", "insertPrinttimes", true);
        					//POST方法必需设置请求Content-Type。其中charset=utf-8可避免请求中文参数值乱码
        					xhr2.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
        					xhr2.send("unid="+element.唯一编号+"&operator_name="+strAccountCookie);//*/
            			});            			
            		}
            	};
            }
            
            var strPrintType = localStorage.getItem("printType");
            if(strPrintType === "1") LODOP.PRINT()//最后一个打印(或预览、维护、设计)语句//PRINT_DESIGN();
            else if(strPrintType === "2") LODOP.PRINT_DESIGN()//最后一个打印(或预览、维护、设计)语句//PRINT_DESIGN();
            else LODOP.PREVIEW();//最后一个打印(或预览、维护、设计)语句//PRINT_DESIGN();
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:printReport,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});							
};

$(document).ready(function() {
	
	//Select2初始化,参数是一个对象
	$('select[name="deptname"]').select2({
		placeholder: '送检科室',//仅对单选类型有效,为了使占位符值出现,SELECT的第一个<option>必须是一个空白的<option>
		allowClear: true,
		tags: true//Dynamic option creation
	});
	
	$('select[name="check_doctor"]').select2({
		placeholder: '送检医生',//仅对单选类型有效,为了使占位符值出现,SELECT的第一个<option>必须是一个空白的<option>
		allowClear: true,
		tags: true//Dynamic option creation
	});
	
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'loadDeptname',
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
	
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'loadWorker',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {
			
			var check_doctorSelect = $('select[name="check_doctor"]');
			check_doctorSelect.append(new Option(""));

			data.response.forEach(function(element,index){
				
				check_doctorSelect.append(new Option(element.name));
			});
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:loadWorker,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
	
	//读取用户的选择begin	
	//检查日期
	var radiosCheckDate = document.getElementsByName("checkDate");
    for (var i = 0; i < radiosCheckDate.length; i++) {
        radiosCheckDate[i].checked = false;
        if (radiosCheckDate[i].value == localStorage.getItem("check_date")) {
    	    radiosCheckDate[i].checked = true;
        }
    }
    
    //打印状态
	var radiosPrinttimes = document.getElementsByName("printtimes");
    for (var j = 0; j < radiosPrinttimes.length; j++) {
    	radiosPrinttimes[j].checked = false;
        if (radiosPrinttimes[j].value == localStorage.getItem("printtimes")) {
        	radiosPrinttimes[j].checked = true;
        }
    }
    
    //送检医生
    if((localStorage.getItem("check_doctor")!==null)&&(localStorage.getItem("check_doctor").length>0)){
    	
    	//刚刚加载的Option,无法find出来,导致有两条相同的下拉选项,但不影响
        if($('select[name="check_doctor"]').find("option[value='"+localStorage.getItem("check_doctor")+"']").length<=0){
            $('select[name="check_doctor"]').append(new Option(localStorage.getItem("check_doctor")));    
        }
        $('select[name="check_doctor"]').val(localStorage.getItem("check_doctor")).trigger("change");
    }
	//读取用户的选择end
        
    //初始化表头begin
    //只是为了进入页面时更美观,并没有实际作用
    //复制查询按钮的代码，注释其中两行
	//$('#myTBody').bootstrapTable('load', data.response);//初始化表头专用注释
	
	$('#myTBody').bootstrapTable({
		
	    //data: data.response,//初始化表头专用注释
		detailView:true,
	    detailFormatter:function(index, row, element){

	        var html = [];

	        $.each(row, function (key, value) {

	        	if((key==="唯一编号")||(key==="His唯一编号")||(key==="His门诊或住院")||(key==="所属部门")||(key==="工种")||(key==="工号")||(key==="婚否")||(key==="籍贯")||(key==="住址")||(key==="电话")||(key==="所属公司")||(key==="ifCompleted")||(key==="联机号")||(key==="流水号")||(key==="打印次数"))
	            	html.push('<p><b>' + key + ':</b> ' + value + '</p>');

	        });
	        return html.join('');
	    },
        columns: [{
	        field: '姓名',
	        title: '姓名',
	        formatter: function formatter(value, row, index, field) {
	        	
	        	return "<a href='checkValue?unid="+row.唯一编号+"&ifCompleted="+row.ifCompleted+"' target='_blank'>" + value + "</a>";
	        }
	    }, {
	        field: '性别',
	        title: '性别'
	    }, {
	        field: '年龄',
	        title: '年龄'
	    }, {
	    	checkbox: true
	    }, {
	        field: '病历号',
	        title: '病历号'
	    }, {
	        field: '床号',
	        title: '床号'
	    }, {
	        field: '送检科室',
	        title: '送检科室'
	    }, {
	        field: '送检医生',
	        title: '送检医生'
	    }, {
	        field: '检查日期',
	        title: '检查日期'
	    }, {
	        field: '申请日期',
	        title: '申请日期'
	    }, {
	        field: '审核者',
	        title: '审核者'
	    }, {
	        field: '工作组',
	        title: '工作组'
	    }, {
	        field: '操作者',
	        title: '操作者'
	    }, {
	        field: '优先级别',
	        title: '优先级别'
	    }, {
	        field: '样本类型',
	        title: '样本类型'
	    }, {
	        field: '临床诊断',
	        title: '临床诊断'
	    }, {
	        field: '样本情况',
	        title: '样本情况'
	    }, {
	        field: '备注',
	        title: '备注'
	    }, {
	        field: '审核时间',
	        title: '审核时间'
	    }, {
	    	width: '0px',//todo-list,不起作用
	        field: '唯一编号',
	        //title: '唯一编号',//为减小宽度而注释
	        class: 'unid'//用于打印
	    }, {
	    	width: '0px',//todo-list,不起作用
	        field: 'ifCompleted',
	        //title: 'ifCompleted',//为减小宽度而注释
		    class: 'ifCompleted'//用于打印
	    }, {
	    	width: '0px',//todo-list,不起作用
	        field: '打印次数',
	        //title: '打印次数',//为减小宽度而注释
		    class: 'printtimes'//用于打印
	    }]
	});    
    //初始化表头end
		
	/*//请求远程用户信息接口begin
	var params = {
			methodNum : "AIF012",
			sql : "insert into AppVisit (SysName,PageName,IP,ComputerName,Customer,UserName,ActionName,ActionTime) values ('LIS_BS','labReport','10.1.2.3',null,'"+strSCSYDW+"','"+strAccountCookie+"','Show',getdate())"
	};
	params.sign = make_sign(params);
	
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'http://211.97.0.5:8080/YkAPI/service',
		data : params,
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {
			
            if (!data.success){
            	console.log(data.response.errorCode +":"+ data.response.errorMsg);
            	return;
            }
            console.log('请求AIF012成功:'+data.response.msg);
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:AIF012,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});	
    //请求远程用户信息接口end*/
});      