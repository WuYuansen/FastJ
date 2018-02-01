/**
 * 扩展实现下拉树结构
 * @author wys
 */
Ext.define('wys.plugs.ComboTree',{
	extend: 'Ext.form.field.Picker',
    xtype: 'comboTree',
    uses: [
        'Ext.tree.Panel'
    ],
    rootVisible:false,
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    config: {
        store: null,
        displayField: null,
        columns: null,
        selectOnTab: true,
        maxPickerHeight: 600,
        minPickerHeight: 300,
        autoScroll:true
    },
    editable: false,
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.mon(me.store, {
            scope: me,
            load: me.onLoad,
            update: me.onUpdate
        });
    },
    createPicker: function() {
        var me = this,
            picker = new Ext.tree.Panel({
                shrinkWrapDock: 2,
                store: me.store,
                rootVisible:false,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                autoWidth : true,
                minWidth : 400,
                border : true,
                maxHeight: me.maxPickerHeight,
                manageHeight: false,
                autoScroll : me.autoScroll,
                shadow: false,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick
                },
                viewConfig: {
                    listeners: {
                        scope: me,
                        render: me.onViewRender
                    }
                }
            }),
            view = picker.getView();
        if (Ext.isIE9 && Ext.isStrict) {
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },
    onViewRender: function(view){
        view.getEl().on('keypress', this.onPickerKeypress, this);
    },
    repaintPickerView: function() {
        var style = this.picker.getView().getEl().dom.style;
        style.display = style.display;
    },
    onItemClick: function(view, record, node, rowIndex, e) {
        this.selectItem(record);
    },
    onPickerKeypress: function(e, el) {
        var key = e.getKey();

        if(key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(this.picker.getSelectionModel().getSelection()[0]);
        }
    },
    selectItem: function(record) {
        var me = this;
        me.setValue(record.getId());
        me.fireEvent('select', me, record);
        me.collapse();
    },
    onExpand: function() {
        var me = this,
            picker = me.picker,
            store = picker.store,
            value = me.value,
            node;
        if (value) {
            node = store.getNodeById(value);
        }
        if (!node) {
            node = store.getRoot();
        }
        picker.selectPath(node.getPath());
    },
    setValue: function(value) {
        var me = this,
            record;
        me.value = value;
        if (me.store.loading) {
            return me;
        }
        record = value ? me.store.getNodeById(value) : me.store.getRoot();
        if (value === undefined) {
            record = me.store.getRoot();
            try{me.value = record.getId();}catch(e){}
        } else {
            record = me.store.getNodeById(value);
        }
        me.setRawValue(record ? record.get(me.displayField) : '');
        return me;
    },
    getSubmitValue: function(){
        return this.value;    
    },
    getValue: function() {
        return this.value;
    },
    onLoad: function() {
        var value = this.value;

        if (value) {
            this.setValue(value);
        }
    },
    onUpdate: function(store, rec, type, modifiedFieldNames){
        var display = this.displayField;
        
        if (type === 'edit' && modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, display) && this.value === rec.getId()) {
            this.setRawValue(rec.get(display));
        }
    }
});