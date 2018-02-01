/*!
 * AngularJS 基于百度Echarts 折线图
 *
 *@author wys
 *@date 2017年3月20日18:55:26
 */
angular.module('angular.directives-baidu-charts', []).directive('baiducharts', [function () {
	return{
			restrict:'EA',
		    scope: {
		    	option:'=ecOption',
                config:'=ecConfig',
                chartjsHeight: '=ecHeight',
            	chartjsWidth: '=ecWidth'
		    },
		    link: function (scope, elements, attributes) {
		    	$(elements[0])[0].id='BAIDUCHARTS_'+Math.random();
		    	function refreshChart(){
		    		var theme = (scope.config && scope.config.theme) ? scope.config.theme : 'macarons';
	                var chart = echarts.init(elements[0],theme,{
	                	width: scope.chartjsWidth ?$(elements[0]).width() + scope.chartjsWidth: $(elements[0]).width()-10,
	        			height: scope.chartjsHeight || 250
	                });
                    if(scope.config && scope.config.dataLoaded === false){
                        chart.showLoading();
                    }
                    if(scope.config && scope.config.dataLoaded){
                        chart.setOption(scope.option);
                        chart.resize();
                        chart.hideLoading();
                    }
                    if(scope.config && scope.config.event){
                        if(angular.isArray(scope.config.event)){
                            angular.forEach(scope.config.event,function(value,key){
                                for(var e in value){
                                    chart.on(e,value[e]);
                                }
                            });
                        }
                    }
                    window.onresize = function(){
                    	chart.resize({ //初始大小
                        	width:scope.chartjsWidth ?$(elements[0]).width() + scope.chartjsWidth: $(elements[0]).width() - 10, 
                        	height:scope.chartjsHeight || 250
                        });
                    }
                };
                //图表原生option
                scope.$watch(
                    function () { return scope.option; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );
		    }
	  }
}]);