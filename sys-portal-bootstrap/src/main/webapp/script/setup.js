/**
 * 加载进度显示
 * @returns {undefined}
 */
require(['pace'], function (pace) {
    pace.start({document: false});
});

API_URL = "";

/**
 * 应用启动器
 * @param {type} angular
 * @returns {undefined}
 */
require(['angular', 'ngRoute', 'ngCookies', 'myView', 'myForm', 'myDialog','layui','weather','zTree'],function (angular) {
    layui.config({dir:baseUrl + '/plugs/layui/'})
    layui.use(['layer','element','jquery','laydate']);
    // 创建APP应用
    var app = angular.module('app', ['ngRoute', 'myView', 'myDialog', 'myForm', 'ngCookies']);
    // 应用启动配置
    app.config(['$routeProvider', '$viewProvider', '$locationProvider', function ($routeProvider, $viewProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $viewProvider.registerView('login.jsp');
        $routeProvider.otherwise('login.jsp');
    }]);
    // 应用初始化动作
    app.run(['$location', '$view', '$form', '$rootScope', '$templateCache', '$cookies', '$http', '$httpParamSerializerJQLike','$dialog',
        function ($location, $view, $form, $rootScope, $templateCache, $cookies, $http, $httpParamSerializerJQLike, $dialog) {
            // 模块初始化赋值
            angular.$view = $view;
            angular.$http = $http;
            angular.$dialog = $dialog;
            angular.$location = $location;
            angular.$cookies = $cookies;
            angular.$rootScope = $rootScope;
            angular.$form = $form;
            $rootScope.$location = $location;
            angular.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
            //登陆信息
            $rootScope.realname = angular.$cookies.get('realname');
            $rootScope.post = angular.$cookies.get('post');
            $rootScope.dept = angular.$cookies.get('dept');
            //加载菜单资源
            $http({method:'get',url:URL.sysURL.initMenu}).success(function (ret, status) {
                if (parseInt(status) === 200) {
                    if (ret.success && ret.success === false) {
                        angular.$dialog.error('加载菜单资源异常，请稍后再试！', 3, function () {
                             angular.$view.goto('login.jsp');
                        });
                    }
                    if (typeof (ret) === 'object') {
                        $rootScope.app.menu = ret.list;
                        $rootScope.app.menu[0].leaf = true; //默认选中第一个
                    }
                }else {
                    angular.$dialog.error('E{status}-服务器繁忙，请稍候再试！'.replace('{status}', status));
                }
            }).error(function () {
                angular.$dialog.tips('服务器繁忙，请稍候再试！');
            });
            // 页面全局属性定义
            $rootScope.app = {
                layout: {
                    classes: {body: 'body'}
                },
                site: {
                    url: "http://www.jianshu.com/u/52d72cacb93e",
                    title: '新疆维吾尔自治区电梯应急处置数据归集平台',
                    icon: 'theme/img/logo.png',
                    copyright: '技术支持 ：乌鲁木齐光通嘉业网络服务有限公司 ',
                    company: '乌鲁木齐光通嘉业网络服务有限公司 '
                },
                menuLeft: true,
                menu: []
            };
            //点击隐藏左边菜单
            $rootScope.hideLeftMenu = function(ele){
                $rootScope.app.menuLeft = !($rootScope.app.menuLeft);
            };
            // 顶部菜单点击
            $rootScope.topMenuOnClick = function (menu) {
            	//存入模块名称$rootScope.app.menu[index]
            	window.location.href="#welcome/blank";
                var index = parseInt(menu.$index);
                if ($rootScope.app.menu[index].href && $rootScope.app.menu[index].href.indexOf('javascript') < 0) {
                    $rootScope.app.menuLeft = false;
                    return window.location.href = $rootScope.app.menu[index].extendtype;
                }
                $rootScope.app.menuLeft = true;
                for(var i in $rootScope.app.menu) {
                    $rootScope.app.menu[i].leaf = (parseInt(i) === parseInt(index));
                    if ($rootScope.app.menu[i].children) {
                        for (var m in $rootScope.app.menu[i].children) {
                            if ($rootScope.app.menu[i].children[m].href && $rootScope.app.menu[i].children[m].href.indexOf('javascript') < 0) {
                                window.location.href = $rootScope.app.menu[i].sub[m].extendtype;
                                break;
                            }
                            if ($rootScope.app.menu[i].children[m].children) {
                                for (var n in $rootScope.app.menu[i].children[m].children) {
                                    if ($rootScope.app.menu[i].children[m].children[n].href && $rootScope.app.menu[i].children[m].children[n].href.indexOf('javascript') < 0) {
                                        window.location.href = $rootScope.app.menu[i].children[m].children[n].extendtype;
                                        break;
                                    }
                                }
                            }
                        }
                        //break;
                    }
                }
                window.localStorage.setItem('menu_location_name',$rootScope.app.menu[index].name); //顶部菜单获取名称
            };
            // 左侧菜单点击
            $rootScope.leftMeneClick = function(menu){
            	//menu.m.href
            	if(menu.menu.extendtype){
	                if((menu.menu.extendtype).indexOf('javascript') < 0){
	                	window.localStorage.setItem('location',''); //清空
	                    return window.location.href = menu.menu.extendtype;
	                }
            	}
            };
            // 全局退出登录
            $rootScope.logout = function () {
                angular.$dialog.confirm('确定要退出登录吗？', function () {
                	$.ajax({
                		url:URL.sysURL.logOut,
                		success:function(json) {
                			var expireDate = new Date();  
                			expireDate.setDate(expireDate.getDate());                
//                			angular.$cookies.put('token', 'oatmeal', {'expires': expireDate.toUTCString()});
                			angular.$cookies.put('token','');
                			window.localStorage.setItem('forword_url','');
                			window.location.href = 'index.jsp';
                        },error : function(){
                        	angular.$dialog.tips('抱歉，推出系统失败，请稍后再试！');
                        }
                	})
                });
            };
            
            //全局的ajax访问，处理ajax清求时sesion超时  
            $.ajaxSetup({   
            	contentType:"application/x-www-form-urlencoded;charset=utf-8",   
            	complete:function(XMLHttpRequest,textStatus){   
            	        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");  
            	        if(sessionstatus=="timeout"){
            	        	angular.$dialog.alert('您登陆已超时，请重新登录',function(){
            	        		window.location.href = 'index.jsp';
            	        	});
                        }   
                 }   
            });
            
            // 页面跳转前的处理
            $rootScope.$on("$locationChangeStart", function () {
                console.log('开始跳转页面，地址 : ' + $location.$$path);
                console.log('*********************************************************');
//                console.log('*******Dev：吴Yuan小森森						*********');
//                console.log('*******E-mail：15909910367@163.com 				*********');
//                console.log('*******Host：http://www.jianshu.com/u/52d72cacb93e	*****');
                console.log('*********************************************************');
                if ($location.$$path.length > 0) {
                    // 动态注册路由
//                	console.log($view);
                    $view.registerView($location.$$path);
                    //设置页面高度
                    $('.my-tab').height($(window).height()-125);
                    $('.centinfo').height($('.my-tab').height()-60);
                    // 需要登录的场景
                   if ($location.$$path !== '/login.jsp' && !angular.$cookies.get('token')) {
                        angular.$dialog.tips('抱歉，需要登录后才能进入！');
                        window.location.href = 'index.jsp';
                    } else if (angular.$cookies.get('token')) {
                        if (window.location.href.indexOf('admin.jsp') > 0) {
                            angular.$view.goto($location.$$path);
                        } else {
                            window.location.href = 'admin.jsp';
                        }
                    }
                }
            });
            
            //监听浏览器后退事件
            if(window.localStorage.getItem('forword_url') != null){
	            if (window.history && window.history.pushState) {
	            	$(window).on('popstate', function () {
	            		window.history.pushState('forward', null, '#'+window.localStorage.getItem('forward_url'));
	            		window.history.forward(1);
	            	});
	            }
	            window.history.pushState('forward', null, '#'+window.localStorage.getItem('forward_url')); //在IE中必须得有这两行
	            window.history.forward(1);
            }

            // 页面跳转成功后清除缓存
            $rootScope.$on('$locationChangeSuccess', function () {
                $templateCache.removeAll();
                layui.use(['element'], function (element) {
                    element().init();
                });
            });

            // 页面标题修正，兼容苹果设备
            $rootScope.$watch('app.site.title', function (title) {
                document.title = title;
                var iframe = document.createElement("iframe");
                iframe.title = '', iframe.width = 0, iframe.height = 0;
                iframe.setAttribute("src", "empty.jsp");
                iframe.addEventListener('load', function () {
                    setTimeout(function () {
                        document.body.removeChild(iframe);
                    }, 0);
                });
                document.body.appendChild(iframe);
            });
        }
    ]);
    // 启动应用
    angular.bootstrap(document, [app.name]);
});