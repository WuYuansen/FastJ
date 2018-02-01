<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/fns.tld" %>
<!--  
 User: 吴元森/15909910367@163.com
 Date: 2017/3/7
 description : 角色
 Time: 14:01 
 -->
<div class="my-main">
    <fieldset class="my-elem-field my-field-title">
        <legend>当前位置：{{location_path}}</legend>
    </fieldset>
    <div>
        <div class="centinfo" style="text-align:center;margin:0 auto;">
            <!---->
            <form class="my-form" name="form" data-auto="true" method="post" style="width:400px;margin-left:30%">
                <div class="my-form-item">
                    <label class="my-form-label">原密码</label>
                    <div class="my-input-block">
                        <input type="password" name="sourcePwd" required="required"
                               data-tips-error-required="原始密码不能为空" autocomplete="off" placeholder="请输入原登陆密码" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">新密码</label>
                    <div class="my-input-block">
                        <input type="password" name="newPassword" required="required"
                               data-tips-error-required="新密码不能为空" autocomplete="off" placeholder="请输入新的登陆密码" class="my-input">
                    </div>
                </div>
                <div class="my-form-item">
                    <label class="my-form-label">确认密码</label>
                    <div class="my-input-block">
                        <input type="password" name="confimPwd" required="required"
                               data-tips-error-required="确认密码不能为空" autocomplete="off" placeholder="请输入请重写输入新密码" class="my-input">
                    </div>
                </div>
               <div class="my-form-item">
                    <div class="my-form-item">
                        <div class="my-input-block">
                            <button type="button" id="changePwd" class="my-btn ">确认修改</button>
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