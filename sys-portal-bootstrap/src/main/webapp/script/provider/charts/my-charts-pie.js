/*!
 * AngularJS Chart.js 饼状图
 *
 *@author wys
 *@date 2017年3月20日18:55:26
 */
angular.module('angular.directives-chartjs-pie', []).directive('chartsPie', [function () {
	return{
		    restrict: 'E',
		    template: '<canvas class="my-chartjs-pie"></canvas>',
		    scope: {
		      chartjsModel: '=',
		      chartjsHeight: '='
		    },
		    link: function (scope, elements, attributes) {
			      scope.$watch('chartjsModel', function (newValue) {
			        if (newValue !== undefined) {
			          var options = {
			        		//Boolean - Whether we should show a stroke on each segment
		        			segmentShowStroke : true,
		        			//String - The colour of each segment stroke
		        			segmentStrokeColor : "#fff",
		        			//Number - The width of each segment stroke
		        			segmentStrokeWidth : 2,
		        			//Boolean - Whether we should animate the chart	
		        			animation : true,
		        			//Number - Amount of animation steps
		        			animationSteps : 100,
		        			//String - Animation easing effect
		        			animationEasing : "easeOutBounce",
		        			//Boolean - Whether we animate the rotation of the Pie
		        			animateRotate : true,
		        			//Boolean - Whether we animate scaling the Pie from the centre
		        			animateScale : true,
		        			//Function - Will fire on animation completion.
		        			onAnimationComplete : null
			          };
			          if (scope.chart !== undefined) {
			            scope.chart.Line(newValue, options);
			          } else {
			            var width = $(elements).parent().width();
			            var height = scope.chartjsHeight || '400';
			            var canvas = elements[0].children[0];
			            canvas.setAttribute('width', width);
			            canvas.setAttribute('height', height);
			            var chart = new Chart(canvas.getContext('2d'));
			            chart.Pie(newValue, options);
			            scope.chart = chart;
			          }
			        }
			      }, true);
		    }
	  }
}]);