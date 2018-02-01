Ext.define('wys.plugs.RowEditing',{
	extend: 'Ext.grid.plugin.Editing',
    alias: 'plugin.rowEditing',
    requires: [
        'Ext.grid.RowEditor'
    ],
    lockableScope: 'top',
    editStyle: 'row',
    autoCancel: true,
    errorSummary: true,
    constructor: function() {
        var me = this;
        me.callParent(arguments);
        if (!me.clicksToMoveEditor) {
            me.clicksToMoveEditor = me.clicksToEdit;
        }
        me.autoCancel = !!me.autoCancel;
    },
    init: function(grid) {
        this.callParent([grid]);
        if (grid.lockedGrid) {
            grid.lockedGrid.registerActionable(this);
            grid.normalGrid.registerActionable(this);
        } else {
            grid.registerActionable(this);
        }
    },
    destroy: function() {
        Ext.destroy(this.editor);
        this.callParent();
    },
    onBeforeReconfigure: function() {
        this.callParent(arguments);
        this.cancelEdit();
    },
    onReconfigure: function(grid, store, columns) {
        var ed = this.editor;
        this.callParent(arguments);
        if (columns && ed && ed.rendered) {
            ed.needsSyncFieldWidths = true;
        }
    },
    shouldStartEdit: function(editor) {
        return true;
    },
    startEdit: function(record, columnHeader) {
        var me = this,
            editor = me.getEditor(),
            context;
        if (Ext.isEmpty(columnHeader)) {
            columnHeader = me.grid.getTopLevelVisibleColumnManager().getHeaderAtIndex(0);
        }
        if (editor.beforeEdit() !== false) {
            context = me.getEditingContext(record, columnHeader);
            if (context && me.beforeEdit(context) !== false && me.fireEvent('beforeedit', me, context) !== false && !context.cancel) {
                me.context = context;
                if (me.lockingPartner) {
                    me.lockingPartner.cancelEdit();
                }
                editor.startEdit(context.record, context.column, context);
                me.editing = true;
                return true;
            }
        }
        return false;
    },
    activateCell: function(pos) {
        if (!pos.getCell().query('[tabIndex="-1"]').length) {
            this.startEdit(pos.record, pos.column);
            return true ;
        }
    },
    onEnterKey: function(e) {
        var me = this,
            targetComponent;
        if (!me.grid.ownerGrid.actionableMode && me.editing) {
            targetComponent = Ext.getCmp(e.getTarget().getAttribute('componentId'));
            if (!(targetComponent && targetComponent.isPickerField && targetComponent.isExpanded)) {
                me.completeEdit();
            }
        }
    },
    cancelEdit: function() {
        var me = this;
        if (me.editing) {
            me.getContextFieldValues();
            me.getEditor().cancelEdit();
            me.callParent(arguments);
            return;
        }
        return true;
    },
    completeEdit: function() {
        var me = this,
            context = me.context;
        if (me.editing && me.validateEdit(context)) {
            me.editing = false;
            me.fireEvent('edit', me, context);
        }
    },
    validateEdit: function() {
        this.getContextFieldValues();
        return this.callParent(arguments) && this.getEditor().completeEdit();
    },
    getEditor: function() {
        var me = this;
        if (!me.editor) {
            me.editor = me.initEditor();
        }
        return me.editor;
    },
    getContextFieldValues: function () {
        var editor         = this.editor,
            context        = this.context,
            record         = context.record,
            newValues      = {},
            originalValues = {},
            editors        = editor.query('>[isFormField]'),
            len            = editors.length,
            i, name, item;
        for (i = 0; i < len; i++) {
            item = editors[i];
            name = item.dataIndex;

            newValues[name]      = item.getValue();
            originalValues[name] = record.get(name);
        }
        Ext.apply(context, {
            newValues      : newValues,
            originalValues : originalValues
        });
    },
    initEditor: function() {
        return new Ext.grid.RowEditor(this.initEditorConfig());
    },
    initEditorConfig: function(){
        var me       = this,
            grid     = me.grid,
            view     = me.view,
            headerCt = grid.headerCt,
            btns     = ['saveBtnText', 'cancelBtnText', 'errorsText', 'dirtyText'],
            b,
            bLen     = btns.length,
            cfg      = {
                autoCancel: me.autoCancel,
                errorSummary: me.errorSummary,
                fields: headerCt.getGridColumns(),
                hidden: true,
                view: view,
                editingPlugin: me
            },
            item;
        for (b = 0; b < bLen; b++) {
            item = btns[b];

            if (Ext.isDefined(me[item])) {
                cfg[item] = me[item];
            }
        }
        return cfg;    
    },
    initEditTriggers: function() {
        var me = this,
            view = me.view,
            moveEditorEvent = me.clicksToMoveEditor === 1 ? 'click' : 'dblclick';
        me.callParent(arguments);
        if (me.clicksToMoveEditor !== me.clicksToEdit) {
            me.mon(view, 'cell' + moveEditorEvent, me.moveEditorByClick, me);
        }
        view.on({
            render: function() {
                me.mon(me.grid.headerCt, {
                    scope: me,
                    columnresize: me.onColumnResize,
                    columnhide: me.onColumnHide,
                    columnshow: me.onColumnShow
                });
            },
            single: true
        });
    },
    moveEditorByClick: function() {
        var me = this;
        if (me.editing) {
            me.superclass.onCellClick.apply(me, arguments);
        }
    },
    onColumnAdd: function(ct, column) {
        if (column.isHeader) {
            var me = this,
                editor;
            me.initFieldAccessors(column);
            editor = me.editor;
            if (editor) {
                editor.onColumnAdd(column);
            }
        }
    },
    beforeGridHeaderDestroy: function(headerCt) {
        var columns = this.grid.getColumnManager().getColumns(),
            len = columns.length,
            i,
            column,
            field;
        for (i = 0; i < len; i++) {
            column = columns[i];
            if (column.hasEditor) {
                if (column.hasEditor() && (field = column.getEditor())) {
                    field.destroy();
                }
                this.removeFieldAccessors(column);
            }
        }
    },
    onColumnResize: function(ct, column, width) {
        if (column.isHeader) {
            var me = this,
                editor = me.getEditor();
            if (editor) {
                editor.onColumnResize(column, width);
            }
        }
    },
    onColumnHide: function(ct, column) {
        var me = this,
            editor = me.getEditor();
        if (editor) {
            editor.onColumnHide(column);
        }
    },
    onColumnShow: function(ct, column) {
        var me = this,
            editor = me.getEditor();
        if (editor) {
            editor.onColumnShow(column);
        }
    },
    onColumnMove: function(ct, column, fromIdx, toIdx) {
        var me = this,
            editor = me.getEditor();
        me.initFieldAccessors(column);
        if (editor) {
            editor.onColumnMove(column, fromIdx, toIdx);
        }
    },
    setColumnField: function(column, field) {
        var me = this,
            editor = me.getEditor();
        if (editor) {
            editor.destroyColumnEditor(column);
        }
        me.callParent(arguments);
        if (editor) {
            editor.insertColumnEditor(column);
        }
    },
    createColumnField: function(column, defaultField) {
        var editor = this.editor,
            def;
        if (editor) {
            def = editor.getDefaultFieldCfg();
        }
        return this.callParent([column, defaultField || def]);
    }
});