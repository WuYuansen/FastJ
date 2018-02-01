Ext.define('app.view.anthentication.Register', {
    extend : 'app.view.anthentication.LockingWindow',
    xtype: 'register',
    requires: [
        'app.view.anthentication.Dialog',
        'wys.form.field.CityPicker',
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
            width: 455,
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
                selectOnFocus : true,
                labelAlign: 'right',
                fieldStyle:'font-size:16px',
                labelStyle:'font-size:16px',
                labelWidth: 120
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    style :{
                        fontSize: '22px',
                        color:'#399'
                    },
                    text: '企业用户注册'
                },
                {
                    xtype : 'textfield',
                    fieldLabel : '企业名称',
                    allowBlank : false,
                    regex : /^[\s\S]{6,50}$/,
                    regexText : '企业名称长度不能小于6个字符并且不能超过50个字符',
                    afterLabelTextTpl:required,
                    name : 'enterName',
                    emptyText:'企业名称'
                },
                {
                    xtype : 'textfield',
                    allowBlank : false,
                    afterLabelTextTpl:required,
                    name : 'zzjgdm',
                    regex : /^[\s\S]{6,18}$/,
                    regexText : '统一社会信用代码不能小于6个字符并且长度不能超过18个字符',
                    fieldLabel:'社会信用代码',//'组织机构代码',
                    emptyText:'统一社会信用代码',
                    invalidText:'该统一社会信用代码已经被注册'/*,
                    validator : function(){
                        util.ajax({
                            url : constants.url.registerRepetition,
                            params : {
                                type : 2,
                                value : this.getValue()
                            },
                            ok : function(result){
                                return !result.success;
                            }
                        });
                    }*/
                },
                {
                    xtype : 'container',
                    layout : 'hbox',
                    anchor:'100%',
                    flex:1,
                    defaults : {
                        margin: '10 0',
                        selectOnFocus : true,
                        labelAlign: 'right',
                        fieldStyle:'font-size:16px',
                        labelStyle:'font-size:16px',
                        labelWidth: 120
                    },
                    items : [
                        {
                        	name:'areaCode_temp',
                        	afterLabelTextTpl:required,
                        	allowBlank:true,
                        	xtype : 'cityPicker',
                        	fieldLabel : '所在地区',
                        	hidden:true,
                        	valueField: 'city',displayField: 'cityText',emptyText:'所在地区',
     		       			listConfig  : {
     		       				minWidth:300,
     		       				maxWidth:600,
     		       				emptyText:WY.local.lang.common.system_msg.notFoundData
 		       				}
     					},
     					{
                        	name:'areaCode',
                        	afterLabelTextTpl:required,
                        	allowBlank:false,
                        	xtype : 'cityPicker',
                        	fieldLabel : '所在地区',
                        	valueField: 'city',displayField: 'cityText',emptyText:'所在地区',
     		       			listConfig  : {
     		       				minWidth:300,
     		       				maxWidth:600,
     		       				emptyText:WY.local.lang.common.system_msg.notFoundData
 		       				}
     					}
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    flex:1,
                    defaults : {
                        margin: '10 0',
                        selectOnFocus : true,
                        labelAlign: 'right',
                        fieldStyle:'font-size:16px',
                        labelStyle:'font-size:16px',
                        labelWidth: 120
                    },
                    anchor:'100%',
                    items : [
                        {xtype :'ArrayCombobox',arrayData:[['一级',1],['二级',2],['三级',3],['无级别',0]],
                        	fieldLabel : '资质等级',
                            name : 'zzdj',
                            width : 414,
                            emptyText:'现有资质等级(无资质企业请选择“无级别”)'
                        }
                    ]
                },
                {
                    xtype : 'textfield',
                    allowBlank : false,
                    afterLabelTextTpl:required,
                    fieldLabel:'用户名',
                    regex : /^[\s\S]{6,18}$/,
                    regexText : '用户名长度不能小于6个字符并且不能超过18个字符',
                    name : 'tyshyydm',
                    emptyText:'请输入登录名',
                    invalidText:'该用户名已经被注册'/*,
                    validator : function(){
                        util.ajax({
                            url : constants.url.registerRepetition,
                            params : {
                                type : 1,
                                value : this.getValue()
                            },
                            ok : function(result){
                                return !result.success;
                            }
                        });
                    }*/
                },
                {
                    xtype : 'textfield',
                    allowBlank : false,
                    afterLabelTextTpl:required,
                    regex : /^[\s\S]{6,20}$/,
                    id : 'password',
                    name : 'password',
                    regexText : '密码长度不能超过20个字符',
                    inputType : 'password',
                    fieldLabel : '登录密码',
                    emptyText:'设置登录密码'
                },
                {
                    xtype : 'textfield',
                    allowBlank : false,
                    afterLabelTextTpl:required,
                    name : 'comfirmPassword',
                    regex : /^[\s\S]{6,20}$/,
                    regexText : '密码长度不能超过20个字符',
                    inputType : 'password',
                    fieldLabel : '确认密码',
                    emptyText:'再次输入密码',
                    vtype: 'repetition',
                    repetition: { targetCmpId: 'password' }
                },{
                    xtype:'container',
                    style : 'align:center',
                    layout:'hbox',
                    items : [
                        {xtype :'button',width:200,ui : 'button-textbtn-toolbar',disabled:true},
                        {
                            xtype: 'button',
                            scale: 'large',
                            ui: 'soft-green',
                            formBind: true,
                            reference: 'submitButton',
                            bind: false,
                            margin: '5 0',
                            text: '提交注册信息',
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
                                this.up('lockingwindow').close();
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
