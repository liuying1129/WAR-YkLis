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

    <title>检验报告</title>

    <c:set var="ctx" value="${pageContext.request.contextPath}"/>
    
    <!-- Custom styles for this template -->
    <%-- <link href="${ctx}/static/dev-css/labReport.css" rel="stylesheet"> --%>

</head>

<body>

  <!-- form表单数据提交到controller示例,action -->
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
    <input type="text" name="deptname" placeholder="送检科室">
    送检医生
    <input type="text" name="check_doctor" placeholder="送检医生">
  </form>
  <button type="button" id="btnQuery">查询</button>
  <table id="myTb">
    <tbody>
        <tr>
          <th>班级</th>
          <th>学生数</th>
          <th>平均成绩</th>
        </tr>
        <tr>
          <td>一班</td>
          <td>30</td>
          <td>89</td>
        </tr>
        <tr>
          <td>二班</td>
          <td>35</td>
          <td>85</td>
        </tr>
        <tr>
            <td>三班</td>
            <td>32</td>
            <td>80</td>
        </tr>
    </tbody>
  </table>
  
  <script src="${ctx}/static/jquery/jquery-3.2.1.min.js"></script>
  <script src="${ctx}/static/dev-js/labReport.js"></script>
</body>
</html>