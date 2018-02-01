<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>
<!--  
 User: 吴元森/15909910367@163.com
 Date: 2017/3/7
 description : 部门
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
               <div class="my-form-item">
                    <label class="my-form-label">部门名称</label>
                    <div class="my-input-block">
                        <input type="text" name="deptname" required="required"
                               data-tips-error-required="登录名不能为空" autocomplete="off" placeholder="请输入登录名" class="my-input">
                    </div>
                </div>
                <!-- <div class="my-form-item">
                    <label class="my-form-label">部门类型</label>
                    <div class="my-input-block">
                        <input type="text" name="depttype" autocomplete="off" placeholder="请输入登录名" class="my-input">
                    </div>
                </div> -->
                <div class="my-form-item">
                    <label class="my-form-label">负责人</label>
                    <div class="my-input-block">
                    	<input type="hidden" name="deptmanagerid" autocomplete="off" placeholder="请输入登录名" class="my-input">
                        <input type="text" name="deptmanagername" autocomplete="off" placeholder="请选择部门负责人" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">上级部门</label>
                    <div class="my-input-block">
                        <input type="hidden" name="deptsuper" autocomplete="off" ng-click="showMenu();" placeholder="请选择上级部门" class="my-input">
                        <input type="text" name="deptsuperText" autocomplete="off" ng-click="showMenu();" placeholder="请选择上级部门" class="my-input">
                        <div id="menuContent" class="menuContent" style="display:none; position: absolute;z-index:99999;background: white;">
							<ul id="treeDemo" class="ztree" style="margin-top:0;"></ul>
						</div>
                    </div>
                </div>
                <!-- <div class="my-form-item">
                    <label class="my-form-label">管辖区域</label>
                    <div class="my-input-block">
                        <input type="text" name="managerarea" required="required"
                               data-tips-error-required="登录名不能为空" autocomplete="off" placeholder="请输入登录名" class="my-input">
                    </div>
                </div> -->
                <div class="my-form-item">
                    <label class="my-form-label">部门介绍</label>
                    <div class="my-input-block">
                           <textarea placeholder="请对部门做简要介绍" class="my-textarea" name="deptremarks"></textarea>
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