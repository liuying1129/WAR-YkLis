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

    <title>设备监控</title>

    <c:set var="ctx" value="${pageContext.request.contextPath}"/>
    <c:set var="jsr" value="${initParam.jsRandom}"/>
    
    <!-- Animate.css -->
    <link rel="stylesheet" href="${ctx}/static/animate.min.css">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="${ctx}/static/bootstrap/3.3.7/css/bootstrap.min.css" />
                
    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/equipMonitor.css?jsr=${jsr}" rel="stylesheet">    
</head>
<body>
    <h1><span></span>·设备可视化</h1>
	<div class="container-fluid">
	  <div class="row">
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  </div>
	  <div class="row">
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  	<div class="col-md-3">
	  		<div class="equipName"></div>
	  		<div class="recentSpc">最近样本&nbsp;&nbsp;<span></span></div>
	  		<div class="todayNum">今日样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="yesterdayNum">昨日样本数量&nbsp;&nbsp;<span></span></div>
	  		<div class="thisMonthNum">当月样本数量&nbsp;&nbsp;<span class="animated infinite heartBeat"></span></div>
	  		<div class="preMonthNum">上月样本数量&nbsp;&nbsp;<span></span></div>
	  	</div>
	  </div>
	</div>
	
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="${ctx}/static/jquery/jquery-3.2.1.min.js"></script>	 

    <!-- Bootstrap -->
    <script src="${ctx}/static/bootstrap/3.3.7/js/bootstrap.min.js"></script>
           
    <script src="${ctx}/static/dayjs/dayjs.min.js"></script>
 
    <script src="${ctx}/static/dev-js/equipMonitor.js?jsr=${jsr}"></script>
</body>
</html>