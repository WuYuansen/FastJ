define(['require', 'angular', 'jquery', 'baiduAPI','myView','my-baidu-charts','weather','my-chart','zTree'
        ], function (require, angular, $,echarts) {return function (module, controller) {
        /*! 创建默认模块及默认控制器 */
        angular.module(module, ['myView','angular.directives-baidu-charts'
                                ]).controller(controller, ['$scope', '$location', '$view','$http','$rootScope','$filter', function ($scope, $location, $view,$http,$rootScope,$filter) {
        		$scope.app.layout.classes.body = 'body';
        		$rootScope.app.menuLeft = false;
        		
        		//加入天气
                $('#weather').weather({
                	//{时段}好！
                	format:'<span id="colock"><strong>{年}年{月}月{日}日 星期{周} {时}:{分}:{秒}</strong></span> <br /><b>{城市}天气</b> {天气} {夜间气温}℃ ~ {白天气温}℃'
                });
                
                //初始化月份
                $scope.JyPjData = []
                for(var i=0;i<=new Date().getMonth();i++){
                	/**/
                	$scope.JyPjData.push(i+1+'月');
                }
        		
                $scope.redirectToView = function(obj,url){
        			redirectToView(obj,url);
                }
                
        		panelClick(); 
        		$scope.liftUserStatus = '数据概览';
        		$scope.echeight = $('.my-body').height()-260;
        		window.myWindowResize(165,160);
        		
        		
        		/* 加载表格数据 */
        		$scope.result = {};
        		$scope.areaClick = function(obj){ 
        			if(obj &&  obj.isLast === "1"){
        				//write your redirect url or redirect Function
        				redirectToView(obj,"#dataCollection/biz/yjcz/index");
        				return;
        			}
        			$http({
            			mthod:'GET',
            			url : 'services/dataCollection/selectChartByYJCZ.json',
            			params : {
            				code:obj===null||obj.ID===500?"":obj.ID,
            				isLast : obj===null||obj.ID===500?"":"1",
            			}
            		}).success(function(data,headler,config,status){
            			$scope.result.list = data;
            			var dtT = 0,bkrsT=0;totalT=0,jkbkrsT=0,gzfssT=0;
            			for(var i=0;i<data.length;i++){
            				dtT += data[i].dtCount;
            				bkrsT += data[i].jkbkrs;
            				gzfssT += data[i].gzfss;
            				jkbkrsT += data[i].jkbkrs!=null?data[i].jkbkrs:0;
            				totalT += data[i].total;
            				//格式化数据显示
            				$scope.result.list[i].dtCount = formatMoney(data[i].dtCount,0);
            				$scope.result.list[i].bkrs = formatMoney(data[i].jkbkrs,0);
            				$scope.result.list[i].gzfss = formatMoney(data[i].gzfss,0);
            				$scope.result.list[i].jkbkrs = formatMoney(data[i].jkbkrs==null?0:data[i].jkbkrs,0);
            				$scope.result.list[i].total = formatMoney(data[i].total,0);
            			}
            			$scope.result.dtT = formatMoney(dtT,0);
            			$scope.result.bkrsT = formatMoney(bkrsT,0);
            			$scope.result.gzfssT = formatMoney(gzfssT,0);
            			$scope.result.jkbkrsT = formatMoney(jkbkrsT,0);
            			$scope.result.totalT = formatMoney(totalT,0);
            		});
        		}
        		$scope.areaClick(null);
        		//加载统计数据
        		$http({
            		method : 'GET',
            		url : 'services/dataCollection/index.json',
            		params : {}
            	}).success(function(data,header,config,status){
            		$scope.localData = data;
            		$scope.localData.dtTotal = formatMoney(data.dtTotal,0);
            		$scope.localData.dwTotal = formatMoney(data.dwTotal,0);
            		$scope.localData.ryTotal = formatMoney(data.ryTotal,0);
            		$scope.localData.gzTotal = formatMoney(data.gzTotal,0);
            		$scope.GFDT = data.GFDT;
            		$scope.GZGFDW = data.GZGFDW;
            		//救援到达报表
            		$scope.JyddMap = data.JyddMap;
            		//救援用时报表
            		$scope.JysjMap = data.JysjMap;
            		$scope.initChartByJyys();
            		$scope.jyddYsChart();
            		
            	}).error(function(data,header,config,status){
                	angular.$dialog.tips("加载数据异常，请稍后再试",3,function(){});
                });
        		/**/
        		
        		/**
        		 * 地图载入相关
        		 */
                $scope.mapConfig = {
            		theme:'macarons',
     	            dataLoaded:true,
    	            event: [{click:function(params){
						if(params.data.value === '0'){
							return;
						}
						var city = params.data.code;
						var type = window.localStorage.getItem('Map_ShowType');
						window.localStorage.setItem('region',city);
						window.localStorage.setItem('location',city.substr(0,4));//因为是总区域所以在这里截取字符
						window.localStorage.setItem('type',type);
						window.location.href="#/dataCollection/biz/dtxx/index";
    	            }}]
                }
                $scope.jypjHeight = 300;
                
                $http({
            		method : "GET",
            		url : 'services/dataCollection/selectByIndexMap.json'
            	}).success(function(data){
            		$scope.indexPageMap(data);
            	});
                
                $scope.indexPageMap = function(data){
                	$scope.getData = data;
                    $scope.mapOption = {
                    		tooltip: {},
    						visualMap: 
    						{
    							type: 'piecewise',
    							pieces: 
    							[
    								{value: 0, label: '未接入', color: '#dddddd'},
    								{value: 1, label: '已断开', color: '#FF3E96'},
    								{value: 2, label: '已连通', color: '#00BFFF'},
    							]
    						},
    						geo: 
    						{
    							map: "650000",
    							roam: true,
    							label: 
    							{
    								normal: 
    								{
    									show: true,
    								}
    							},
    							itemStyle: 
    							{
    								normal:{borderColor: 'rgba(0, 0, 0, 0.2)'},
    								emphasis:{
    									areaColor: null,
    									shadowOffsetX: 0,
    									shadowOffsetY: 0,
    									shadowBlur: 20,
    									borderWidth: 0,
    									shadowColor: 'rgba(0, 0, 0, 0.5)'
    								}
    							}
    						},
    						series : 
    						[
    							{
    							   type: 'scatter',
    							   coordinateSystem: 'geo',
    							   zoom:1.2,
    							},
    							{
    								name: '650000',
    								type: 'map',
    								geoIndex: 0,
    								zoom:1.2,
    								data: $scope.getData,
    								tooltip:
    								{
    									trigger: 'item',
    									position: function (point,params,dom,rect) 
    		                            {
    		                                // 位置回调
    		                                if (dom.offsetParent.tagName.toUpperCase() == "BAIDUCHARTS")
    		                                {
    		                                	return [point[0], point[1] - $("#welcomeBaiduMapPanel").height()];
    		                                }
    		                                else 
    		                                {
    		                                	return [point[0], point[1]];
    		                                }
    		                                
    		                                return [point[0], point[1]];
    		                            },
    									formatter: function(p)
    									{
    										var sname = p.name;
    										var name = p.name;
    										var quantity = p.data.quantity;
    										var value = p.data.value;
    										var result = sname + "</br>接入电梯总数: " + formatMoney(quantity,0) + " 台<br/>使用单位总数："+formatMoney(p.data.useDept,0)+"个<br>困人总数："+
    										formatMoney(p.data.krsl,0)
    										+" 人<br>平均救援到达时间："+
    										p.data.jyys || 0.00
    										+" 分钟";
    										if(value==='1'){
    											result = sname +"<br/> 已断开"
    										}
    										if(value==='0'){
    											result = sname +"<br/> 未接入"
    										}
    										return result;
    									}
    								} 
    							}      
    						]
                    }
                }
                $scope.initChartByJyys = function(){
                	 //平均到达时间和平均救援时间 JysjMap
                    $scope.JyPjConfig = {
                    		theme:'macarons',
             	            dataLoaded:true,
            	            event: [{click:function(params){
            	            	//write your code this hare
            	            }}]	
                    };
                    
                    
                    $scope.JyPjOption = {
                    		title : {
                    	        text: '',/*救援时间统计分析*/
                    	        x: 'center'
                    	    },
                    	    tooltip : {
                    	        trigger: 'axis',
                    	        position: function (point,params,dom,rect) 
	                            {
	                                // 位置回调
	                                if (dom.offsetParent.tagName.toUpperCase() == "BAIDUCHARTS")
	                                {
	                                	return [point[0], point[1] - $("#welcomeRescueTimePanel").height()];
	                                }
	                                else 
	                                {
	                                	return [point[0], point[1]];
	                                }
	                                
	                                return [point[0], point[1]];
	                            }
                    	    },
                    	    legend: {
                    	    	orient : 'vertical',
                    	        data:['平均救援时间'],//,'到达时间'
                    	        x : 'left'
                    	    },
                    	    toolbox: {
                    	        show : true,
                    	        feature : {
                    	            mark : {show: false},
                    	            dataView : {show: false, readOnly: false},
                    	            magicType : {show: true, type: ['line', 'bar']},
                    	            restore : {show: true},
                    	            saveAsImage : {show: true}
                    	        }
                    	    },
                    	    calculable : true,
                    	    xAxis : [
                    	        {
                    	            type : 'category',
                    	            boundaryGap : false,
                    	            data : $scope.JyPjData//['一月','二月','三月','四月','五月','六月','七月']
                    	        }
                    	    ],
                    	    yAxis : [
                    	        {
                    	            type : 'value',
                    	            axisLabel : {
                    	                formatter: '{value} 分钟'
                    	            }
                    	        }
                    	    ],
                    	    series : [
                    	        /*{
                    	            name:'到达时间',
                    	            type:'line',
                    	            data:[0,0,0,0,0,0,0],
                    	            markPoint : {
                    	                data : [
                    	                    {type : 'max', name: '最大值'},
                    	                    {type : 'min', name: '最小值'}
                    	                ]
                    	            },
                    	            markLine : {
                    	                data : [
                    	                    {type : 'average', name: '平均值'}
                    	                ]
                    	            }
                    	        },*/
                    	        {
                    	            name:'平均救援时间',
                    	            type:'line',
                    	            data:$scope.JysjMap,//[0,0,0,0,0,0,0],
                    	            /*markPoint : {
                    	                data : [
                    	                    {name : '月最低', value : -2, xAxis: 1, yAxis: -1.5}
                    	                ]
                    	            },
                    	            markLine : {
                    	                data : [
                    	                    {type : 'average', name : '平均值'}
                    	                ]
                    	            }*/
                    	        }
                    	    ]
                    };
                }
            	/**/
                
                //按规定时间到达救援现场
                /* 救援到达 */
                $scope.jyddYsChart = function(){
                	$scope.GdsjDdConfig = {
                    		theme:'macarons',
             	            dataLoaded:true,
            	            event: [{click:function(params){
            	            	//write your code this hare
            	            }}]
                    };
                    $scope.GdsjDdOption = {
                    		title : {
                    	        text: '',/*到达救援现场统计分析*/
                    	        x: 'center'
                    	    },
                    	    tooltip : {
                    	        trigger: 'axis',
                    	        position: function (point,params,dom,rect) 
	                            {
	                                // 位置回调
	                                if (dom.offsetParent.tagName.toUpperCase() == "BAIDUCHARTS")
	                                {
	                                	return [point[0], point[1] - $("#welcomeReachTimePanel").height()];
	                                }
	                                else 
	                                {
	                                	return [point[0], point[1]];
	                                }
	                                
	                                return [point[0], point[1]];
	                            }
                    	    },
                    	    legend: {
                    	    	orient : 'vertical',
//                    	        data:['规定时间','超过规定时间'],
                    	        x : 'left'
                    	    },
                    	    toolbox: {
                    	        show : true,
                    	        feature : {
                    	            mark : {show: false},
                    	            dataView : {show: false, readOnly: false},
                    	            magicType : {show: true, type: ['line', 'bar']},
                    	            restore : {show: true},
                    	            saveAsImage : {show: true}
                    	        }
                    	    },
                    	    calculable : true,
                    	    xAxis : [
                    	        {
                    	            type : 'category',
                    	            boundaryGap : false,
                    	            data : $scope.JyPjData //['一月','二月','三月','四月','五月','六月','七月']
                    	        }
                    	    ],
                    	    yAxis : [
                    	        {
                    	            type : 'value',
                    	            axisLabel : {
                    	                formatter: '{value} 分钟'
                    	            }
                    	        }
                    	    ],
                    	    series : [
                    	        {
                    	            name:'平均到达用时',//'规定时间',
                    	            type:'line',
                    	            data:$scope.JyddMap/*,
                    	            markPoint : {
                    	                data : [
                    	                    {type : 'max', name: '最大值'},
                    	                    {type : 'min', name: '最小值'}
                    	                ]
                    	            },
                    	            markLine : {
                    	                data : [
                    	                    {type : 'average', name: '平均值'}
                    	                ]
                    	            }*/
                    	        }/*,
                    	        {
                    	            name:'超过规定时间',
                    	            type:'line',
                    	            data:[0,0,0,0,0,0,0],
                    	            markPoint : {
                    	                data : [
                    	                    {name : '月最低', value : -2, xAxis: 1, yAxis: -1.5}
                    	                ]
                    	            },
                    	            markLine : {
                    	                data : [
                    	                    {type : 'average', name : '平均值'}
                    	                ]
                    	            }
                    	        }*/
                    	    ]
                    };
                }
                //故障原因柱状图
                $scope.gzyyConfig = {
                		theme:'macarons',
         	            dataLoaded:true,
        	            event: [{click:function(params){
        	            	//write your code this hare
        	            }}]	
                };
                $scope.gzyyOption = {
                	    tooltip : {
                	        trigger: 'axis'
                	    },
                	    legend: {
                	        data:['人为原因','外部原因','门系统','曳引系统','导向系统','轿厢','控制系统','电气系统','安全保护装置']
                	    },
                	    toolbox: {
                	        show : true,
                	        feature : {
                	            dataView : {show: true, readOnly: false},
                	            magicType : {show: true, type: ['line', 'bar']},
                	            restore : {show: true},
                	            saveAsImage : {show: true}
                	        }
                	    },
                	    calculable : true,
                	    xAxis : [
                	        {
                	            type : 'category',
                	            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                	        }
                	    ],
                	    yAxis : [{type : 'value'}],
                	    series : [{
                	            name:'人为原因',
                	            type:'bar',
                	            stack: '总量',
                	            data:[0,0,0,0,2,0,0,0,0,0,0,0]/*,
                	            markPoint : {
                	                data : [
                	                    {type : 'max', name: '最大值'},
                	                    {type : 'min', name: '最小值'}
                	                ]
            	            }*/},
                	        {name:'外部原因',
                	            type:'bar',
                	            stack: '总量',
                	            data:[0,0,0,0,0,0,0,0,0,0,0,0]/*,
                	            markPoint : {
                	                data : [
                	                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                	                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                	                ]
                	            }*/
                	        },
                	        {name:'门系统',type:'bar',stack: '总量',data:[0,0,0,0,23,0,0,0,0,0,0,0]},
	        	        	{name:'曳引系统',type:'bar',stack: '总量',data:[0,0,0,0,0,0,0,0,0,0,0,0]},
	        	        	{name:'导向系统',type:'bar',stack: '总量',data:[0,0,0,0,0,0,0,0,0,0,0,0]},
        	        		{name:'轿厢',type:'bar',stack: '总量',data:[0,0,0,0,7,0,0,0,0,0,0,0]},
        	        		{name:'控制系统',type:'bar',stack: '总量',data:[0,0,0,0,0,0,0,0,0,0,0,0]},
    	        			{name:'电气系统',type:'bar',stack: '总量',data:[0,0,0,0,0,0,0,0,0,0,0,0]},
    	        			{name:'安全保护装置',type:'bar',stack: '总量',data:[0,0,0,0,0,0,0,0,0,0,0,0]}
                	    ]
                };
                //超过规定时间到达救援现场的比率
                $scope.cgsjConfig = {
                		theme:'macarons',
         	            dataLoaded:true,
        	            event: [{click:function(params){
        	            	//write your code this hare
        	            }}]	
                };
                $scope.cgsjOption = {
                		
                };
                //************************************/
                $scope.expFile = function(){
                	var tempFileName = "数据概览-首页",inputs='',
    				discreteData = {
            			zbr:angular.$cookies.get('realname'),
            			zbsj:($filter("date")(new Date(), "yyyy年MM月dd日HH:mm:ss")),
            			dtT:$scope.result.dtT,
            			jkbkrsT:$scope.result.jkbkrsT,
            			gzfssT:$scope.result.gzfssT,
            			jkbkrsT:$scope.result.jkbkrsT,
            			totalT:$scope.result.totalT
					},
    				listData = $scope.result.list,
    				columns = "KEYNAME,total,jkbkrs,gzfss,jkbkrs,dtCount";
    				inputs += '<input type="hidden" name="tempFileName" value="' +tempFileName + '" />';
    				inputs += '<input type="hidden" name="discreteData" value=' +JSON.stringify(discreteData) + ' />';
    				inputs += '<input type="hidden" name="listData" value=' +JSON.stringify(listData) + ' />';
    				inputs += '<input type="hidden" name="columns" value=' +JSON.stringify(columns) + ' />';
    				// request发送请求
	        	    jQuery('<form action="services/expFile/downLoad.json" method="POST">' + inputs + '</form>').appendTo('body').submit().remove();
                }
                $scope.pie = function(){
                	var dynameic = $('div[name=dynamic_div]'),
                		dynameic_bar = $('div[name=dynamic_div_bar]'),
                		dynameic_pie = $('div[name=dynamic_div_pie]');
                	dynameic_bar.hide();
                	dynameic.hide();
                	dynameic_pie.show();
                	
                	//构建数据
                	$scope.pieConfig = {
            			theme:'macarons',
         	            dataLoaded:true,
        	            event: [{click:function(params){
        	            	//write your code this hare
        	            }}]	
                	};
                	//'应急处置总数','困人总数','故障发生数量','解救人数','电梯总数'
                	var legendData = [];
                	var seriesData = [];
                	for(var i=0;i<$scope.result.list.length;i++){
                		var obj = $scope.result.list[i];
                		legendData.push(obj.KEYNAME);
                		seriesData.push({name:obj.KEYNAME,type:'bar',stack: '总量',data:[
                           obj.total.indexOf(',')>-1?obj.total.replace(',',''):obj.total,
                           obj.jkbkrs.indexOf(',')>-1?obj.jkbkrs.replace(',',''):obj.jkbkrs,
                           obj.gzfss.indexOf(',')>-1?obj.gzfss.replace(',',''):obj.gzfss,
                           obj.jkbkrs.indexOf(',')>-1?obj.jkbkrs.replace(',',''):obj.jkbkrs,
                           obj.dtCount.indexOf(',')>-1?obj.dtCount.replace(',',''):obj.dtCount
                        ]});
                	}
                	//构建数据
                	$scope.pieOption = {
            		    tooltip : {
            		        trigger: 'item',
            		        formatter: "{a} <br/>{b} : {c} ({d}%)"
            		    },
            		    legend: {
            		        orient : 'vertical',
            		        x : 'left',
            		        data:['应急处置总数','困人总数','故障发生数量','解救人数','电梯总数']
            		    },
            		    toolbox: {
            		        show : true,
            		        feature : {
            		            mark : {show: true},
            		            dataView : {show: true, readOnly: false},
            		            magicType : {
            		                show: true, 
            		                type: ['pie', 'funnel'],
            		                option: {
            		                    funnel: {
            		                        x: '25%',
            		                        width: '50%',
            		                        funnelAlign: 'left',
            		                        max: 1548
            		                    }
            		                }
            		            },
            		            restore : {show: true},
            		            saveAsImage : {show: true}
            		        }
            		    },
            		    calculable : true,
            		    series :seriesData [
            		        {
            		            name:'数据概览',
            		            type:'pie',
            		            radius : '55%',
            		            center: ['50%', '60%'],
            		            data:seriesData
            		        }
            		    ]
                	};
                }
                
                $scope.bar = function(){
                	var dynameic = $('div[name=dynamic_div]');
                	var dynameic_bar = $('div[name=dynamic_div_bar]');
                	$('div[name=dynamic_div_pie]').hide();
                	dynameic.hide();
                	//初始化数据
                	//'应急处置总数','困人总数','故障发生数量','解救人数','电梯总数'
                	var legendData = [];
                	var seriesData = [];
                	for(var i=0;i<$scope.result.list.length;i++){
                		var obj = $scope.result.list[i];
                		legendData.push(obj.KEYNAME);
                		seriesData.push({name:obj.KEYNAME,type:'bar',stack: '总量',data:[
                           obj.total.indexOf(',')>-1?obj.total.replace(',',''):obj.total,
                           obj.jkbkrs.indexOf(',')>-1?obj.jkbkrs.replace(',',''):obj.jkbkrs,
                           obj.gzfss.indexOf(',')>-1?obj.gzfss.replace(',',''):obj.gzfss,
                           obj.jkbkrs.indexOf(',')>-1?obj.jkbkrs.replace(',',''):obj.jkbkrs,
                           obj.dtCount.indexOf(',')>-1?obj.dtCount.replace(',',''):obj.dtCount
                        ]});
                	}
                	
                	$scope.barConfig = {
                    		theme:'macarons',
             	            dataLoaded:true,
            	            event: [{click:function(params){
            	            	//write your code this hare
            	            }}]	
                    };
                	$scope.barOption = {
                    	    tooltip : {
                    	        trigger: 'axis'
                    	    },
                    	    legend: {
                    	        data:legendData
                    	    },
                    	    toolbox: {
                    	        show : true,
                    	        feature : {
                    	            dataView : {show: true, readOnly: false},
                    	            magicType : {show: true, type: ['line', 'bar']},
                    	            restore : {show: true},
                    	            saveAsImage : {show: true}
                    	        }
                    	    },
                    	    calculable : true,
                    	    xAxis : [
                    	        {
                    	            type : 'category',
                    	            data : ['应急处置总数','困人总数','故障发生数量','解救人数','电梯总数']
                    	        }
                    	    ],
                    	    yAxis : [
                    	        {
                    	            type : 'value'
                    	        }
                    	    ],
                    	    series : seriesData
                    };
                	//初始化数据
                	dynameic_bar.show();
                }
                $scope.table = function(){
                	var dynameic = $('div[name=dynamic_div]');
                	var dynameic_bar = $('div[name=dynamic_div_bar]');
                	dynameic_bar.hide();
                	dynameic.show();
                	$('div[name=dynamic_div_pie]').hide();
                }
                //************************************/
            }
        ]);
    };
});

/**
 * 监听窗口改变并且修改图表宽度
 * @author wys
 */
window.addEventListener('resize',function(){
	$.each($('canvas'),function(index,item){
		var parentWidth = $(item).parent().parent().width() - 10;
		$(item).parent().width(parentWidth);
		$(item).width(parentWidth);
	});
},false);
