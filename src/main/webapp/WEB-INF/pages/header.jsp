<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="utf-8">
	<!-- Edge 模式通知 Windows Internet Explorer 以最高级别的可用模式显示内容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
	
	<!-- 母页理论上都有title,会融合母页title -->
	<title></title>
	
	<c:set var="ctx" value="${pageContext.request.contextPath}"/>
	<c:set var="jsr" value="${initParam.jsRandom}"/>
	
    <!-- Bootstrap -->
    <link rel="stylesheet" href="${ctx}/static/bootstrap/3.3.7/css/bootstrap.min.css" />
                  
    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/header.css?jsr=${jsr}" rel="stylesheet">
</head>
<body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <!-- button标签是浏览器变小时出现的响应式按钮,下面的三个icon-bar表示button的三横线 -->
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index">誉凯检验信息管理系统</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
          	<!-- js动态设置元素值 -->
            <li><a id="hrefAccount" href="goLogin">登录</a></li>
            <li><a href="labReport">检验报告</a></li>
            <li><a id="hrefSCSYDW" href="#">授权使用单位</a></li>
            <!-- 示例:直接访问项目中的html页面 -->
            <li><a href="./html/commonQuestion.html" target="_blank">常见问题</a></li>
            <!-- <li><a href="logout">注销</a></li>
            <li><a href="goModifyPwd">修改密码</a></li> -->
            <li><a id="hrefWap" tabindex="0" role="button" title="扫描二维码" data-trigger="focus" data-placement="bottom" data-html="true" data-content="&lt;img width='100px' height='100px' src='static/images/QRCodeURL.png'&gt;">手机版</a></li>
            <!-- 通过controller返回对应的html页面的示例 -->
            <!-- <li><a href="testHtml" target='_blank'>HtmlTest</a></li> -->
            <li><a href="#" data-toggle="modal" data-target="#myModal">选项</a></li>
            <li><a href="equipMonitor" target="_blank">设备监控</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    
	<!-- 【选项】模态框（Modal） -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	            &times;
	          </button>
	          <h4 class="modal-title">选项</h4>                     
	        </div>
	        <div class="modal-body">
	
	          <input type="radio" value="0"  name="printType" id="checkPreview" checked />
	          <!-- Bootstrap写了label加粗的样式,故行内重写样式(经测试,写在外部CSS文件中不行) -->
	          <label style="font-weight:normal;" for="checkPreview">预览模式</label>&nbsp;&nbsp;&nbsp;
	          <input type="radio" value="1"  name="printType" id="checkPrint"  />
	          <label style="font-weight:normal;" for="checkPrint">直接打印</label>&nbsp;&nbsp;&nbsp;
	          <input type="radio" value="2"  name="printType" id="checkPrintDesign"  />
	          <label style="font-weight:normal;" for="checkPrintDesign">打印设计</label><br />
	        </div>
	        <div class="modal-footer">
	          <button id="btnSave" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
	        </div>
	      </div><!-- /.modal-content -->
	    </div><!-- /.modal -->
  	</div>    
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="${ctx}/static/jquery/jquery-3.2.1.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="${ctx}/static/bootstrap/3.3.7/js/bootstrap.min.js"></script>    
    
    <!-- <script src="${ctx}/static/dev-js/commFunction.js?jsr=${jsr}"></script> -->
    <script src="${ctx}/static/dev-js/header.js?jsr=${jsr}"></script>	
</body>
</html>