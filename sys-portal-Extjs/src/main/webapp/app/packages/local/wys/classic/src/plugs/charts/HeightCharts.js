/**
 * 将HeightCharts集成到Extjs中 <br>
 * 通过定义一个 highchart 变量来保存 highchart 句柄，同时设定 highchart 中 renderTo 为 extjs panel 中的 body 元素。
 * @author wys
 */
Ext.define('wys.plugs.charts.HeightCharts', {
	extend : 'Ext.panel.Panel',
	xtype : 'charts',
	panelTitle : null,
	chartTitle : null,
	requires : [ 'Ext.panel.Panel' ],
	highchart : null,
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
            chart: {
                renderTo: chartId,
                animation: false
            },
            title: {
                text: me.chartTitle
            },
            credits: {
            	text: constants.tip.sysName,
            	href: constants.tip.sysURL
        	},
        	colors: constants.chartsColor,
            xAxis: {
                categories: me.chartColumn
            },
            yAxis: {
                title: {
                    text: ''/*温度 (°C)*/
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''/*°C*/
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: me.chartData
        });
	}
});