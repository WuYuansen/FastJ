/*!
 * AngularJS Chart.js 柱状图
 *
 *@author wys
 *@date 2017年3月20日18:55:26
 */
angular.module('angular.directives-chartjs-bar', []).directive('chartsBar', [function () {
	return{
		    restrict: 'E',
		    template: '<canvas class="my-chartjs-bar"></canvas>',
		    scope: {
		      chartjsModel: '=',
		      chartjsHeight: '='
		    },
		    link: function (scope, elements, attributes) {
			      scope.$watch('chartjsModel', function (newValue) {
			        if (newValue !== undefined) {
			          var options = {
			        		  scaleStartValue :null,     // Y 轴的起始值
			        		  scaleLineColor : "rgba(0,0,0,.1)",    // Y/X轴的颜色
			        		  scaleLineWidth : 1,        // X,Y轴的宽度
			        		  scaleShowLabels : true,    // 刻度是否显示标签, 即Y轴上是否显示文字   
			        		  scaleLabel : "<%=value%>", // Y轴上的刻度,即文字  
			        		  scaleFontFamily : "'Arial'",  // 字体  
			        		  scaleFontSize : 12,        // 文字大小 
			        		  scaleFontStyle : "normal",  // 文字样式  
			        		  scaleFontColor : "#666",    // 文字颜色  
			        		  scaleShowGridLines : true,   // 是否显示网格  
			        		  scaleGridLineColor : "rgba(0,0,0,.05)",   // 网格颜色
			        		  scaleGridLineWidth : 2,      // 网格宽度  
			        		  bezierCurve : false,         // 是否使用贝塞尔曲线? 即:线条是否弯曲     
			        		  pointDot : true,             // 是否显示点数  
			        		  pointDotRadius : 8,          // 圆点的大小  
			        		  pointDotStrokeWidth : 1,     // 圆点的笔触宽度, 即:圆点外层边框大小 
			        		  datasetStroke : true,        // 数据集行程
			        		  datasetStrokeWidth : 2,      // 线条的宽度, 即:数据集
			        		  datasetFill : false,         // 是否填充数据集 
			        		  animation : true,            // 是否执行动画  
			        		  animationSteps : 60,          // 动画的时间   
			        		  animationEasing : "easeOutQuart",    // 动画的特效   
			        		  onAnimationComplete : null    // 动画完成时的执行函数   
			          };
			          options.datasetFill = true;
			          if (scope.chart !== undefined) {
			            scope.chart.Line(newValue, options);
			          } else {
			            var width = $(elements).parent().width();
			            var height = scope.chartjsHeight || '400';
			            var canvas = elements[0].children[0];
			            canvas.setAttribute('width', width);
			            canvas.setAttribute('height', height);
			            var chart = new Chart(canvas.getContext('2d'));
			            chart.Bar(newValue, options);
			            scope.chart = chart;
			          }
			        }
			      }, true);
		    }
	  }
}]);