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
    
    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/index.css" rel="stylesheet">
</head>
<body>
    
    <!-- 静态包含 -->
    <%-- <%@ include file="header.jsp" %> --%>
    <!-- 动态包含 -->
    <jsp:include page="header.jsp" />

    <div style="text-align: center;">
    </div>

</body>
</html>