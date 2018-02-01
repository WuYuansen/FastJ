<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>

<div class="my-main">
    <fieldset class="my-elem-field my-field-title">
        <legend>当前位置：{{location_path}}</legend>
    </fieldset>
    <div class="" style="top:40px;bottom:40px;">
    	<div class="tools  fmy">
            <ul class="flexbox je-box-left jew100 f14">
                <li class="flexbox je-box-right jew100">
                    <button type="button" class="btn btn-link" ng-click="goBack()">返回列表</button>
                </li>
            </ul>
        </div>
        <div class="split"></div>
        <div class="flexbox jew100 f14 f_jeh80">
	        <div class="jew30">
	     		<div class="panel panel-danger">
		            <div class="panel-header with-border">
		              <h3 class="panel-title">组织机构</h3>
		            </div>
		            <div class="panel-body" style="display: block;">
	                	<ul id="treeDept_right" class="ztree" style="margin-top:0;"></ul>
		            </div>
			     </div>
		     </div>
		     &nbsp;
		     <div class="jew34_5">
	     		<div class="panel panel-danger">
		            <div class="panel-header with-border">
		              <h3 class="panel-title"><i class="fa fa-square-o blue"></i> 待选用户列表</h3>
		            </div>
		            <div class="panel-body" style="display: block;">
		            	<!--  -->
		            	<div class="centinfo" id="divData_notChoose"></div>
						<!--  -->
		            </div>
			     </div>
		     </div>
		     &nbsp;
		     <div class="jew34_5">
	     		<div class="panel panel-danger">
		            <div class="panel-header with-border">
		              <h3 class="panel-title"><i class="fa fa-check-square-o blue"></i> 已选用户</h3>
		            </div>
		            <div class="panel-body" style="display: block;">
		            	<!--  -->
		            	<div class="centinfo" id="divData_Choose"></div>
						<!--  -->
		            </div>
			     </div>
		     </div>
        </div>
</div>