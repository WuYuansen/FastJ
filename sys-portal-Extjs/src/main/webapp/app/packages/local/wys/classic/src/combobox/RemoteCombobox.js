/**
 * <p>功能:接受远程参数，创建ComboBox对象。 <p>
 * @class app.util.RemoteCombobox
 * @extends Ext.form.ComboBox
 * @author wys
 */
Ext.define('wys.combobox.RemoteCombobox',{
	extend : 'Ext.form.ComboBox',
	requires : ['Ext.form.ComboBox','Ext.data.Store'],
	alias : 'widget.RemoteCombobox', //别名
	fieldLabel : '',
	name : '',
	model : '',
	valueField : '',
	displayField : '',
	proxy_url : '',
	proxy_reader_root : '',
	storeListeners : {}, //数据加载监听
	emptyText:'请选择...',
	isAll : false,
	loadMasRecord : false, //加载最大
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
		this.emptyText = this.emptyText || '请选择';
		this.valueField = this.valueField;
		this.displayField = this.displayField;
		this.triggerAction = 'all';
		this.lazyRender = true;
//		this.selectOnFocus = true;
		this.name = this.name;
		this.listConfig  = {minWidth:160,emptyText:WY.local.lang.common.system_msg.notFoundData};
		this.queryMode = 'local';
		this.editable = false;
		this.fieldLabel = this.fieldLabel;
		this.rootVisible = false;
		this.params = {};
		if(this.loadMasRecord){
			this.params.limit = 9999; 
		}
		this.store = Ext.create('Ext.data.Store',{
			autoLoad : true,
			model : this.model,
			proxy : {
				type : 'ajax',
				url : this.proxy_url,
				extraParams : this.params,
				reader : {
					type : 'json',
					rootProperty : this.proxy_reader_root
				}
			}
		});
		this.callParent();
	}
},function(){});