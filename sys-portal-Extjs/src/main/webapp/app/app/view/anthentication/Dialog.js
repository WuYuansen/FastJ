/**
 *
 */
Ext.define('app.view.anthentication.Dialog',{
	extend: 'Ext.form.Panel',
    xtype: 'authdialog',
    requires: [
        'app.view.anthentication.AuthenticationCtrl',
        'Ext.form.Panel'
    ],
    controller: 'authentication',
    viewModel: {
        type: 'authentication'
    },
    style : {
        background:'#75b9e6',
        borderRadius:'4px'
    },
    defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',
    autoComplete : false,
    initComponent: function () {
        var me = this, listen;
        if (me.autoComplete) {
            me.autoEl = Ext.apply(
                me.autoEl || {},
                {
                    tag: 'form',
                    name: 'authdialog',
                    method: 'post'
                });
        }
        me.addCls('auth-dialog');
        me.callParent();
        if (me.autoComplete) {
            listen = {
                afterrender : 'doAutoComplete',
                scope : me,
                single : true
            };
            Ext.each(me.query('textfield'), function (field) {
                field.on(listen);
            });
        }
    },
    doAutoComplete : function(target) {
        if (target.inputEl && target.autoComplete !== false) {
            target.inputEl.set({ autocomplete: 'on' });
        }
    }
});