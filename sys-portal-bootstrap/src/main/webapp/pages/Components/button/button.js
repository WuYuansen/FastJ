/**
 * User: 吴元森/15909910367@163.com
 * Date: 2017/2/9
 * Time: 17:51
 */
define(['require', 'angular', 'jquery', 'myView'], function (require, angular, $) {
    /**
     * 定义模块函数
     * @param {string} module 默认模块名
     * @param {string} controller 默认模块控制器
     * @return {function}
     */
    return function (module, controller) {
        angular.module(module,[ 'myView']).controller(controller, ['$scope', '$location','$view',
            function ($scope, $location,$view) {
                $scope.app.layout.classes.body = 'body';
            }
        ]);
    };
});