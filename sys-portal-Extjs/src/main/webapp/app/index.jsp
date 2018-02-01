<%@page import="org.gtjy.p2p.web.session.SessionUtil"%>
<%@page import="com.gtjy.p2p.modules.sys.dto.User"%>
<%@page import="org.gtjy.p2p.constants.SystemConstant"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String systemName = "fastJ-快速开发平台";
User userModel = (User)SessionUtil.getCurrentUser(request);
Object priview = (Object)SessionUtil.getAttr(request, SystemConstant.SESSION_PRIVIEW);
%>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><%=systemName %></title>
    <script type="text/javascript"> 
    var required="<front style='color:red;'>*</front>";
    var Ext=Ext||{};
    app={
    		priview:"<%=priview %>",
    		base:"<%=basePath %>",
    		systemName:"<%=systemName%>",
    		uName:"<%=userModel==null?null:userModel.getRealname() %>",
			post:"<%=userModel==null?null:userModel.getPost() %>"
	};
    Ext.beforeLoad=function(tags){
    	document.write('<div class="loading"><div class="spinner-wrapper"><span class="spinner-text">页面正在装载中...</span><span class="spinner"></span></div></div>');
   	};
    </script>
    <!-- 线下必须为 sencha CMD构建你的应用程序保持完整 -->
    <script id="microloader" data-app="8b5a0c5c-56fa-4c7c-82dc-be5bf5faaf1d" type="text/javascript" src="bootstrap.js"></script>
</head>
<body>
</body>
</html>
