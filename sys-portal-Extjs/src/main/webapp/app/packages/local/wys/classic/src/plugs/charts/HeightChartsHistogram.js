/**
 * 柱状图 <br>
 * 
 * @author wys
 */
Ext.define('wys.plugs.charts.HeightChartsHistogram', {
	extend : 'Ext.panel.Panel',
	xtype : 'charts_histogram',
	panelTitle : null,
	chartTitle : null,
	requires : [ 'Ext.panel.Panel' ],
	highchart : null,
	plotOptions: {
        column: {
            depth: 0
        }
    },
	chartColumn : [], //列头
	chartData : [],//数据
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
	            renderTo: chartId,
	            type: 'column',
	            margin: 75,
	            options3d: {
	                enabled: true,
	                alpha: 0,
	                beta: 15,
	                depth: 0,
	                viewDistance: 25
	            }
	        },
	        yAxis: {
                title: {
                    text: '单位（台）'
                }
	        },
	        title: {
	        	text: me.chartTitle
	        },
	        plotOptions: me.plotOptions,
	        xAxis: {
                categories: me.chartColumn
            },
            series: me.chartData
        });
	}
});