Ext.define('app.view.anthentication.SearchRegProgressResult', {
    extend : 'app.view.anthentication.LockingWindow',
    xtype: 'registerProgressResult',
    requires: [
        'app.view.anthentication.Dialog',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Text'
    ],

    lain: true,
    header: false,
    border: false,
    closable: false,
    draggable: false,
    frame:false,
    defaultFocus: 'authdialog',
    items: [
        {xtype : 'panel',margin:'8px 0px 0px 0px',items:[
            {xtype : 'dataview-progress',bind: { store: '{registerProgress}' }}
        ]},
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 541,
            reference : 'authDialog',
            defaultButton : 'submitButton',
            autoComplete: false,
            cls: 'auth-dialog-register',
            defaults : {
                margin: '10 0',
                selectOnFocus : true
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    style :{
                        fontSize: '22px',
                        color:'#399'
                    },
                    text: '注册进度查询结果'
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items : [
                        {
                            xtype : 'button',
                            margin : 25,
                            ui : 'button-textbtn-toolbar',
                            text : '返回',
                            handler : function(btn){
                                this.up('lockingwindow').close();
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
