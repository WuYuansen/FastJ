Ext.define('app.view.anthentication.ForgotPassword', {
    extend : 'app.view.anthentication.LockingWindow',
    xtype: 'forgotPassword',
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
                    text: '找回密码'
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
                },
                {
                    xtype : 'textfield',
                    allowBlank : false,
                    emptyText:'请输入您最近登陆系统时使用过的密码'
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
                            text: '找回密码',
                            listeners: {
                                click: 'onSignupClick'
                            }
                        },
                        {
                            xtype : 'button',
                            margin : 25,
                            ui : 'button-textbtn-toolbar',
                            text : '返回登录',
                            handler : function(btn){
                                Ext.ComponentQuery.query('login')[0].show();
                                this.up('lockingwindow').close();
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
