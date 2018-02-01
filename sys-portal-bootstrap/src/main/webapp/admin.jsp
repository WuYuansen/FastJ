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
<html lang="zh-cn">
    <head>
        <meta charset="utf-8">
        <title data-ng-bind="app.site.title">loading...</title>
        <link rel="shortcut icon" data-ng-href="{{app.site.icon}}" />
        <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1">
        <link href="${ctxStatic}script/provider/bootstrap/css/bootstrap.css" rel="stylesheet" />
        <link href="${ctxStatic}theme/font-awesome/font-awesome.min.css" rel="stylesheet"/>
        <link href="${ctxStatic}theme/css/common.css" rel="stylesheet" type="text/css"/>
        <link href="${ctxStatic}theme/css/console.css" rel="stylesheet" type="text/css"/>
        <link href="${ctxStatic}script/provider/zTree_v3-master/css/demo.css" rel="stylesheet" type="text/css"/>
        <link href="${ctxStatic}script/provider/zTree_v3-master/css/metroStyle/metroStyle.css" rel="stylesheet" type="text/css"/>
        <link href="${ctxStatic}script/provider/select2-4.0.3/dist/css/select2.min.css rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />
    </head>
    <body>
    <div class="my-layout my-layout-admin" id="my_layout">
        <div class="my-header header header-demo">
            <div class="my-main">
            	<div style="height:40px;font-size: 28px;line-height:28px;"><img src="theme/img/logo.png" height="70px" />&nbsp;&nbsp;{{app.site.title}}
            		<div id="weather" style="font-size: 14px;float: right;padding-right: 5px;line-height: 20px;margin: 10px 0px;">加载中...</div>
            	</div>
                <div class="admin-logo-box">
                    <!-- <a class="logo" ng-href="{{app.site.url}}" target="_blank" >菜单导航</a> -->
                    <div class="larry-side-menu" ng-click="hideLeftMenu(this)">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="my-larry-menu">
                    <ul class="my-nav clearfix">
                        <li class="my-nav-item {{x.active ? 'my-this' : ''}}" ng-repeat="x in app.menu">
                            <a data-menu-id="{{x.id}}" ng-href="{{x.href}}" ng-click="topMenuOnClick(this)" data-index="{{x.index}}"><i class="{{x.icon}}"></i><span ng-bind="x.showname"></span></a>
                        </li>
                    </ul>
                </div>
                <ul class="my-nav larry-header-item">
                	<li class="my-nav-item">
                    	<a href="#/welcome/index"><i class="fa fa-home"></i>&nbsp;返回首页</a>
                    </li>
                    <!-- <li class="my-nav-item first isShow">
                        <i class="fa fa-bell-o fa-fw" style="font-size:20px;"></i>&nbsp;&nbsp;
                        <dl class="my-nav-child">
                            <dd><a href="javascript:;">暂无通知消息&nbsp;&nbsp;<i class="fa fa-angle-double-right"></i></a></dd>
                        </dl>
                    </li>
                    <li class="my-nav-item">
                        <i class="fa fa-envelope-o fa-fw" style="font-size:20px;"></i>&nbsp;&nbsp;
                        <dl class="my-nav-child">
                            <dd><a href="javascript:;">暂无站内消息&nbsp;&nbsp;<i class="fa fa-angle-double-right"></i></a></dd>
                        </dl>
                    </li> -->
                    <li class="my-nav-item">
                        <i class="fa fa-user fa-3x" style="font-size:20px;"></i>
                         <dl class="my-nav-child">
                            <dd><a href="javascript:void;">您好，{{realname}}</a></dd>
                            <dd><a href="javascript:void;">所在部门：{{dept}}</a></dd>
                            <dd><a href="javascript:void;">职务：{{post}}</a></dd>
                        </dl>
                    </li>
                    <li class="my-nav-item">
                        <a href="javascript:;">
                            <cite>账号管理</cite>
                            <span class="my-nav-more"></span>
                        </a>
                        <dl class="my-nav-child">
                            <dd><a href="#change/pwd" style="color:#000;">修改密码</a></dd>
                            <!-- <dd><a href="">修改资料</a></dd> -->
                        </dl>
                    </li>
                    <li class="my-nav-item">
                        <a ng-click="logout()" href="javascript:void(0);"> <i class="fa fa-sign-out"></i> 退出</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="my-side my-side-bg my-larry-side" style="display:none;{{app.menuLeft?'display:block':''}}" id="larry-side"  ng-if="app.menuLeft">
            <div class="my-side-scroll" id="larry-nav-side" lay-filter="side">
                <div class="user-photo">
                    <a class="img">
                        <img src="theme/img/user.jpg" class="userimg1"></a>
                    <p>欢迎您，{{realname}}，{{dept}}</p>
                </div>
                <ul class="my-nav my-nav-tree" ng-show='pmenu.leaf' ng-repeat="pmenu in app.menu" data-index="{{pmenu.index}}">
                    <li class="my-nav-item {{!menu.leaf?menu.children?'my-nav-itemed':'my-this':''}}" ng-if='pmenu.children' ng-repeat="menu in pmenu.children"><!-- my-nav-itemed -->
                        <a href="javascript:;" ng-click="leftMeneClick(this)" data-menu-id="{{pmenu.id}}" ng-if="!menu.children">
                            <i class="{{menu.icon}}" data-icon='icon-home1'></i>
                            <span ng-bind='menu.showname'></span>
                        </a>
                        <a data-menu-id="{{pmenu.id}}-{{menu.id}}" href="javascript:;"  ng-if="menu.children">
                            <i class="{{menu.icon}}" ></i>
                            <span ng-bind="menu.showname"></span>
                            <em class="my-nav-more"></em>
                        </a>
                        <dl class="my-nav-child" ng-if="menu.children">
                            <dd ng-repeat="m in menu.children" class="{{m.leaf?'':'my-this'}}">
                                <a data-menu-id="{{pmenu.id}}-{{menu.id}}-{{m.id}}" href="{{m.extendtype}}" ng-click="leftMeneClick(this)">
                                    <i class="{{m.icon}}"></i>
                                    <span ng-bind="m.showname"></span>
                                </a>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class="my-body" id="larry-body" style="bottom:0;border-left:solid 2px #1AA094;left:0;{{app.menuLeft?'left:200px':'left:0;'}}">
            <div class="my-tab my-tab-card larry-tab-box admin-container" id="larry-tab" lay-filter="demo" lay-allowclose="true">
                <div class="my-tab-content admin-conent">
                    <div class="my-tab-item my-show admin-pag" data-ng-view=''></div>
                </div>
            </div>
        </div>
        <div class="my-footer my-larry-foot" id="larry-footer" style="left:0;{{app.menuLeft?'left:200px':'left:0;'}}">
            <div class="my-mian" ng-bind="app.site.copyright"></div>
        </div>
    </div>
    <script src="script/provider/charts/baidu/echarts.js"></script>
    <script src="script/provider/charts/baidu/macarons.js"></script>
    <!-- <script src="script/provider/charts/baidu/xinjiang.js"></script> -->
    <script src="${ctxStatic}script/provider/charts/baidu2/echarts-all-3.js"></script>
	<script src="${ctxStatic}script/provider/charts/baidu2/dataTool.min.js"></script>
	<script src="${ctxStatic}script/provider/charts/baidu2/bmap.min.js"></script>
	<script src="${ctxStatic}script/provider/charts/baidu2/xinjiang1.js"></script>
	<script src="${ctxStatic}script/provider/charts/baidu2/data.js"></script>
	<script src="${ctxStatic}script/provider/charts/baidu2/wlmq.js"></script>
	<script src="${ctxStatic}script/provider/charts/baidu2/kashi.js"></script>
    <!-- <script src="${ctxStatic}script/provider/expFile/Blob.js"></script>
  	<script src="${ctxStatic}script/provider/expFile/FileSaver.js"></script> 
  	<script src="${ctxStatic}script/provider/expFile/tableExport.js"></script-->
    <!–[if IE]>  
    <script src="${ctxStatic}script/provider/json2.js"></script> 
    <script src="${ctxStatic}script/provider/html5.js"></script>
    <![endif]–>
    <script src="${ctxStatic}script/provider/requirejs/require.min.js"></script>
    <script src="${ctxStatic}script/bootstrap.js"></script>
    <script src="${ctxStatic}script/setup.js"></script>
    <script src="${ctxStatic}script/provider/my-utils.js"></script>
	<script src="http://api.map.baidu.com/api?v=2.0&ak=oSsL7EkW76TB4xcgF8UGvHSFn7g1O8la"></script>
	<script src="${ctxStatic}script/provider/zTree_v3-master/js/jquery.ztree.all.min.js"></script>
    </body>
</html>