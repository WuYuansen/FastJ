/**
 * <p>功能:接受数组型参数，创建ComboBox对象。 <p>
 * @class com.gtjy.framework.ux.ArrayCombobox
 * @extends Ext.form.ComboBox
 * @author wys
 */
Ext.define('wys.combobox.ArrayCombobox',{
	extend : 'Ext.form.ComboBox',
	requires : ['Ext.form.ComboBox','Ext.data.ArrayStore'],
	alias : 'widget.ArrayCombobox', //别名
	arrayData : [],// 用户传入的数组
	cmbFields : ['key', 'value'],
	displayField:'key',
	emptyText:'请选择...',
	valueField:'value',
	isAll : false,
	listeners : {
		expand : function(field,eOpts){
			if(this.isAll){
				field.getStore().insert(0,new Ext.data.Record({
					'key' : '全部',
					'value' : ""
				}));
			}
		},
		collapse : function(field,o0pts){
			if(this.isAll){
				field.getStore().removeAt(0);
			}
		}
	},
	initComponent : function() {
		this.displayField = this.displayField,
		this.valueField = this.valueField,
		this.editable = false,
		this.listConfig  = {minWidth:160,emptyText:WY.local.lang.common.system_msg.notFoundData};
		this.queryMode='local',
		this.store = Ext.create('Ext.data.ArrayStore',{
			fields : this.cmbFields,
			data : this.arrayData
		});
		this.callParent(arguments);
	},
	setArrayData : function(args){
		var store = this.getStore();
		store.loadData(args);
	}
},function(){});