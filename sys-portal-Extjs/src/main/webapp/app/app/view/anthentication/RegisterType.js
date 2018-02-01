Ext.define('app.view.anthentication.RegisterType', {
    extend : 'app.view.anthentication.LockingWindow',
    xtype: 'registerType',
    requires: [
        'app.view.anthentication.Dialog',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text'
    ],
    lain: true,
    header: false,
    border: false,
    closable: false,
    draggable: false,
    frame:false,
    defaultFocus: 'authdialog',
    items: [{
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 416,
            reference : 'authDialog',
            defaultButton : 'submitButton',
            autoComplete: false,
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
                    text: '用户注册类型'
                },
                {
                    xtype:'container',
                    layout:'vbox',
                    items : [
                        {text:'物业企业注册',width:375,xtype:'button',scale: 'large',iconAlign: 'right',
                            iconCls: 'x-fa fa-user-plus', ui: 'soft-green',
                            listeners: {click: 'onNewAccount'}
                        },
                        {text:'社区注册用户',width:375,xtype :'button',scale:'large',iconAlign:'right',iconCls:'x-fa',margin : '10 0 0 0',
                        	handler : function(){
                        		util.info('此功能暂未开放,敬请期待！！！');
                        	}
                        }/*,

                        {text:'注册状态查询',width:375,xtype : 'button',scale:'large',iconAlign:'right',margin : '10 0 0 0',
                            iconCls : 'x-fa fa-eye' ,ui :'soft-green',listeners : {click:'registerProgress'}
                        }*/
                    ]
                },{
                    xtype:'container',
                    layout:'hbox',
                    items : [
                        {xtype :'button',width:270,ui : 'button-textbtn-toolbar',disabled:true},
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
