/**
 * 柱状图 <br>
 * 
 * @author wys
 */
Ext.define('wys.plugs.charts.HeightChartsPie', {
	extend : 'Ext.panel.Panel',
	panelTitle : null,
	xtype : 'charts_pie',
	chartTitle : null,
	requires : [ 'Ext.panel.Panel' ],
	highchart : null,
	chartColumn : [], //列头
	chartData : [],//数据
	units : '', //单位
	initComponent: function() {
		var init_self = this;
		if(init_self.panelTitle){
			init_self.title = init_self.panelTitle;
		}
		init_self.border = 1;
		this.callParent(arguments);
	},
	afterComponentLayout: function(width, height, oldWidth, oldHeight) {
		var me = this;
		var chartId = me.id + "-body";
		me.highchart =  new Highcharts.Chart({
			credits: {
            	text: constants.tip.sysName,
            	href: constants.tip.sysURL
        	},
        	colors: constants.chartsColor,
        	chart: {
        		renderTo : chartId,
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
	        title: {
	        	text: me.chartTitle
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                depth: 35,
	                dataLabels: {
	                    enabled: true,
	                    format: '{point.name} <br/> {point.y}台'
	                }
	            }
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
            series: me.chartData
        });
	}
});