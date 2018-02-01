Ext.define('app.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    init : function(){ //初始化方法
    	
    	window.util = window.utils;
    	
		if(!(Ext.util.Cookies.get('loginState') && Ext.util.Cookies.get('loginState') === 'true')){
    		Ext.select('.loading').hide();
    		//window.util.info('页面会话超时或未登录，请登录!',function(){
				Ext.create('app.view.anthentication.Login');
    		//},'系统提示');
    		return;
    	}
    	Ext.select('.loading').hide();
//    	this.disableLeftMenu();
    	Ext.setGlyphFontFamily('FontAwesome'); //指定矢量图字体
    	if(Ext.isIE8m){
    		util.info('为了您更好的体验，请使用chrome浏览器或Firefox浏览器');
    	}
    },
    onToggleNavigationSize : function(){ /* 折叠右侧菜单 */
    	var me = this,
        refs = me.getReferences(),
        navigationList = refs.treelist,
        navigationContainer = refs.navigationContainer,
        wrapContainer = refs.mainCardPanel;
        collapsing = !navigationList.getMicro(),
        new_width = collapsing ? 44 : 200;
        
    	Ext.suspendLayouts();
        navigationContainer.setWidth(new_width);
        navigationList.setWidth(new_width);
        navigationList.setMicro(collapsing);
        Ext.resumeLayouts();
        wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
        wrapContainer.updateLayout();
    },
	selectionThemeEventInit : function(this_,args){
		var themeEvent = this,themeCookie = Ext.util.Cookies.get('theme');
		var themes = this_.getValue();
		if(themeCookie){
			themes = themeCookie;
		}
		switch(themes){
			case 'modern': //现代
				themeEvent.modern_style();
				break;
			case 'classic'://古典
				themeEvent.classic_style();
				break;
			default : //现代
				themeEvent.classic_style();
				break;
		}
	},
	resizePageFontSize : function(btn){
		var fontSize_ = btn.value;
		Ext.ComponentManager.each(function(i,o){
			o.setStyle({fontSize:fontSize_+'px'});
			Ext.util.Cookies.set('global_fontSize',fontSize_);
		});
	},
    selectionThemeEvent : function(this_,args){
		Ext.util.Cookies.set('theme',this_.getValue());
		window.location.reload();
    },
    modern_style : function(){ /* modern page style */
		if(!(Ext.util.Cookies.get('loginState') && Ext.util.Cookies.get('loginState') === 'true')){
			return;
		}
    	var modern_self = this;
    	modern_self.mainView = this.getView();
    	modern_self.mainView.add({xtype : 'menuBar'});
    	modern_self.mainView.add({xtype : 'component',
	       	height: 1,
	   	    border: 1,
	       	style: {
	       	    borderColor: '#cccccc',
	       	    borderStyle: 'solid'
	       	}
        });
        modern_self.mainView.add({
            xtype: 'tabpanel', //'tabpanel',//container
            flex: 1,
            activeTab: 0,
            border : 1,
            autoScroll :true, //滚动条
            reference: 'mainCardPanel',
            itemId: 'contentPanel',
            listeners : {
           	 tabchange : function(comp){
           		 var s  = comp.getActiveTab();
           	 }
            },
            plugins : Ext.create('wys.plugs.TabClose',{}),
            layout: {
                type: 'card',
                anchor: '100%'
            }
        })
        modern_self.mainView.add({xtype : 'footerBar',border:1});
    	this.createMenu();//初始化菜单
    },
    classic_style : function(){ /* classic page style */
    	var MaskObj = {};
		if(!(Ext.util.Cookies.get('loginState') && Ext.util.Cookies.get('loginState') === 'true')){
			return;
		}
    	var classic_self = this;
    	classic_self.mainView = this.getView();
		classic_self.mainView.add({
			xtype : 'component',
			height: 1,
			border: 1,
			style: {
				borderColor: '#cccccc',
				borderStyle: 'solid'
			}
		})
    	classic_self.mainView.add({
    		xtype : 'container',
    		anchor:'100%',
    		flex: 1,
    		layout : 'border',
    		items:[
				{
				    region:'west',
				    name : 'leftMenu',
				    xtype: 'container',
				    margin: '0 1 0 0',
				    width: 220,
				    style : {
				    	background:'#32404e'
				    },
					bodyBorder:false,
					border:false,
					reference: 'navigationContainer',
					autoScroll:true,
				    items : [
		             {
		            	 xtype : 'treelist',
						 reference: 'treelist',
		            	 ui : 'nav',
						 border:false,
						 expanderFirst: false,
						 expanderOnly: false,
						 singleExpand: true,
						 listeners:{
							 selectionchange:function(tree,node){
								 if(node) {
									 if(node.get('extendclass')==='menu'){
										 var node2 = {
												 text: node.get('showname'),
												 leaf : node.get('leaf'),
												 url : node.get('extendtype')
										 };
										 classic_self.redirectTo(node.get('extendtype'), node.parentNode.get('text') + '-' + node.get('showname'), node.get('iconCls'),node.get('id'));
									 }
								 }else{
								 }
							 },
							 click : function(){
							 }
						 },
		            	 store : Ext.create('Ext.data.TreeStore',{
		            		 fields : [{
			                            name : 'className',
			                            mapping : 'extendtype',
			                            type : 'string'
			                        }, {
			                            name : 'text',
			                            mapping : 'showname',
			                            type : 'string'
			                        }, {
			                            name : 'iconCls',
			                            mapping : 'icon',
			                            type : 'string'
			                        },'children','leaf',{name:'order',type:'int'},{name:'orders',mapping:'id',type:'int'}],
	                        sorters:[
                             {property: 'order',direction: 'ASC'},
                             {property: 'orders',direction: 'ASC'}
                            ],
		                    listeners : {
		                    	nodeexpand : function(this_,eOpts){
		                    	},
		                    	beforeload : function( store, operation, eOpts ){
		                    		var me = this;
		                    		MaskObj = Ext.create('Ext.LoadMask', {
		                                target: Ext.ComponentQuery.query('container[name=leftMenu]')[0],
		                                useTargetEl: true,
		                                msg: '正在加载菜单资源'
		                            });
		                    		MaskObj.show();
		                    		
		                    	},
		                    	load : function(target,records, successful, operation, node, eOpts){
		                    		if(node.get('children') && node.get('children').length === 0){
		                    			node.set('leaf',true);
		                    		}else{
									}
		                    		MaskObj.hide();
		                    	}
		                    },
			                proxy : {
			                    type : 'ajax',
			                    url : constants.url.initMenu,
			                    reader : {
			                    	type : 'json',
			                    	rootProperty : 'list'
			                    }
			                },
			                autoLoad : true
		            	 })
		             }
		            ]
				},{
				    region: 'center',
				    margin: '0 0 0 0',
				    xtype: 'tabpanel',//container
		            flex: 1,
		            activeTab: 0,
		            border : false,
		            autoScroll :true, //滚动条
		            reference: 'mainCardPanel',
		            itemId: 'contentPanel',
		            listeners : {
		            	tabchange : function(comp){
		            		var s  = comp.getActiveTab();
		           	 	}
		            },
		            plugins : Ext.create('wys.plugs.TabClose',{}),
		            layout: {
		                type: 'card',
		                anchor: '100%'
		            }

				}
	        ]
    	});
		classic_self.mainView.add({xtype : 'footerBar',border:1});
    	classic_self.redirectTo("main.Layout_welcome",'我的工作台','fa fa-home fa-fw');
		Ext.suspendLayouts();
		Ext.resumeLayouts(true);
    },
    onSelectionChange : function(btn,item, e, eOpts){	//系统菜单点击时间
    	if(btn && btn.name){
    		//用于日志记录的事件：单击菜单前先提交到拦截器，将此操作写入日记
    		/*var ajax_cfg = {
				url : app.base + 'services/logs/module.json',
				params : {'text':btn.treeAllText,'module':'menuEven'},
				ok : function(resp){
    				if(resp.success===false){
    				}
    			}
			};
			window.util.ajax(ajax_cfg);*/
    		this.redirectTo(btn.name,btn.p + btn.treeAllText,btn.iconCls,btn.id);
    	}else{
    		Ext.create('app.view.main.Error404Window',{});
    	}
    },
    disableLeftMenu : function(){ /* 禁用右键菜单 加入新的菜单 */
		var menu = Ext.create('Ext.menu.Menu');
		menu.add({iconCls:'fa fa-refresh',text:'刷新页面&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:11px;color:gray;">(Ctrl+R)</span>',
			handler:function(){
				window.location.reload();
			}
		});
		menu.add('-');
		menu.add({iconCls:'fa fa-key',text:'修改密码&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:11px;color:gray;">(Ctrl+U)</span>',
			handler:function(){
				Ext.create('app.view.anthentication.PasswordReset',{}).show();
			}
		});
		menu.add({iconCls:'fa fa-power-off',text:'退出系统&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:11px;color:gray;">(Ctrl+Q)</span>',
			handler:function(){
				var logoutAjaxCfg = {
					url : window.constants.url.logout,
					ok : function(res){
						if(res.success){
							window.util.info('您已退出系统，点击确认跳转到登录页',function(){
								window.location.reload();
							},'系统提示');
						}
					}
				};
				window.util.confirm('您确定要退出系统吗？',function(btn){
					if(btn === 'ok'){
						Ext.util.Cookies.set('loginState',false);
						window.location.reload();
						//接入正式以后请将上一行代码注释，下一行代码解除注释
						//window.util.ajax(logoutAjaxCfg);
					}
				},'系统提示');
			}
		});
		Ext.getDoc().on("contextmenu", function(e){ //禁止右键
    	    e.stopEvent();
			menu.showAt(e.getPoint());
    	});
    },
    createMenu : function(){
    	var self_createmenu = this,
    	ajax_menu_cfg = {
			url : constants.url.initMenu,
			ok : function(resp){
				var json = resp;
				var menuConponent = Ext.ComponentQuery.query('menuBar')[0];
				Ext.suspendLayouts();
				menuConponent.add(self_createmenu.onanismusMenu(json.list));
				Ext.resumeLayouts(true);
				//调用其他函数
				self_createmenu.redirectTo("main.Layout_welcome",'我的工作台','fa fa-home fa-fw','');
			}
    	};
    	util.ajax(ajax_menu_cfg);
    },
    requestChildMenuByNew : function(btn){
    	var self = this;
    	if(btn.menu != undefined){
    		return;
    	}
    	ajax_menu_cfg = {
			url : constants.url.initMenu,
			params : {node:btn.seq},
			ok : function(resp){
				var json = resp;
				if(!json.success){
					util.err('加载菜单资源异常');
					return;
				}
				var tempMenuArray = new Array();
				Ext.Array.each(json.list,function(item,index){
					var menu = new self.menuNode(
		    			item.showname,
						item.icon,
						item.extendtype,
						item.extendclass==='menu'?{click : 'onSelectionChange'}:{click:'requestChildMenuByNew'},
						item.showname===undefined?"":item.showname,
						item.showname===undefined?"":item.showname,
						item.id
		    		);
					tempMenuArray.push(menu);
					tempMenuArray.push('-');
				});
				Ext.suspendLayouts();
				btn.setMenu(tempMenuArray);
				Ext.resumeLayouts(true);
			}
    	};
    	util.ajax(ajax_menu_cfg);
    },
    onanismusMenu : function(jsonList){
    	var self_onanismus = this;
    	var list=jsonList;
    	var arr = [];
    	Ext.Array.each(list,function(item,index){
    		var menu = new self_onanismus.menuNode(
    			item.showname,
				item.icon,
				item.extendtype,
				item.extendclass==='menu'?{click : 'onSelectionChange'}:{render:'requestChildMenuByNew'},
				item.showname===undefined?"":item.showname,
				item.showname===undefined?"":item.showname,
				item.id
    		);
    		if(item.children != null && item.children.length != 0){
    				var children = [];
    				Ext.each(item.children,function(i){
    					var there = new self_onanismus.menuNode(
    						i.showname,
    						i.icon,
    						i.extendtype,
    						item.extendclass==='menu'?{click : 'onSelectionChange'}:{render:'requestChildMenuByNew'},
    						item.showname,
    						item.showname+"> "+i.showname,
    						item.id
    					);
    					if(i.children != null){
    						var thereMenu = [];
    						Ext.Array.each(i.children,function(children__){
    							var thereOther = new self_onanismus.menuNode(
    								children__.showname,
    								children__.icon,
    	    						children__.extendtype,
    	    						children__.extendclass==='menu'?{click : 'onSelectionChange'}:{render:'requestChildMenuByNew'},
    								i.showname +  ' > ',
    								/*item.showname+" > "+*/i.showname+" > "+children__.showname,
    								item.id
    	    					);
    							if(children__.children != null && children__.children.length != 0){
    								var other = [];
    								Ext.Array.each(children__.children,function(children__Othoer){
    									var other_children =  new self_onanismus.menuNode(
    											children__Othoer.showname,
    											children__Othoer.icon,
    											children__Othoer.extendtype,
    											children__Othoer.extendclass==='menu'?{click : 'onSelectionChange'}:{render:'requestChildMenuByNew'},
												children__.showname +  ' > ',
												/*item.showname+" > "+*/i.showname+" > "+children__.showname+" > "+children__Othoer.showname,
												item.id
		    	    					);
    									other.push(other_children);
    								});
    								thereOther.menu = Ext.create('Ext.menu.Menu',{
    		    						items : other
    		    					});
    							}{
		    							thereMenu.push(thereOther);
			    						thereMenu.push('-');
    							}
    						});
    						there.menu = Ext.create('Ext.menu.Menu',{
	    						items : thereMenu
	    					});
    					}else{
    						there.listeners={click : 'onSelectionChange'};
    						there.p = item.showname + ' > ';
    						there.treeAllText=item.showname+" > "+i.showname
    					}
    					children.push(there);
    					children.push('-');
    				});
    				menu.menu = Ext.create('Ext.menu.Menu', {
        				items : children
        			});
    			}/*else{
    				//
    			}*/
    		arr.push(menu);
    		arr.push('-');
    	});
    	return arr;
    },
    menuNode : function(text,iconCls,action,listeners,p,treeAllText,code){ //引入面向对象思想
    	return {
    		text:text,
    		border:0,
    		name : action,
    		iconCls:iconCls,
    		listeners : listeners,
    		p : p,
    		treeAllText : treeAllText,
    		seq : code
    	};
    },
    /**
     * 页面跳转事件
     * @params xtypes 页面地址
     * @params title 标题
     * @params iconCls 图标
     */
    redirectTo : function(xtypes,title,iconCls,code) { //绘制&跳转到主界面
    	if(xtypes ==='' || xtypes === null || xtypes === '#' || xtypes === 'null'){
    		Ext.create('Ext.window.Window',{//app.view.main.Error404Window
    			autoShow: true,
    		    cls: 'error-page-container',
    		    closable: true,
    		    title: '系统提示',
    		    titleAlign: 'center',
    		    modal: true,
    		    width : 300,
    		    height : 150,
    		    layout: {
    		        type: 'vbox',
    		        align: 'center',
    		        pack: 'center'
    		    },
    		    style : 'text-align: center;line-height: 8;',
    			html:WY.local.lang.common.functionIsTempClose});
    		return;
    	}
		//解析xtypes
		var s = xtypes;
		var sLength = s.indexOf('?');
		if (/*sLength > 0 && */s.indexOf('.jsp') > 0) {//页面无法显示问题 修改时间：2017年10月17日18:21:21 修改人：吴元森
		}else if(sLength > 0){
			var url = s.substring(0, sLength);
			var params = s.substring(sLength + 1, s.length);
			xtypes = url;
			var obj = Ext.JSON.decode(params.replace('=', ':'));
		} else {
		}
		var me = this,
			refs = me.getReferences(),
			mainCard = refs.mainCardPanel,
			mainLayout = mainCard.getLayout(),
			viewModel = me.getViewModel(),
			vmData = viewModel.getData(),
			lastView = vmData.currentView,
			existingItem = mainCard.child('component[routeId=' + (xtypes) + ']'),
			newView;
		//杀死任何先前路由的窗口
		if (lastView && lastView.isWindow) {
			lastView.destroy(); 
		}
		lastView = mainLayout.getActiveItem();
		if (!existingItem) {
			var suffx_jsp = xtypes.indexOf('.jsp');
			if (suffx_jsp > 0) {
				newView = Ext.create('Ext.panel.Panel', {//Ext.container.Container
					hideMode: 'offsets',
					border: 1,
					routeId: xtypes,
					title: title,
//					tools:[{
//						margin : '0 8 0 8',
//			        	ui: 'button-searchbtn-toolbar',
//			        	tooltip : '返回首页',
//			        	iconCls : 'fa fa-home',
//			        	xtype : 'button',
//			        	text : '&nbsp;&nbsp;返回首页',
//			        	handler : function(){
//			            	me.redirectTo("main.Layout_welcome",'','');
//			        	}
//					}],
					iconCls: iconCls,
					closable: false,
					listeners: {
						afterrender: function (component, eOpts) {
							page = Ext.create('wys.plugs.Frame', {
								src : app.base + '/' + xtypes
							});
							component.add(page);
						}
					}
				});
			} else {
				//正式运行后把try catch打开
//				try{
					if(xtypes.indexOf('@')>0){
						var params = xtypes.split('@')[1].split('&');
						for(var i=0;i<params.length;i++){
							var key = params[i].split('=');
							$(viewData).attr(key[0],key[1]);
						}
						xtypes = xtypes.split('@')[0];
					}
					newView = Ext.create('app.view.' + (xtypes || 'main.Error404Window'), {
						hideMode: 'offsets',
						border: 1,
						ui : 'navigation',
						routeId: xtypes, //路由,#f5f5f5
						title: Ext.String.format('<span style="font-size: 13px;">{0}</span>',title.replace("undefined", "").replace('Root-','')),
						iconCls: iconCls,
						closable: false,
						listeners: {
							afterrender: function () {
								if (Ext.util.Cookies.get('global_fontSize')) {
									Ext.ComponentManager.each(function (i, o) {
										o.setStyle({fontSize: Ext.util.Cookies.get('global_fontSize') + 'px'});
									});
								}
							}
						}
					}); 
//				}catch(e){
//					console.log(e);
//					newView = Ext.create('app.view.main.Error500Window', {
//						hideMode: 'offsets',
//						border: 1,
//						routeId: xtypes, //路由,
//						title: window.localStorage.getItem('busitypename') + ' - '+ title.replace("undefined", ""),
//						domHtml : e,
//						iconCls: iconCls,
//						closable: true,
//						listeners: {
//							afterrender: function () {
//								if (Ext.util.Cookies.get('global_fontSize')) {
//									Ext.ComponentManager.each(function (i, o) {
//										o.setStyle({fontSize: Ext.util.Cookies.get('global_fontSize') + 'px'});
//									})
//								}
//							}
//						}
//					});
//				}
			}
		}
		if (!newView || !newView.isWindow) {
			if (existingItem) {
				if (existingItem !== lastView) {
					mainLayout.setActiveItem(existingItem);
				}
				newView = existingItem;
			}
			else {
				Ext.suspendLayouts();
				mainLayout.setActiveItem(mainCard.add(newView));
				Ext.resumeLayouts(true);
			}
		}

		if (newView.isFocusable(true)) {
			newView.focus();
			if (existingItem) {
				existingItem.setTitle(title);
				existingItem.setIconCls(iconCls);
			}
		}
		vmData.currentView = newView;
	},
	onMessagesClick:function(){
		var winCfg = {
        	iconCls : 'fa fa-envelope-o fa-lg',
            title : '站内消息',
            width : 800,
            height : 500,
            listeners:{
            	close : function(self){
            		self.destroy();
            	}
            }
        };
        var cfg = Ext.apply({
            xtype: 'baseWin',
            items: [
                {xtype : 'messageView'}
            ]
        },winCfg);
        Ext.create(cfg);
	},
	messagesRender:function(btn){
		/*util.ajax({
    		url : constants.url.message.findMessageCounts,
    		ok : function(response){
    			if(response.success){
    				if(response.total && response.total>0){
    					var sup = Ext.select('sup[id=msg_tip_count]').elements[0];
        				sup.innerHTML = response.total;
        				sup.className = 'emailCount';
    				}
    			}
    		}
    	});*/
	}
});