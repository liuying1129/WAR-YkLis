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

    <title>检验结果</title>
    
</head>

<body>

  <table border="1">
  	<thead>
        <tr style="background-color:yellow">
          <th>图</th>
          <th>组合项目</th>
          <th>名称</th>
          <th>英文名</th>
          <th>检验结果</th>
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
						<td>${D.检验结果}</td>
						<td>${D.最小值}</td>
						<td>${D.最大值}</td>
						<td>${D.单位}</td>
					</tr>
				</c:forEach> 
    
    </tbody>
  </table>
  
</body>
</html>