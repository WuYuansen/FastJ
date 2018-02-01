<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>
<%
String path = request.getContextPath();
String scheme = request.getScheme()+"://";
String serverName = request.getServerName()+":";
String serverPort = request.getServerPort()+"";
%>
<c:set var="basePath" value="${pageContext.request.contextPath}/"/>
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/"/>
<!DOCTYPE html>
<html lang="zh-cn" xmlns:ng="http://angularjs.org">
    <head>
        <meta charset="utf-8">
        <base href="${basePath}" />
        <title data-ng-bind="app.site.title">loading...</title>
        <link rel="shortcut icon" data-ng-href="{{app.site.icon}}" />
        <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1">
        <link href="theme/css/common.css" rel="stylesheet" type="text/css"/>
        <link href="theme/css/login.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div class="view-container" data-ng-view=""></div>
    </body>
    <!–[if IE]>  
    <script src="${ctxStatic}script/provider/json2.js"></script> 
    <script src="${ctxStatic}script/provider/html5.js"></script>
    <![endif]–>
    <script src="${ctxStatic}script/provider/requirejs/require.min.js"></script>
    <script src="${ctxStatic}script/bootstrap.js"></script>
    <script src="${ctxStatic}script/setup.js"></script>
    <script src="${ctxStatic}script/provider/my-utils.js"></script>
</html>