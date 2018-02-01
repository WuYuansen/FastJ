/*!
 * AngularJS Chart.js 柱状图
 *
 *@author wys
 *@date 2017年3月20日18:55:26
 */
angular.module('angular.directives-select2', []).directive('select2', [function () {
	return{
		    restrict: 'AE',
		    scope: {
		    	config:'=config'
		    },
		    link: function (scope, element, attrs) {
		            // 初始化
	            var tagName = element[0].tagName,
	                config = {
	                    allowClear: true,
	                    multiple: !!attrs.multiple,
	                    placeholder: attrs.placeholder || ' '   // 修复不出现删除按钮的情况
	                };
	            // 生成select
//	            if(tagName === 'SELECT') {
	                // 初始化
	                var $element = $(element);
	                delete config.multiple;
	                angular.extend(config, scope.config);
	                $element.prepend('<option value=""></option>').val('').select2(config);
	                // model - view
	                scope.$watch('ngModel', function (newVal) {
	                    setTimeout(function () {
	                        $element.find('[value^="?"]').remove();    // 清除错误的数据
	                        $element.select2('val', newVal);
	                    },0);
	                }, true);
	                return false;
//	            }
		    }
	  }
}]);