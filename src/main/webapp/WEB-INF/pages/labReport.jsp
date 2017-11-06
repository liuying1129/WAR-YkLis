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
    
    <!-- Bootstrap -->
    <link rel="stylesheet" href="${ctx}/static/bootstrap/3.3.7/css/bootstrap.min.css" />    
    <!-- select2 -->
    <link href="${ctx}/static/select2/4.0.5/css/select2.min.css" rel="stylesheet" />      
         
    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/labReport.css" rel="stylesheet">
</head>

<body>

    <!-- 静态包含 -->
    <%-- <%@ include file="header.jsp" %> --%>
    <!-- 动态包含 -->
    <jsp:include page="header.jsp" />

  <!-- form表单数据通过form外button(ajax)提交到controller示例 -->
  <form id="frmQuery">
    检查日期:
    <label for="checkDateUnlimited">不限</label>
    <input type="radio" value="0"  name="checkDate" id="checkDateUnlimited" checked />
    <label for="checkDateToday">今天</label>
    <input type="radio" value="1"  name="checkDate" id="checkDateToday"  />
    <label for="checkDateWeek">最近一周</label>
    <input type="radio" value="2"  name="checkDate" id="checkDateWeek"  />
    <label for="checkDateMonth">最近一月</label>
    <input type="radio" value="3"  name="checkDate" id="checkDateMonth"  /><br />
    打印状态:
    <label for="printtimesUnlimited">不限</label>
    <input type="radio" value="0"  name="printtimes" id="printtimesUnlimited" checked />
    <label for="printtimesNotPrinted">未打印</label>
    <input type="radio" value="1"  name="printtimes" id="printtimesNotPrinted"  /><br />
    门诊/住院号
    <input type="text" name="caseno" placeholder="门诊/住院号">
    姓名
    <input type="text" name="patientname" placeholder="姓名">
    送检科室
    <!-- <input type="text" name="deptname" placeholder="送检科室"> -->
    <select name="deptname" style="width:130px">
    </select>
    送检医生
    <!-- <input type="text" name="check_doctor" placeholder="送检医生"> -->
	<select name="check_doctor" style="width:130px">
    </select>
  </form>
  <button id="btnQuery">查询</button>
  <button id="btnPrint">打印</button>
  <table border="1">
  	<thead>
        <tr style="background-color:yellow">
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>选择</th>
          <th>病历号</th>
          <th>床号</th>
          <th>送检科室</th>
          <th>送检医生</th>
          <th>检查日期</th>
          <th>申请日期</th>
          <th>审核者</th>
          <th>工作组</th>
          <th>操作者</th>
          <th>优先级别</th>
          <th>打印次数</th>
          <th>样本类型</th>
          <th>临床诊断</th>
          <th>样本情况</th>
          <th>备注</th>
          <th>唯一编号</th>
          <th>His唯一编号</th>
          <th>His门诊或住院</th>
          <th>所属部门</th>
          <th>工种</th>
          <th>工号</th>
          <th>婚否</th>
          <th>籍贯</th>
          <th>住址</th>
          <th>电话</th>
          <th>所属公司</th>
          <th>审核时间</th>
          <th>结束标志</th>
          <th>联机号</th>
          <th>流水号</th>
        </tr>
  	</thead>
    <tbody id="myTBody">
    </tbody>
  </table>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="${ctx}/static/jquery/jquery-3.2.1.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="${ctx}/static/bootstrap/3.3.7/js/bootstrap.min.js"></script>
       
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

    <script src="${ctx}/static/dev-js/commFunction.js?jsr=${jsr}"></script>
    <script src="${ctx}/static/dev-js/labReport.js?jsr=${jsr}"></script>
</body>
</html>