/**
 *
 * <p> Title:AreaColumn.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/grid/column)</p>
 * <p> Description:  显示区域列</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.grid.column.AreaColumn',{
	extend : 'Ext.grid.column.Column',
	requires : ['wys.form.field.CityPicker'],
	alias: 'widget.areacolumn',
    constructor: function() {
        this.scope = this;
        this.callParent(arguments);
    },
    initComponent: function(){
        var me = this;
        me.callParent(arguments);
    },
    defaultRenderer: function(value) {
    	var me = this;
    	//创建一个空的城市选择器 
    	var returnCityChoseTxt = "";
    	Ext.create('wys.form.field.CityPicker',{
    		valueField: 'city',
            displayField: 'cityText'
    	}).getViewModel().getData().pickerCities.getData().each(function(g,e){
    		var tempData = g.data;
    		if(tempData.province.toString() === value || tempData.city.toString() === value){
    			returnCityChoseTxt = tempData.cityText;
    			return true;
    		}
		})
        return returnCityChoseTxt;
    },
    updater: function(cell, value) {
    	//这里是修改时触发的事件
        Ext.fly(cell).down(this.getView().innerSelector, true).innerHTML = Ext.grid.column.Number.prototype.defaultRenderer.call(this, value);
    }
});