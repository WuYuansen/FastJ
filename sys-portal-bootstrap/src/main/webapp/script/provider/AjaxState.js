/**
 * 监听系统所有的请求作用是监听session是否失效
 * @author wys
 * @date 2017年4月18日13:23:10
 */
;(function ($) {
	console.log('加载上了')
	$(document).ajaxStart(function() {
	  angular.$dialog.loading();
	});
	$(document).ajaxComplete(function(event, xhr, settings ) {
	  angular.$dialog.close();
	});
})();