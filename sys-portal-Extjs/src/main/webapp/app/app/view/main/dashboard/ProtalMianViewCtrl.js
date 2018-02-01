/**
 *
 * <p> Title:ProtalMianViewCtrl.js BY EXTJS V6.0 (src/main/newwebapp/classic/src/view/main/dashboard)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('app.view.main.dashboard.ProtalMianViewCtrl',{
	extend : 'wys.basic.BaseCtrl',
    alias:'controller.protalMianViewCtrl',
    init : function(view){
    },
    newPortalInfoMsg : function(){ //弹出窗体
    	var winCfg = {
            iconCls : 'fa fa-edit fa-lg',
            title : '新增/编辑首页规划区块'
        };
        var cfg = Ext.apply({
            xtype: 'baseWin',
            listeners : {
            	close : function(win){ //关闭后销毁表单
            		win.down('protalInfoForm').reset();
            	}
            },
            items: [
                {xtype : 'protalInfoForm'}
            ]
        },winCfg);
        return cfg;
    },
    portalViewClick : function(btn){
    	var me = this;
    	Ext.create(me.newPortalInfoMsg());
    },
    portalViewClickByModify : function(btn){
    	var me = this;
    	var record = btn.up('baseView').getSelection();
    	if(record.length === 1){
    		var win = Ext.create(me.newPortalInfoMsg());
    		win.down('protalInfoForm').loadRecord(record[0]);
    	}else{
    		util.info(WY.local.lang.common.grid.justSelectOneRow);
    	}
    },
    portalViewDblClick : function(grid,record){
    	var me = this;
    	var win = Ext.create(me.newPortalInfoMsg());
    	win.down('protalInfoForm').loadRecord(record);
    },
    portalViewClickRemoveChose : function(btn){
    	var grid = btn.up('baseView'),
    		records = grid.getSelection(),
    		store = grid.getStore();
    	if(records.length > 0){
    		util.confirm(WY.local.lang.common.deleteConfirm,function(btn){
        		if(btn === 'ok'){
        			store.remove(records);
	                store.sync({callback:function(){
	                    store.reload();
	                }});
        		}
        	});
    	}
    },
    portalViewClickSearch : function(btn){
    	btn.up('baseView').getStore().reload();
    },
    portalViewClickRefresh  : function(btn){
    	btn.up('baseView').getStore().reload();
    },
    onGridCommand : function(item, command, record, recordIndex, cellIndex){ //操作咧点击事件
    	if(command === 'operator'){
	    	var winCfg = {
	            iconCls : 'fa fa-edit fa-lg',
	            title : '规划页面',
	            listeners : {
	            	close : function(win){ //关闭后销毁表单
	            		win.down('drwaMainView').destroy();
	            	}
	            }
	        };
	        var cfg = Ext.apply({
	            xtype: 'baseWin',
	            items: [
	                {xtype : 'drwaMainView',sourcesRecord:record}
	            ]
	        },winCfg);
	        Ext.create(cfg);
    	}
    },
    onFocusTextarea : function(field){
    	var me = this;
    	field.blur();
        Ext.create('Ext.window.Window',{
        	iconCls : 'fa fa-pencil fa-fw',title : '选择' + field.fieldLabel,
            xtype: 'window',
            width : 425,
            height : 520,
            modal: true,
        	maximizable:true,
        	autoScroll:true,
            closeAction:'hide',
            layout: 'fit',
            autoScroll : true,
            animCollapse : true,
            listeners : {
            	show : function(win){
            		if(field.name==='depts'){
            			util.ajax({
            	    		url : app.base + '/getGroupList.action?start=0&limit=20',
            	    		ok : function(resp){
            	    			var  radiogroupItems = new Array();
            	    			for(var i=0;i<resp.sgflist.length;i++){
            	    				var item = resp.sgflist[i];
            	    				radiogroupItems.push({
            	    					boxLabel: item.groupname,
            	    					name: 'group',
            	    					inputValue: item.groupno
            	    				})
            	    			}
            	    			win.add({
            	    					xtype: 'checkboxgroup',
            	    					margin : '0 0 0 8',
            	    					listeners : {
            	    						change:function(this_, newValue, oldValue, eOpts ){
            	    							field.setValue('');
            	    							var groupNewValues = new Array();
            	    							var groupNewText = new Array();
            	    							Ext.each(this_.getChecked(),function(item){
            	    								groupNewText.push(item.boxLabel);
            	    								groupNewValues.push(item.inputValue);
            	    							});
            	    							field.setValue(groupNewText.toString());
            	    							field.up().down('hiddenfield[name=deptsValue]').setValue(groupNewValues.toString());
            	    						} 
            	    					},
        	    			            fieldLabel: '选择'+field.fieldLabel,
        	    			            columns: 2,
        	    			            vertical: true,
        	    			            items : radiogroupItems
            	    			});
            	    		}
            	    	});
            		}
            		if(field.name==='users'){
            			util.ajax({
            	    		url : app.base + '/perm/queryAllSysuser.action?start=0&limit=100000',
            	    		ok : function(resp){
            	    			var  radiogroupItems = new Array();
            	    			var checkGroup = field.up().down('hiddenfield[name=deptsValue]').getValue();
            	    			for(var i=0;i<resp.suserli.length;i++){
            	    				var item = resp.suserli[i];
            	    				if(Ext.isEmpty(checkGroup)){
            	    					radiogroupItems.push({
                	    					boxLabel: item.peoplename + '('+item.companyname+')',
                	    					name: 'users',
                	    					inputValue: item.peopleno
                	    				})
            	    				}else{
	            	    				if(checkGroup.indexOf(item.orgtype) > 0){
	            	    					radiogroupItems.push({
	                	    					boxLabel: item.peoplename + '('+item.companyname+')',
	                	    					name: 'users',
	                	    					inputValue: item.peopleno
	                	    				})
	            	    				}
            	    				}
            	    			}
            	    			win.add({
            	    					xtype: 'checkboxgroup',
            	    					margin : '0 0 0 8',
            	    					listeners : {
            	    						change:function(this_, newValue, oldValue, eOpts ){
            	    							field.setValue('');
            	    							var groupNewValues = new Array();
            	    							var groupNewText = new Array();
            	    							Ext.each(this_.getChecked(),function(item){
            	    								groupNewText.push(item.boxLabel);
            	    								groupNewValues.push(item.inputValue);
            	    							});
            	    							field.setValue(groupNewText.toString());
            	    							field.up().down('hiddenfield[name=usersValue]').setValue(groupNewValues.toString());
            	    						} 
            	    					},
        	    			            fieldLabel: '选择'+field.fieldLabel,
        	    			            columns: 1,
        	    			            vertical: true,
        	    			            items : radiogroupItems
            	    			});
            	    		}
            	    	});
            		}
            	},close:function(win){
            		win.destroy();
            	}
            },
            items: []
        }).show();
    },
    deptsItem : function(win){
    	
    },
    userItems : function(){
    	
    }
});