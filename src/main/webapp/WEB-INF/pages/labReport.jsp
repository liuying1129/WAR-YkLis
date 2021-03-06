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
    
    <!-- Bootstrap -->
    <link rel="stylesheet" href="${ctx}/static/bootstrap/3.3.7/css/bootstrap.min.css" />
    <!-- Bootstrap Table -->
    <link rel="stylesheet" href="${ctx}/static/bootstrap-table/bootstrap-table.min.css" />

    <!-- select2 -->
    <link href="${ctx}/static/select2/4.0.5/css/select2.min.css" rel="stylesheet" />      
       
    <!-- notyf -->     
    <link href="${ctx}/static/notyf/notyf.min.css" rel="stylesheet">
         
    <!-- 鼠标悬停动画.官网:https://github.com/IanLunn/Hover -->
    <link rel="stylesheet" href="${ctx}/static/hover-css/hover-min.css" />

    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/labReport.css?jsr=${jsr}" rel="stylesheet">
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- 只能放在head,否则header.jsp变窄时出现的下拉菜单无法收起 -->
    <script src="${ctx}/static/jquery/jquery-3.2.1.min.js"></script>
</head>
<body>

    <!-- 静态包含 -->
    <%-- <%@ include file="header.jsp" %> --%>
    <!-- 动态包含 -->
    <jsp:include page="header.jsp" />
    
  <img src="static/images/print.png" alt="打印" title="打印" class="hvr-grow" />  

  <!-- form表单数据通过form外button(ajax)提交到controller示例 -->
  <form id="frmQuery">
    <strong>检查日期:</strong>
    <input type="radio" value="0"  name="checkDate" id="checkDateUnlimited" checked />
    <!-- Bootstrap写了label加粗的样式,故行内重写样式(经测试,写在外部CSS文件中不行) -->
    <label style="font-weight:normal;" for="checkDateUnlimited">不限</label>&nbsp;&nbsp;&nbsp;
    <input type="radio" value="1"  name="checkDate" id="checkDateToday"  />
    <label style="font-weight:normal;" for="checkDateToday">今天</label>&nbsp;&nbsp;&nbsp;
    <input type="radio" value="2"  name="checkDate" id="checkDateWeek"  />
    <label style="font-weight:normal;" for="checkDateWeek">最近一周</label>&nbsp;&nbsp;&nbsp;
    <input type="radio" value="3"  name="checkDate" id="checkDateMonth"  />
    <label style="font-weight:normal;" for="checkDateMonth">最近一月</label><br />
    <strong>打印状态:</strong>
    <input type="radio" value="0"  name="printtimes" id="printtimesUnlimited" checked />
    <label style="font-weight:normal;" for="printtimesUnlimited">不限</label>&nbsp;&nbsp;&nbsp;
    <input type="radio" value="1"  name="printtimes" id="printtimesNotPrinted"  />
    <label style="font-weight:normal;" for="printtimesNotPrinted">未打印</label><br />
    <strong>门诊/住院号</strong>
    <input type="text" name="caseno" placeholder="门诊/住院号" style="width:110px" />&nbsp;&nbsp;
    <strong>姓名</strong>
    <input type="text" name="patientname" placeholder="姓名" style="width:110px" />&nbsp;&nbsp;
    <strong>送检科室</strong>
    <select name="deptname" style="width:130px">
    </select>&nbsp;&nbsp;
    <strong>送检医生</strong>
	<select name="check_doctor" style="width:130px">
    </select>
  </form>
  <button id="btnQuery">查询</button>
  <!-- <button id="btnPrint">打印</button> --><!--  越秀中医,不需要显示打印按钮 style="display:none;" --><!-- 改用浮动按钮,故注释 -->

  <table id="myTBody"></table>
  
  <div id="maskLayer">
    <img src="static/images/loading.gif">
  </div>
  
  <!-- 埋点.伪装成图片请求,因为图片请求天然是跨域的,所以业界的通用做法是构造一个空的gif -->
  <!-- display:none时,Opera不产生请求 -->
  <!-- burialPoint.js的方法更好、更灵活 -->
  <!-- <img src="hm.gif" style="display:none;"> -->
  
    <!-- Bootstrap -->
    <!-- 如引用bootstrap.min.js,header.jsp用户名的下拉菜单无法下拉.应该是与header.jsp的bootstrap.min.js引用冲突 -->
    <!-- Bootstrap Table需要依赖bootstrap.min.js,因上述原因,本页面就不要引用bootstrap.min.js,使用header.jsp中的引用 -->
    <!-- <script src="${ctx}/static/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
    <!-- Bootstrap Table -->
    <script src="${ctx}/static/bootstrap-table/bootstrap-table.min.js"></script>
       
    <!-- Lodop -->
    <script src="${ctx}/static/Lodop/LodopFuncs.js"></script>
    
    <object id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> 
        <embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0></embed>
    </object>
	
    <!-- select2 -->
    <!-- 如果select2.js在jquery.js之前加载,初始化函数select2()报错:select2 is not a function -->
    <!-- 注:header.jsp有引用jquery.js -->
    <script src="${ctx}/static/select2/4.0.5/js/select2.min.js"></script>
    
    <script src="${ctx}/static/md5-min.js"></script>
    <script src="${ctx}/static/dev-js/make_sign.js"></script>
    
    <script src="${ctx}/static/dayjs/dayjs.min.js"></script>

    <!-- notyf -->     
    <script src="${ctx}/static/notyf/notyf.min.js"></script>

    <script src="${ctx}/static/dev-js/commFunction.js?jsr=${jsr}"></script>
    <script src="${ctx}/static/dev-js/labReport.js?jsr=${jsr}"></script>
    <script src="${ctx}/static/dev-js/burialPoint.js?jsr=${jsr}"></script>
</body>
</html>