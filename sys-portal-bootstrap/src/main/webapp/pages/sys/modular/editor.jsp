<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>
<!--  
 User: 吴元森/15909910367@163.com
 Date: 2017/3/7
 description : 系统资源
 Time: 14:01 
 -->
<div class="my-main">
    <fieldset class="my-elem-field my-field-title">
        <legend>当前位置：{{location_path}}</legend>
    </fieldset>
    <div>
        <div class="centinfo">
            <form class="my-form" name="form" data-auto="true" method="post" action="{{actionURL}}">
            <input type="hidden" name="id">
                <div class="my-form-item">
                    <label class="my-form-label">模块名称</label>
                    <div class="my-input-block">
                        <input type="text" name="modularname" required="required" autocomplete="off" placeholder="请输入模块名称" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">显示名称</label>
                    <div class="my-input-block">
                        <input type="text" name="showname" required="required" autocomplete="off" placeholder="请输入模块显示名称" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">模块拼音</label>
                    <div class="my-input-block">
                        <input type="text" name="modularen" required="required" autocomplete="off" placeholder="请输入模块拼音(例如：用户管理模块 此处键入 'USERMANAGER')" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">上级模块</label>
                    <div class="my-input-block">
                   		<input type="hidden" name="children" autocomplete="off" readOnly class="my-input">
                        <input type="text" name="childrenText" autocomplete="off" readOnly ng-click="showMenu();" placeholder="请选择模块" class="my-input">
                        <div id="menuContent" class="menuContent" style="display:none; position: absolute;z-index:99999;background: white;">
                        	<ul id="treeDemoByMenu" class="ztree" style="margin-top:0;"></ul>
                        </div>
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">模块类型</label>
                    <div class="my-input-block">
                        <select name="extendclass" placeholder="请选择模块类型" ng-change="change()">
                        	<option value="">请选择</option>
                        	<c:forEach items="${fns:getDicByType('menuType') }" var="right">
								<option ng-select="${right.value }" value="${right.value}">${right.key }</option>
				    		</c:forEach>
                        </select>
                    </div>
                </div>
                <div class="my-form-item displayHide" id="right_">
                    <label class="my-form-label">拥有权限</label>
                    <div class="my-input-block">
                        <c:forEach items="${fns:getDicByType('ModularRight') }" var="right">
							<input type="checkbox" name="modularright[${right.keycode}]" title="${right.key }">				    		
				    	</c:forEach>
                    </div>
                </div>
                <div class="my-form-item displayHide" id="pageHref">
                    <label class="my-form-label">访问地址</label>
                    <div class="my-input-block">
                        <input type="text" name="extendtype" autocomplete="off" placeholder="请输入访问地址" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">图标</label>
                    <div class="my-input-block">
                        <input type="text" name="icon" autocomplete="off" placeholder="请输入矢量图 样式(如：fa fa-user)" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">排序</label>
                    <div class="my-input-block input-group">
                        <input type="number" name="orders" autocomplete="off" placeholder="0" class="my-input">
                        <div class="input-group-addon"><i class="fa  fa-sort-numeric-asc"></i></div>
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