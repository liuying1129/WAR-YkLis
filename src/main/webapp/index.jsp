
<!-- 本文件为web.xml中定义的<welcome-file-list><welcome-file>
<welcome-file>文件不会去servlet映射中找处理程序,servlet程序也不可能被设置为web应用程序的目录默认网页文档 
所以,<welcome-file-list><welcome-file>中定义的文件必须真实存在 -->

<!-- 该应用的访问方式：http://localhost:8080/YkLis/ -->
<%
  request.getRequestDispatcher("/index").forward(request,response);
%>