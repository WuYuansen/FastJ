/**
 *
 * <p> Title:SearchCombo.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/classic/src/form/field)</p>
 * <p> Description:  带有查询输入框的下拉框</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.SearchCombo',{
	extend : 'Ext.form.field.ComboBox',
	requiers : ['Ext.grid.Panel'],
    alternateClassName: 'Ext.form.SearchComboBox',
    alias: ['widget.searchComboBox', 'widget.searchCombo'],
    createPicker : function() { 
		var me = this;
		var picker = Ext.create('Ext.grid.Panel', {
			store : me.store,
			frame : true,
			autoWidth:true,
			resizable : true,
			columns : [
				{text:'名称',minWidth : me.getWidth(),flex:1,dataIndex:me.displayField}
            ],
            floating : true,
			hidden : true,
			autoScroll:true,
			maxHeight : 400,
			viewConfig:{emptyText:'<div style="text-align:center">没有找到相关记录<div>'},
			focusOnToFront : false
		});
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
		picker.addDocked(
			{
				xtype : 'toolbar',
	            items : [{text:'13131',xtype : 'button'}],
	            dock : "top"
	        }
		);
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