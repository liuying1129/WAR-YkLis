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
	
	<title>誉凯检验信息管理系统</title>	
	
    <c:set var="ctx" value="${pageContext.request.contextPath}"/>
    <c:set var="jsr" value="${initParam.jsRandom}"/>
    
    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/commonQuestion.css?jsr=${jsr}" rel="stylesheet">
</head>
<body>
    
    <!-- 静态包含 -->
    <%-- <%@ include file="header.jsp" %> --%>
    <!-- 动态包含 -->
    <jsp:include page="header.jsp" />

    <div>
    Q:访问路径是多少?<br/>
    A:http://localhost:8080/YkLis/<br/>
    localhost:可能需改为应用服务器IP地址<br/>
    8080:端口号<br/>
    Q:不能打印?<br/>
    A:http://www.c-lodop.com下载Lodop综合版,并在客户端电脑上安装C-Lodop<br/>
    Q:出现莫名奇妙的问题?<br/>
    A:浏览器需要开启cookie功能<br/>
    </div>

</body>
</html>