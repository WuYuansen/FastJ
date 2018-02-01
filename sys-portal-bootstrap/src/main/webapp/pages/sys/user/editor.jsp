<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>

<!--  
 User: 吴元森/15909910367@163.com
 Date: 2017/3/7
 Time: 14:01 
 -->
<div class="my-main">
    <fieldset class="my-elem-field my-field-title">
        <legend>当前位置：{{location_path}}</legend>
    </fieldset>
    <div class="centinfo">
        <form class="my-form" name="form" data-auto="true" method="post" action="{{actionURL}}">
        <input type="hidden" name="id">
            <div class="my-form-item jew100">
            	<div class="my-inline f_jew50">
	                <label class="my-form-label">登录名</label>
	                <div class="my-input-block">
	                    <input type="text" name="loginname" required autocomplete="off" placeholder="请输入登录名" class="my-input">
	                </div>
                </div>
                <div class="my-inline f_jew50">
	                <label class="my-form-label">用户状态</label>
	                <div class="my-input-block">
	                    <select name="jobstate">
	                    	<c:forEach items="${fns:getDicByType('JobState') }" var="k">
	                    		<option value="${k.value}">${k.key }</option>
	                    	</c:forEach>
	                    </select>
	                </div>
                </div>
            </div>
            <div class="my-form-item jew100">
                <div class="my-inline f_jew50">
                	<label class="my-form-label">请输入密码</label>
              <div class="my-input-block input-group">
              		<div class="input-group-addon"><i class="fa fa-key"></i></div>
                  <input type="password" name="password" id="date" placeholder="请输入登陆密码 " readOnly autocomplete="off" class="my-input" />
              </div>
          </div>
          <div class="my-inline f_jew50">
              <label class="my-form-label">确认密码</label>
              <div class="my-input-block input-group">
              		<div class="input-group-addon"><i class="fa fa-key"></i></div>
                  <input type="password" name="confirm_password" placeholder="请再次输入密码 " autocomplete="off" class="my-input">
              </div>
          </div>
            </div>
            <div class="my-form-item">
            	<div class="my-inline f_jew50">
                 <label class="my-form-label">姓名</label>
                 <div class="my-input-block">
                     <input type="text" name="realname" type="number" autocomplete="off" placeholder="请输入您的姓名" class="my-input">
                 </div>
                </div>
                <div class="my-inline f_jew50">
                 <label class="my-form-label">性别</label>
                 <div class="my-input-block">
                        <select name="sex" placeholder="请选择">
                   <option value="">请选择</option>
                   <c:forEach var="k" items="${fns:getDicByType('Sex')}" >
                     	<option value="${k.value }">${k.key}</option>    
				</c:forEach>
               </select>
                 </div>
                </div>
            </div>
            <div class="my-form-item">
            	<div class="my-inline f_jew50">
                 <label class="my-form-label">身份证号</label>
                 <div class="my-input-block input-group">
                 	 <div class="input-group-addon"><i class="fa fa-credit-card"></i></div>
                     <input type="text" name="idcard" autocomplete="off" placeholder="请输入" class="my-input">
                 </div>
                </div>
                <div class="my-inline f_jew50">
                	<label class="my-form-label">民族</label>
                 <div class="my-input-block">
                     <select name="nation"  placeholder="请输入">
                   <option value="">请选择</option>
                   <c:forEach var="k" items="${fns:getDicByType('NATION')}" >
                     	<option value="${k.value }">${k.key}</option>    
				</c:forEach>
               </select>
                 </div>
                </div>
            </div>
            
            <div class="my-form-item">
            	<div class="my-inline f_jew50">
            		<label class="my-form-label">办公电话</label>
                 <div class="my-input-block input-group">
					 <div class="input-group-addon">+86</div>
                     <input type="text" name="tel" autocomplete="off" data-inputmask="'mask': ['9999-9999999']" data-mask placeholder="区号-座机号码" class="my-input">
                 </div>
            	</div>
            	<div class="my-inline f_jew50">
            		<label class="my-form-label">联系电话</label>
                 <div class="my-input-block input-group">
                 	<div class="input-group-addon">+86</div>
                    <input type="text" name="mobphone" autocomplete="off" data-inputmask="'mask':['99999999999']" data-mask placeholder="请输入您的常用手机号" class="my-input">
                 </div>
            	</div>
            </div>
            
            <div class="my-form-item">
            	<div class="my-inline f_jew50">
                 <label class="my-form-label">QQ</label>
                 <div class="my-input-block input-group">
                 	<div class="input-group-addon"><i class="fa fa-qq"></i></div>
                     <input type="text" name="qq" autocomplete="off" placeholder="请输入" class="my-input">
                 </div>
                </div>
                <div class="my-inline f_jew50">
                	<label class="my-form-label">E-mail</label>
                 <div class="my-input-block">
                     <input type="email" name="email" autocomplete="off" placeholder="xxxxxxx@xx.com" class="my-input">
                 </div>
                </div>
            </div>
            <div class="my-form-item">
                <label class="my-form-label">联系地址</label>
                <div class="my-input-block input-group">
                	<div class="input-group-addon"><i class="fa fa-home"></i></div>
                    <input type="text" name="address" autocomplete="off" placeholder="请输入" class="my-input">
                </div>
            </div>
            <div class="my-form-item">
                <div class="my-form-item my-form-text">
                    <label class="my-form-label">备注</label>
                    <div class="my-input-block">
                        <textarea placeholder="备注" name="remarks" class="my-textarea"></textarea>
                    </div>
                </div>
            </div>
            <div class="my-form-item">
            	<div class="my-inline f_jew50">
                 <label class="my-form-label">所属机构</label>
                 <div class="my-input-block">
                 	<input type="hidden" name="deptcode" />
                 	<input type="text" name="deptname" ng-click="showMenu();" autocomplete="off" readOnly placeholder="请选择" class="my-input">
                 	<div id="menuContent" class="menuContent" style="display:none; position: absolute;z-index:99999;background: white;">
						<ul id="treeDemo" class="ztree" style="margin-top:0;"></ul>
					</div>
				<!-- tree dom -->
                 </div>
                </div>
                <div class="my-inline f_jew50">
                	<label class="my-form-label">职务</label>
                 <div class="my-input-block">
                     <select name="post"  placeholder="请选择">
                   <option value="">请选择</option>
                   <c:forEach var="k" items="${fns:getDicByType('POST')}" >
                     	<option value="${k.value }">${k.key}</option>    
				</c:forEach>
               </select>
                 </div>
                </div>
            </div>
            <!-- 自定义内容 -->
            <!-- 自定义内容 -->
            <div class="my-form-item">
                <div class="my-form-item">
                    <div class="my-input-block">
                        <button type="submit" class="my-btn">保存</button>
                        <button type="button" class="btn btn-link" ng-click="goBack()">返回列表</button>
                    </div>
                </div>
            </div>
        </form>
        <!---->
    </div>
    <!---->
</div>