<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 该页面参考资料:https://webdesign.tutsplus.com/articles/smarten-up-a-slick-login-form-with-css3--webdesign-7497 -->
    
    <meta charset="utf-8">
    <!-- Edge 模式通知 Windows Internet Explorer 以最高级别的可用模式显示内容 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->

    <title>誉凯检验信息管理系统</title>

    <c:set var="ctx" value="${pageContext.request.contextPath}"/>
    <c:set var="jsr" value="${initParam.jsRandom}"/>
    
    <!-- 网页图标 -->
    <link rel="icon" href="${ctx}/static/images/favicon.ico" />
    
    <!-- Animate.css -->
    <link rel="stylesheet" href="${ctx}/static/animate.min.css">
    
    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/login.css?jsr=${jsr}" rel="stylesheet">

</head>

<body>

  <!-- form表单数据通过submit提交到controller示例,action -->
  <form id="slick-login" action="login" method="post" class="animated bounce">
    <label for="account">account</label>
    <input type="text" name="account" placeholder="帐号" autofocus required>
    <label for="password">password</label>
    <!-- <input type="password" name="password" placeholder="密码"> -->
    <input type="text" name="password" placeholder="密码" onfocus="this.type='password'" autocomplete="off">
    <label for="captcha">captcha</label>
    <input type="text" name="captcha" placeholder="验证码" required>
    <img alt="验证码" title="点击更换" src="kaptcha.jpg" /><!-- src对应KaptchaServlet的url-pattern -->
    <span style="color:red">${msg}</span>
    <input type="submit" value="登录">
  </form>
  
  <script src="${ctx}/static/jquery/jquery-3.2.1.min.js"></script>
  <script src="${ctx}/static/dev-js/login.js?jsr=${jsr}"></script>
  
</body>
</html>