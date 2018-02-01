Ext.define('app.view.anthentication.SearchRegProgress', {
    extend : 'app.view.anthentication.LockingWindow',
    xtype: 'registerProgress',
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
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 455,
            reference : 'authDialog',
            defaultButton : 'submitButton',
            autoComplete: true,
            cls: 'auth-dialog-register',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
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
                    text: '注册进度查询'
                },
                {
                    xtype : 'textfield',
                    allowBlank : false,
                    emptyText:'企业名称'
                },
                {
                    xtype : 'textfield',
                    allowBlank : false,
                    emptyText:'统一社会信用代码&组织机构代码'
                }
                ,{
                    xtype:'container',
                    layout:'hbox',
                    items : [
                        {
                            xtype: 'button',
                            scale: 'large',
                            scale: 'large',
                            ui: 'soft-green',
                            formBind: true,
                            reference: 'submitButton',
                            bind: false,
                            margin: '5 0',
                            text: '查询进度',
                            listeners: {
                                click: 'onSearchProgressClick'
                            }
                        },
                        {
                            xtype : 'button',
                            margin : 25,
                            ui : 'button-textbtn-toolbar',
                            text : '返回登录',
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
