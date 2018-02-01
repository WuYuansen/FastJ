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
       <form class="my-form" name="form" data-auto="false" method="post">
            <ul class="flexbox je-box-left jew100 f14">
                <li class="flexbox je-box-left jew50">
                    <button type="button" ng-click="addClick()" class="jebtn jebtn-blue tool_add rdu4">新增</button>
                </li>
                <li class="flexbox je-box-right jew50">
                    <button type="button" ng-click="reloadClick()" class="jebtn jebtn-blue tool_sobtn rdu4">刷新</button>
                </li>
            </ul>
        </form>
        </div>
        <div class="centinfo" id="divData">
        </div>
    </div>
    <div class="fixbot">
	    <div class="divpages f14 fmy" id="divPage">
	
	    </div>
	</div>
</div>