<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../include/target.jsp"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		<meta charset="utf-8" />
		<title></title>
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		 <%@ include file="../../include/head.jsp" %>
<script type="text/javascript">
	//保存
	function save(){
		//操作,下面的"#" 加jquery 的获取符号
		"#Form".submit();
		"#zhongxin".hide();
		"#zhongxin2".show();
	}
	
</script>
	</head>
<body>
	<form action="${ctx}/${lowerName}/save.do" name="Form" id="Form" method="post">
		<div id="zhongxin">
		<table>
			<tr>
				<td><input type="text" name="" id="" value="" maxlength="32" placeholder="这里输入" title=""/></td>
			</tr>
			<tr>
				<td style="text-align: center;">
					<a class="btn btn-mini btn-primary" onclick="save();">保存</a>
					<a class="btn btn-mini btn-danger" onclick="top.Dialog.close();">取消</a>
				</td>
			</tr>
		</table>
		</div>
		<div id="zhongxin2" class="center" style="display:none"><br/><br/><br/><br/><br/><img src="${ctxStatic}/images/jiazai.gif" /><br/><h4 class="lighter block green">提交中...</h4></div>
	</form>
		<!-- 引入 -->
		<script type="text/javascript">window.jQuery || document.write("<script src='${ctxStatic}/js/jquery-1.9.1.min.js'>\x3C/script>");</script>
		<script src="${ctxStatic}/js/bootstrap.min.js"></script>
		<script src="${ctxStatic}/js/ace-elements.min.js"></script>
		<script src="${ctxStatic}/js/ace.min.js"></script>
		<script type="text/javascript" src="${ctxStatic}/js/chosen.jquery.min.js"></script><!-- 下拉框 -->
		<script type="text/javascript" src="${ctxStatic}/js/bootstrap-datepicker.min.js"></script><!-- 日期框 -->
		<script type="text/javascript">
		$(top.changeui());
		$(function() {
			
			//单选框
			$(".chzn-select").chosen(); 
			$(".chzn-select-deselect").chosen({allow_single_deselect:true}); 
			
			//日期框
			$('.date-picker').datepicker();
			
		});
		
		</script>
</body>
</html>