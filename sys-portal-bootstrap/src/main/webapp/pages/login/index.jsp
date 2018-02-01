<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="login-container" style="height:100%">
    <style>.view-container{height:100%}</style>
    <div class="clouds clouds-footer"></div>
    <div class="clouds"></div>
    <div class="clouds clouds-fast"></div>
    <div class="container" style="top:50%;margin-top:-300px">
    	<!-- <div style="margin-left:21%;"><img height="60px" src="theme/img/logo1.png" /></div> -->
        <form onsubmit="return false;" data-ng-submit="submit()" class="content my-form" name="user">
            <div class="people">
                <!-- <div class="tou"></div> -->
                <div class="tou_title">{{app.site.title}}</div>
                <!-- <div class="initial_left_hand" data-ng-class="{false:'initial_left_hand', true:'left_hand'}[hideEye]"></div>
                <div class="initial_right_hand" data-ng-class="{false:'initial_right_hand', true:'right_hand'}[hideEye]"></div> -->
            </div>
            <ul>
                <li>
                    <input required="required"
                           pattern="^\S{4,}$"
                           data-tips-error-required="登录账号不能为空"
                           data-tips-invalid="请输入4位及以上的字符"
                           type="text"
                           name="loginName"
                           class="my-input username"
                           style="text-transform:lowercase;"
                           autocomplete="off"
                           autofocus="autofocus"
                           onkeyup="this.value=this.value.toLocaleLowerCase()" 
                           placeholder="请输入用户名/手机号码" />
                </li>
                <li>
                    <input required="required"
                           pattern="^.{4,}$"
                           data-tips-error-required="登录密码不能为空"
                           data-tips-invalid="请输入4位及以上的字符"
                           type="password"
                           name="password"
                           class="my-input password"
                           autocomplete="off"
                           data-ng-focus="hideEye = !!1"
                           data-ng-blur="hideEye = !1"
                           placeholder="请输入密码"/>
                </li>
                <li class="text-center">
                    <button type="submit" class="my-btn layui-btn">立 即 登 入</button>
                    <a style="position:absolute;display:none;right:0" href="javascript:void(0)">忘记密码？</a>
                </li>
            </ul>
        </form>
    </div>
    <div class="footer">{{app.site.copyright}} &nbsp;&nbsp;
    	<a href="http://sw.bos.baidu.com/sw-search-sp/software/4bcf5e4f1835b/ChromeStandalone_54.0.2840.99_Setup.exe" target="_blank"><b><font color="#fff">推荐谷歌浏览器</font>
    </div>
</div>
