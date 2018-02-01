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
        <div class="flexbox jew100 f14">
        	<div class="flexbox jew90" id="leftTree">
        		<div class="jew90">
	                <div class="centinfo">
						<ul id="treeDemo_right" class="ztree" style="margin-top:0;"></ul>
	                </div>
                </div>
        	</div>
        </div>
        <div style="margin-top:10px;"></div>
        <div class="my-form-item">
             <div class="my-form-item">
                 <div class="my-input-block">
                     <button type="submit" class="my-btn ">保存</button>
                     <button type="button" class="btn btn-link" ng-click="goBack()">返回列表</button>
                 </div>
             </div>
         </div>
</div>