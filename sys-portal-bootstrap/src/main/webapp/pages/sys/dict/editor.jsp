<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>
<!--  
 User: 吴元森/15909910367@163.com
 Date: 2017/3/7
 description : 字典
 Time: 14:01 
 -->
<div class="my-main">
    <fieldset class="my-elem-field my-field-title">
        <legend>当前位置：{{location_path}}</legend>
    </fieldset>
    <div>
        <div class="centinfo">
            <!---->
            <form class="my-form" name="form" data-auto="true" method="post" action="{{actionURL}}">
            	<input type="hidden" name="id">
                <div class="my-form-item jew100">
                	<div class="my-inline f_jew50">
	                    <label class="my-form-label">字典名称</label>
	                    <div class="my-input-block">
	                        <input type="text" name="keyname" autocomplete="off" placeholder="请输入字典名称" class="my-input">
	                    </div>
                    </div>
                    <div class="my-inline f_jew50">
                    	<label class="my-form-label">字典类型</label>
	                    <div class="my-input-block">
	                        <input type="text" name="type" required="required"
	                               data-tips-error-required="登录名不能为空" autocomplete="off" placeholder="请输入字典类型" class="my-input">
	                    </div>
                    </div>
                </div>
                <div class="my-form-item jew100">
                	<div class="my-inline f_jew33_1">
	                	<label class="my-form-label">键</label>
	                    <div class="my-input-block">
	                        <input type="text" name="type" required="required"
	                               data-tips-error-required="登录名不能为空" autocomplete="off" placeholder="请输入字典键" class="my-input">
	                    </div>
                	</div>
                	<div class="my-inline f_jew33_1">
                		<label class="my-form-label">键代码</label>
	                    <div class="my-input-block">
	                        <input type="text" name="keycode" required="required"
	                               data-tips-error-required="登录名不能为空" autocomplete="off" placeholder="请输入字典键值代码" class="my-input">
	                    </div>
                	</div>
                	<div class="my-inline f_jew33_1">
                		<label class="my-form-label">值</label>
	                    <div class="my-input-block">
	                        <input type="text" name="value" required="required"
	                               data-tips-error-required="登录名不能为空" autocomplete="off" placeholder="请输入字典键值" class="my-input">
	                    </div>
                	</div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">父级</label>
                    <div class="my-input-block">
                        <input type="text" name="parent" required="required"
                               data-tips-error-required="登录名不能为空" autocomplete="off" placeholder="请输入登录名" class="my-input">
                    </div>
                </div>
                <div class="my-form-item jew100">
                	<div class="my-inline f_jew50">
	                    <label class="my-form-label">是否有效</label>
	                    <div class="my-input-block">
	                        <select name="state" placeholder="请选择">
	                        	<option value="">请选择</option>
	                        	<c:forEach items="${fns:getDicByType('General') }" var="k">
	                        		<option value="${k.value }">${k.key }</option>
	                        	</c:forEach>
	                        </select>
	                    </div>
                    </div>
                    <div class="my-inline f_jew50">
                    	<label class="my-form-label">排序</label>
	                    <div class="my-input-block">
	                        <input type="text" name="orders" required="required"
	                               data-tips-error-required="排序不能为空" autocomplete="off" placeholder="0" class="my-input">
	                    </div>
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">备注</label>
                    <div class="my-input-block">
                        <textarea placeholder="请输入备注信息" class="my-textarea" name="remarks"></textarea>
                    </div>
                </div>
                <div class="my-form-item">
                    <div class="my-form-item">
                        <div class="my-input-block">
                            <button type="submit" class="my-btn ">保存</button>
                            <button type="button" class="btn btn-link" ng-click="goBack()">返回列表</button>
                        </div>
                    </div>
                </div>
            </form>
            <!---->
        </div>
    </div>
    <!---->
</div>