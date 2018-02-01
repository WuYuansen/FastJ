Ext.apply(Ext.form.VTypes, {  
     repetition: function(val, field) {     //返回true，则验证通过，否则验证失败  
         if (field.repetition) { 
        	 //如果表单有使用repetition配置，repetition配置是一个JSON对象，该对象提供了一个名为targetCmpId的字段，该字段指定了需要进行比较的另一个组件ID。  
             var cmp = Ext.ComponentQuery.query('textfield[name='+field.repetition.targetCmpId+']')[0]; //Ext.getCmp(field.repetition.password);   //通过targetCmpId的字段查找组件  
             if (Ext.isEmpty(cmp)) {      //如果组件（表单）不存在，提示错误  
                 Ext.MessageBox.show({  
                     title: '错误',  
                     msg: '发生异常错误，指定的组件未找到',  
                     icon: Ext.Msg.ERROR,  
                     buttons: Ext.Msg.OK  
                 });  
                 return false;  
             }  
             if (val === cmp.getValue()) {  //取得目标组件（表单）的值，与宿主表单的值进行比较。  
                 return true;  
             } else {  
                 return false;  
             }  
         }  
     },  
     repetitionText: '两次输入的密码不一样'  
 })  ,
Ext.define('app.view.sys.UserForm',{
	extend : 'wys.basic.BaseForm',
	alias: 'widget.userform',
	requires : [
	    	    'Ext.button.Button',
	    	    'Ext.form.field.Text'
	        ],
	        layout: {
	            type:'vbox',
	            align:'stretch'
	        },
	        bodyPadding: 10,
	        scrollable: true,
	        defaultType: 'textfield',
	        defaults: {
	            labelWidth: 60,
	            labelSeparator: ':'
	        },
	        items : [
	                 {
	                	 xtype: 'container',
	                     anchor: '100%',
	                     layout: 'hbox',
	                     items:[{
	                         xtype: 'container',
	                         flex: 1,
	                         layout: 'anchor',
	                         defaults : {
	             			    anchor:'100%'        
	                         },
	                         items: [
	                            {xtype: 'textfield',hidden : true,name:'id'},
	    						{xtype: 'textfield',fieldLabel: '登录名',name : 'loginname',allowBlank : false,afterLabelTextTpl: required,blankText:'登录名不能为空'},
	    						{xtype: 'textfield',fieldLabel: '登录密码',name : 'password',allowBlank : false,afterLabelTextTpl: required,blankText:'登录密码不能为空',inputType:'password'},
	    						{xtype: 'textfield',fieldLabel: '再次输入密码',name : 'password2',allowBlank : false,afterLabelTextTpl: required,blankText:'请再次输入密码',inputType:'password',vtype: 'repetition',repetition: { targetCmpId: 'password' }},
	    						{xtype: 'textfield',fieldLabel: '姓名',name : 'realname',allowBlank : false,afterLabelTextTpl: required,blankText:'真实姓名不能为空',maxLength:'50',maxLengthText:'姓名不能超过五十个字'},	    							    						
	    						{
	                            	xtype:'RemoteCombobox',
	                               	name : 'post',
	                               	emptyText : '请选择职务...',
	                               	model : Ext.create('Ext.data.Model',{
	                               		fields : ['key','value']
	                               	}),
	                               	valueField : 'value',
	                               	displayField : 'key',
	                               	proxy_url : constants.url.combo.dict+"POST",
	                               	allowBlank : false,
	                               	afterLabelTextTpl: required,
	                               	blankText:'职务不能为空',
	                               	fieldLabel:'职务',
	                               	value:1,
	                               	listeners : {
	                               		expand : function(ths){
	                               			this.getStore().reload();
	                               		}
	                               	}
	                               },
	    						{xtype: 'textfield',fieldLabel: '身份证号',name : 'idcard',allowBlank : true,hidden : true,afterLabelTextTpl: required,blankText:'身份证号不能为空'},
	    						{
	                            	xtype:'RemoteCombobox',
	                               	name : 'sex',
	                               	emptyText : '请选择性别...',
	                               	model : Ext.create('Ext.data.Model',{
	                               		fields : ['key','value']
	                               	}),
	                               	valueField : 'value',
	                               	displayField : 'key',
	                               	proxy_url : constants.url.combo.dict+"Sex",
	                               	allowBlank : false,
	                               	afterLabelTextTpl: required,
	                               	blankText:'性别不能为空',
	                               	fieldLabel:'性别',
	                               	value:1, 
	                               	listeners : {
	                               		expand : function(ths){
	                               			this.getStore().reload();
	                               		}
	                               	}
	                               },
	    						
	    						{
	    							xtype : 'comboTree',
	    							valueField: 'id',   
	    				          	displayField: 'deptname',
	    				          	store : Ext.create('Ext.data.TreeStore',{
	    				          		fields : [
	    				  		          {name:'id',mapping:'id'},
	    				  		          {name:'text',mapping:'deptname'},
	    				  		          'children',
	    				  		          'leaf'
	    						       ],
	    						       autoLoad : true,
	    						       rootVisible : true,
	    						       proxy: {
	    				          	      type: 'ajax',
	    				          	      url: window.constants.url.sys.dept.deptTree,
	    				          	      rootProperty : function(data){
	    				          	    	  return data;
	    				          	      }
	    				          	  	}
	    				          	}),
	    				          	listeners : {
	    				        	},
	    				          	allowBlank : false,
	    				          	afterLabelTextTpl: required,
	    				  	  		name : 'deptcode',
	    				      	  	emptyText : '请选择...',
	    				          	fieldLabel : '所属组织机构'
	    						}
	                         ]
	                     },{
	                    	 xtype : 'container',
	                    	 flex : 1,
	                    	 layout : 'anchor',
	                    	 defaults: {
	                    		 anchor : '100%'
	                    	 },
	                    	 items : [
                               
                               {xtype: 'textfield',fieldLabel: '办公电话',name : 'tel',allowBlank : true,blankText:'办公电话不能为空',regex:/^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/,regexText:'请输入正确的电话号码,如:0920-29392929'},
                               {xtype: 'textfield',fieldLabel: '个人电话',name : 'mobphone',allowBlank : true,blankText:'个人电话不能为空',maxLength:'11',maxLengthText:'电话号码不得超过十一位数',regex:/(^0?[1][35][0-9]{9}$)/,regexText:'电话号码格式错误'},
                               {xtype: 'textfield',fieldLabel: 'QQ号',name : 'qq',allowBlank : true,blankText:'QQ号不能为空',maxLength:'12',minLength:'6',maxLengthText:'QQ号不得超过十一位数',minLengthText:'QQ号不得少于六位数',regex:/^[1-9]\d{4,11}$/,regexText:'QQ号格式错误'},
                               {xtype: 'textfield',fieldLabel: '电子邮箱',name : 'email',allowBlank : true,blankText:'电子邮箱不能为空',vtype:'email',vtypeText:'该输入项必须是电子邮箱地址,格式例如：xxx@xxx.com'},
                               {
                            	xtype:'RemoteCombobox',
                               	name : 'jobstate',
                               	emptyText : '请选择工作状态...',
                               	model : Ext.create('Ext.data.Model',{
                               		fields : ['key','value']
                               	}),
                               	valueField : 'value',
                               	displayField : 'key',
                               	proxy_url : constants.url.combo.dict+"JobState",
                               	allowBlank : false,
                               	afterLabelTextTpl: required,
                         	    blankText:'工作状态不能为空',
                               	fieldLabel:'工作状态',
                               	value:1, 
                               	listeners : {
                               		expand : function(ths){
                               			this.getStore().reload();
                               		}
                               	}
                               },
                               
                               {
                               	xtype:'RemoteCombobox',
                                  	name : 'nation',
                                  	emptyText : '请选择民族...',
                                  	model : Ext.create('Ext.data.Model',{
                                  		fields : ['key','value']
                                  	}),
                                  	valueField : 'value',
                                  	displayField : 'key',
                                  	proxy_url : constants.url.combo.dict+"NATION",
                                  	allowBlank : false,
                                  	afterLabelTextTpl: required,
                                  	blankText:'民族不能为空',
                                  	fieldLabel:'民族',
                                  	value:36,
                                  	listeners : {
                                  		expand : function(ths){
                                  			this.getStore().reload();
                                  		}
                                  	}
                                  }
	            	         ]
	                     }
	                 ]
	             },
	             {xtype: 'textfield',fieldLabel: '家庭住址',name : 'address',allowBlank : true},
	             {xtype: 'textfield',fieldLabel: '备注',name : 'remarks'}
	             //{fieldLabel : '备注',name:'remarks',flex:1,xtype:'textareafield',grow:true,anchor:'100%'}
	    	],
	    	buttons: [{
	            text: '取消',iconCls:'fa fa-sign-out fa-fw',
	            handler:  function(bt){
	            	this.up('form').getForm().reset();
	            	Ext.destroy(this.up('form'));
	            	Ext.destroy(Ext.ComponentQuery.query('baseWin')[0]);
	            }
	        }, {
	            text: '提交',iconCls:'fa fa-save fa-fw',
	            formBind: true,
	            disabled: true,
	            handler: function() {
	                var form = this.up('form').getForm();
	                var record = form.getRecord(),
	            	me = this,
	            	record = Ext.ComponentQuery.query('sys_user_view')[0].getView().selection,
	            	store = Ext.ComponentQuery.query('sys_user_view')[0].getStore(),
	                values = form.getValues(),
	                isEdit = !!record;
	                if (form.isValid()) {
	                	if (isEdit) {
	                        record.set(values);
	                    }  else{
	                        record = Ext.create('app.model.sys.User');
	                        record.set(values);
	                        record.setId('');
	                        store.add(record);
	                    }
	                }
	                Ext.destroy(Ext.ComponentQuery.query('baseWin')[0]);
	                Ext.destroy(this.up('form'));
	                store.sync({callback:function(){
	        	    	store.reload();
	        	    }});
	                store.reload();
	            }
	        }]
});