/**
 *
 * @type {string}
 */
var script = document.scripts[document.scripts.length - 1].src, baseUrl = script.substring(0, script.lastIndexOf("/"));
var baiduAK = "oSsL7EkW76TB4xcgF8UGvHSFn7g1O8la";
/**
 * 应用启动文件
 *
 */
require.config({
    waitSeconds: 0,
    baseUrl: './',
    map: {'*': {'css': 'script/provider/requirejs/css.min.js'}},
    paths: {//js 路径配置
        'app.config': ['script/config'],
        'debug': ['script/plugs/debug'],
        'myView': ['script/provider/my-view'],
        'myForm': ['script/provider/my-form'],
        'layedit' : ['script/plugs/layui/lay/modules/layedit'],
        'myDialog': ['script/provider/my-dialog'],
        'layui': ['script/plugs/layui/layui'],
        'pace': ['script/provider/pace/pace.min'],
        'jquery': ['script/provider/jquery/1.12.4/jquery.min'],
        'supersized': ['script/plugs/supersized/js/supersized.3.2.7'],
        'angular': ['script/provider/angularjs/angularjs.min'],
        'ngCookies': ['script/provider/angularjs/angular-cookies.min'],
        'ngSanitize': ['script/provider/angularjs/angular-sanitize.min'],
        'ngRoute': ['script/provider/angularjs/angular-route.min'],
        'ui.bootstrap': ['script/provider/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min'],
//        'jqurey1-7-2':['script/provider/jedate-3.7/jedate/jquery-1.7.2'],
        'jeDate':['script/provider/jedate-3.7/jedate/jquery.jedate.min'],
        'jqGrid':['script/provider/my-table'],
        'zTree' : ['script/provider/zTree_v3-master/js/jquery.ztree.all.min'],
        'urlMapping' : ['script/urlMapping'],
        'myUtils' : ['script/provider/my-utils'],
        'baiduAPI' : ['http://api.map.baidu.com/api?v=2.0&ak=oSsL7EkW76TB4xcgF8UGvHSFn7g1O8la'],
        'inputMask' : ['script/provider/input-mask/jquery.inputmask',
                       'script/provider/input-mask/jquery.inputmask.numeric.extensions',
                       'script/provider/input-mask/jquery.inputmask.phone.extensions',
                       'script/provider/input-mask/jquery.inputmask.regex.extensions',
                       'script/provider/input-mask/jquery.inputmask.extensions',
                       'script/provider/input-mask/jquery.inputmask.date.extensions'
         ],
        'charts':['script/provider/charts/charts'],
    	'charts-line':['script/provider/charts/my-charts-line'],
    	'charts-bar':['script/provider/charts/my-charts-bar'],
    	'charts-pie':['script/provider/charts/my-charts-pie'],
    	/* 百度图表 */
    	'baidu_charts':['script/provider/charts/baidu/echarts'],
    	'baidu_charts2' : [
    	        'script/provider/charts/baidu2/echarts-all-3',
    	        'script/provider/charts/baidu2/dataTool.min',
				'script/provider/charts/baidu2/bmap.min',
				'script/provider/charts/baidu2/xinjiang1',
				'script/provider/charts/baidu2/data',
				'script/provider/charts/baidu2/wlmq',
				'script/provider/charts/baidu2/kashi'    
        ],
    	'baidu_macarons'	:	['script/provider/charts/baidu/macarons'],
    	'my-baidu-charts' : ['script/provider/charts/baidu/my-baidu-charts'],
    	'AjaxState' : ['script\provider\AjaxState'],
    	'select2':['script/provider/select2-4.0.3/dist/js/select2.min'],
    	'my-select':['script/provider/my-select2'],
    	'my-popup-table' : 'script/provider/my-popupTable',
    	'weather'	:	'script/provider/my-weather',
    	'my-chart' : 'script/provider/jedate-3.7/jedate/jquery-1.7.2',
    	'my-treePanel' : 'script/provider/my-treePanel',
    	'expFile' : [
    	      'script/provider/expFile/Blob',
    	      'script/provider/expFile/FileSaver',
    	      'script/provider/expFile/tableExport'
         ]
    },
    shim: {//为js添加依赖
        'angular': {exports: 'angular'},
        'baiduAPI' : {exports:'baiduAPI',deps:['http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js',
                                               'http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction_min.js']},
        'weather' : {exports:'weather',deps:['jquery']},
        'supersized': {deps: ['jquery', 'css!script/plugs/supersized/css/supersized.css']},
        'ui.bootstrap': {deps: ['angular', 'css!theme/bootstrap/bootstrap.min.css']},
        'pace': {deps: ['css!script/provider/pace/pace-theme-flash.min.css']},
        'layui': {deps: ['css!script/plugs/layui/css/layui.css', 'jquery']},
        'debug': {deps: ['jquery']},
        'myView': {deps: ['angular']},
        'myForm': {deps: ['angular', 'myDialog', 'jquery']},
        'myDialog': {deps: ['angular', 'layui']},
        'ngRoute': {deps: ['angular']},
        'ngCookies': {deps: ['angular']},
        'ngSanitize': {deps: ['angular']},
        'baidu_charts2' : {
        	deps : [
        	    'script/provider/charts/baidu2/echarts-all-3.js',
				'script/provider/charts/baidu2/dataTool.min.js',
				'script/provider/charts/baidu2/bmap.min.js',
				'script/provider/charts/baidu2/xinjiang1.js',
				'script/provider/charts/baidu2/data.js',
				'script/provider/charts/baidu2/wlmq.js',
				'script/provider/charts/baidu2/kashi.js'        
	        ]
        },
        'jeDate':{exports:'jquery',deps:['jquery','css!script/provider/jedate-3.7/jedate/skin/jedate.css']},
        'jqGrid' : {deps:['jquery','css!theme/css/my-table']},
        'inputMask':{deps:[
             'script/provider/input-mask/jquery.inputmask.numeric.extensions',
             'script/provider/input-mask/jquery.inputmask.phone.extensions',
             'script/provider/input-mask/jquery.inputmask.regex.extensions',
             'script/provider/input-mask/jquery.inputmask.extensions',
             'script/provider/input-mask/jquery.inputmask.date.extensions'
             
        ]},
        'zTree' : {deps : ['jquery','css!script/provider/zTree_v3-master/css/metroStyle/metroStyle.css']},
        'locale':{exports:[]},
        'charts-line' 	: 	{deps:['charts-line'],exports:'charts'},
        'charts-bar'	:	{deps:['charts-bar'],exports:'charts'},
        'charts-pie'	:	{deps:['charts-pie'],exports:'charts'},
        'my-chart'		:	{deps:['css!theme/css/my-chart.css']},
        'my-treePanel'  :   {deps:['zTree']}
    },
    deps: ['angular','myUtils','zTree','urlMapping','script/locale/locale-'+(navigator.language||navigator.browserLanguage).replace('-','_')],
    urlArgs: "v=" + (new Date()).getTime()
});