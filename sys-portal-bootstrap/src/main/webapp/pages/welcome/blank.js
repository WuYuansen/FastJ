define(['require', 'angular'], function (require, angular, $,echarts) {return function (module, controller) {
        /*! 创建默认模块及默认控制器 */
        angular.module(module, ['myView']).controller(controller, ['$scope', '$location', function ($scope, $location) {
        		$scope.app.layout.classes.body = 'body';
        		window.myWindowResize(165,160);
        		window.localStorage.setItem('sjgl_dtxx_ewm','');
        		$scope.location_path = window.localStorage.getItem('menu_location_name');
            }
        ]);
    };
});
