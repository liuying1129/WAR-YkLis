<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <!-- Edge 模式通知 Windows Internet Explorer 以最高级别的可用模式显示内容 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->

    <title>检验结果</title>
    
    <c:set var="ctx" value="${pageContext.request.contextPath}"/>
    <c:set var="jsr" value="${initParam.jsRandom}"/>
    
    <!-- Bootstrap -->
    <link rel="stylesheet" href="${ctx}/static/bootstrap/3.3.7/css/bootstrap.min.css" />
    
    <!-- Custom styles for this template -->
    <link href="${ctx}/static/dev-css/checkValue.css?jsr=${jsr}" rel="stylesheet">
</head>

<body>

  <div><em>${baseInfo.patientname}&nbsp;&nbsp;${baseInfo.sex}&nbsp;&nbsp;${baseInfo.age}&nbsp;&nbsp;${baseInfo.check_date}</em></div>

  <ul class="nav nav-tabs">
    <li class="active"><a href="#value" data-toggle="tab">结果</a></li>
	<li><a href="#graph" data-toggle="tab">图形</a></li>
  </ul>
  
  <div class="tab-content">
    <div class="tab-pane fade in active" id="value">
	  <table>
	    <thead>
	        <tr style="background-color:yellow">
	          <th>图</th>
	          <th>组合项目</th>
	          <th>名称</th>
	          <th>英文名</th>
	          <th>检验结果</th>
	          <th style="display:none">超限标识</th>
	          <th>最小值</th>
	          <th>最大值</th>
	          <th>单位</th>
	        </tr>
	    </thead>
	    <tbody id="myTBody">
	                <c:forEach items="${DataTable}" var="D">
	                    <tr>
	                        <td>${D.图}</td>
	                        <td>${D.组合项目}</td>
	                        <td>${D.名称}</td>
	                        <td>${D.英文名}</td>
	                        <td flag="itemValue"><pre>${D.检验结果}</pre></td>
	                        <td flag="ifValueAlarm" style="display:none">${D.ifValueAlarm}</td>
	                        <td>${D.最小值}</td>
	                        <td>${D.最大值}</td>
	                        <td>${D.单位}</td>
	                    </tr>
	                </c:forEach> 
	    
	    </tbody>
	  </table>
    </div>
    <div class="tab-pane fade" id="graph">
      <table>
        <tbody id="myTBody">
                    <c:forEach items="${dtPic}" var="dt">
                        <tr>
                            <td>${dt.english_name}</td>
                            <td><img src="${dt.imgReq}" alt="哎呀，加载失败了" /></td>
                        </tr>
                    </c:forEach>
        
        </tbody>
      </table>
    </div>
  </div>
    
  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="${ctx}/static/jquery/jquery-3.2.1.min.js"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="${ctx}/static/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  
  <script src="${ctx}/static/dev-js/checkValue.js?jsr=${jsr}"></script>
</body>
</html>