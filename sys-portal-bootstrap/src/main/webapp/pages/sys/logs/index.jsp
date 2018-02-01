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
                <li class="flexbox je-box-left jew25">
                    <span class="flexbox je-text-right pl10 pr10">关键字：</span>
                    <p class="flexbox jeflex"><input type="text" class="my-input" name="realName" placeholder="请输入"></p>
                </li>
                <li class="flexbox je-box-left jew50">
                    <span class="flexbox je-text-right pl10 pr10">操作时间：</span>
                    <p class="flexbox jeflex">
                    	<input type="text" name="begin" id="begin" placeholder="yyyy-mm-dd" autocomplete="off" class="my-input" onclick="laydate({elem: this})" />
                    </p>
                    &nbsp;至&nbsp;
                    <p class="flexbox jeflex">
                    	<input type="text" name="end" id="end" placeholder="yyyy-mm-dd" autocomplete="off" class="my-input" onclick="laydate({elem: this})" />
                    </p>
                </li>
            </ul>
            <ul class="flexbox je-box-left jew100 f14">
                <li class="flexbox je-box-right jew100">
                    <button type="button" ng-click="reloadClick()" class="jebtn jebtn-blue tool_sobtn rdu4">查询</button>
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