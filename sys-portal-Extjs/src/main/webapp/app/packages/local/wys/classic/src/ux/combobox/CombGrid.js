/**
 *
 * <p> Title:CombGrid.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/ux/combobox)</p>
 * <p> Description:  下拉Gridpanel</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.ux.combobox.CombGrid',{
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.combgrid',
	multiSelect : false,	//多选
	editable:false,
	gridWidth : 650,
	gridHeight: 300,
	isCheckBox : true,	//是否复选框
	searchItems :[],	//查询列,不用给查询按钮
	createPicker : function() { 
		var me = this;
		var picker = Ext.create('wys.basic.BaseView', {
			store : me.store,
			frame : true,
			resizable : true,
			columns : me.columns,
			selModel : me.isCheckBox ? Ext.create("Ext.selection.CheckboxModel", {
				mode : me.multiSelect ? 'SIMPLE' : 'SINGLE'
			}): {  
                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
            },
			floating : true,
			hidden : true,
			viewConfig:{emptyText:'<div style="text-align:center">没有找到相关记录<div>'},
			width : me.gridWidth,
			height:me.gridHeight,
			columnLines : false,
			focusOnToFront : false
		});
		if(!Ext.isEmpty(me.title)){
			picker.setTitle(me.title);
		}
		if(me.paging){	//是否分页
			picker.addDocked(Ext.create('Ext.PagingToolbar', {
	            store: me.store,
	            dock : "bottom"
	        }));
		}
		if(me.searchItems){
			me.searchItems_temp = []; //清空
			if(typeof me.searchItems != 'object'){
				util.err('查询列类型为Array');
				return;
			}
			me.searchItems_temp.push(me.searchItems[0]);
			
			var searchItem={xtype : 'searchBtn',handler:function(btn){
				var store = picker.getStore();
				store.proxy.extraParams = btn.up('toolbar').down('baseForm')==null?{}:btn.up('toolbar').down('baseForm').getValues();
		        store.currentPage = 1;
				store.reload();
			}};
			if(Ext.Array.indexOf(me.searchItems_temp,searchItem) === -1){ //如果数组中存在了查询组件则不需要再次push
				me.searchItems_temp.push(searchItem);
			} 
			picker.addDocked(
				{
					xtype : 'toolbar',
		            items : me.searchItems_temp,
		            dock : "top"
		        }
			);
		}
		if(me.isBeforeLoad){ //如果为真则初始加载数据一次
			var store =	picker.getStore();
			var form = picker.down('toolbar').down("baseForm");
			store.proxy.extraParams = form === null?{}:form.getValues();
	        store.currentPage = 1;
			store.load();
		}
		me.mon(picker, {		//添加事件
			itemclick : me.onItemClick,
			refresh : function(){},
			scope : me
		});
		me.mon(picker.getSelectionModel(), {
			beforeselect : function(v){},
			beforedeselect : function(v){},
			selectionchange : me.onListSelectionChange,
			scope : me
		});
		this.picker = picker;
		return picker;
	},

	onItemClick : function(picker, record) {
		var me = this, selection = me.picker.getSelectionModel().getSelection(), valueField = me.valueField;
		if (!me.multiSelect && selection.length) {	//多选
			record.get(valueField), selection[0].get(valueField)
			if (record.get(valueField) === selection[0].get(valueField)) {
				me.displayTplData = [record.data];
				me.setRawValue(me.getDisplayValue());
				me.collapse();
			}
		}else{	//多选暂不实现
		}
	},

	matchFieldWidth : false,

	onListSelectionChange : function(list, selectedRecords) {
		var me = this, isMulti = me.multiSelect, hasRecords = selectedRecords.length > 0;
		if (!me.ignoreSelection && me.isExpanded) {
			if (!isMulti) {
				Ext.defer(me.collapse, 1, me);
			}
			if (isMulti || hasRecords) {
				me.setValue(selectedRecords, false);
			}
			if (hasRecords) {
				me.fireEvent('select', me, selectedRecords);
			}
//			if(!Ext.isEmpty(me.getItem)){
//				for(var m=0;m<me.getItem.length;m++){
//					var fi = me.next('[itemId=' + me.getItem[m] + ']');
//					var vi = [];
//					for(var i=0;i<selectedRecords.length;i++){
//						vi.push(selectedRecords[i].get(fi.nextName) + '');
//					}
//					fi.setValue(vi.join(','));
//				}
//			}
//			if(!Ext.isEmpty(me.parentVar)){
//				window[me.parentVar] = selectedRecords;
//			}
//			me.inputEl.focus();
		}
	},

	doAutoSelect : function() {
		var me = this, picker = me.picker, lastSelected, itemNode;
		if (picker && me.autoSelect && me.store.getCount() > 0) {
			lastSelected = picker.getSelectionModel().lastSelected;
			itemNode = picker.view.getNode(lastSelected || 0);
			var records = [];
			if(!Ext.isEmpty(me.getValue())){
				for(var j=0;j<me.getValue().length;j++){
					var record = me.store.findRecord('bizCode',me.getValue()[j]);
					records.push(record);
				}
			}
			//系统存值改为bizCode后可将此展开
//			picker.getSelectionModel().select(records);
			if (itemNode) {
				picker.view.highlightItem(itemNode);
				picker.view.el.scrollChildIntoView(itemNode, false);
			}
		}
	},
	onChange: function(a,b,c,d){
		var me = this;
		me.setValue(a);
	}
});