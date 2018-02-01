/**
 * 查询详细信息表单
 */
Ext.define('wys.plugs.MyFormLayout',{
	extend : 'Ext.form.Panel',
	xtype : 'myFormLayout',
	singlton : true, //标注为单例组件
	requires : [
        'Ext.container.Container'
    ],
    baseColumn:'',
    baseColumnField:[],
    otherSplitName:'',
    otherContainerColumn : '',
    otherContainerColumnField : [],
    constructor : function(baseColumn,baseColumnField,otherSplitName,otherContainerColumn,otherContainerColumnField){ // 实例化参数
    	this.baseColumn = baseColumn;
    	this.baseColumnField = baseColumnField;
    	this.otherSplitName = otherSplitName;
    	this.otherContainerColumn = otherContainerColumn;
    	this.otherContainerColumnField = otherContainerColumnField;
    },
    buildBaseComponent : function(){
    	var base_container = {xtype: 'container',anchor: '100%',layout: 'hbox',items : []};
    },
    buildOtherComponent : function(){
    }
});