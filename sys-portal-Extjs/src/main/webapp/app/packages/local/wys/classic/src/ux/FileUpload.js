/**
 *
 * <p> Title:FileUpload EXTJS FORM</p>
 * <p> Description:  文件上传组件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.ux.FileUpload',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.uploadPanel',
	width : 700,
	height : 300,
	bizCode : '', //临时参数传递使用,遵循先定义后使用,
	fileType : '',//临时参数传递使用,遵循先定义后使用,
	busitypeid : '',//临时参数传递使用,遵循先定义后使用,
	columns : [
        {xtype: 'rownumberer'},
		{text: '文件名', width: 100,dataIndex: 'name'},
		{text: '自定义文件名', width: 130,dataIndex: 'fileName'}, //,editor: {xtype: 'textfield'}
        {text: '类型', width: 70,dataIndex: 'type'},
        {text: '大小', width: 70,dataIndex: 'size',renderer:function(v){
        	return Ext.util.Format.fileSize(v);
        }},
        {text: '进度', width: 130,dataIndex: 'percent',renderer:function(v){        	
			var stml =
				'<div>'+
					'<div style="border:1px solid #008000;height:10px;width:115px;margin:2px 0px 1px 0px;float:left;">'+		
						'<div style="float:left;background:#FFCC66;width:'+v+'%;height:8px;"><div></div></div>'+
					'</div>'+			
			'</div>';
			return stml;
        }},
        {text: '状态', width: 80,dataIndex: 'status',renderer:function(v){
			var status;
			if(v==-1){
				status = "等待上传";
			}else if(v==-2){
				status =  "上传中...";
			}else if(v==-3){
				status =  "<div style='color:red;'>上传失败</div>";
			}else if(v==-4){
				status =  "上传成功";
			}else if(v==-5){
				status =  "停止上传";
			}		
			return status;
		}},
        {
            xtype:'actioncolumn',
            width:50,
            items: [{
                iconCls : 'fa fa-close fa-lg',
                tooltip: '移除任务',
                handler: function(grid, rowIndex, colIndex) {
                	var id = grid.store.getAt(rowIndex).get('id');
                    grid.store.remove(grid.store.getAt(rowIndex));
                }
            }]
        }
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],    
    store : Ext.create('Ext.data.JsonStore',{
    	autoLoad : false,
    	fields : ['id','name','type','size','percent','status','fileName']
    }),
	addFileBtnText : '添加附件',
	uploadBtnText : '开始上传',
	removeBtnText : '移除所有任务',
	cancelBtnText : '取消',
	debug : false,
	file_size_limit : 100,//MB
	file_types : '*.*',
	file_types_description : '所有文件',	//这里可以指定要上传的文件
	file_upload_limit : 50,
	file_queue_limit : 0,
	post_params : {
		attach_name:'',
		attach_table:'',
		attach_bizCode:'',
		attach_type:''
	},	//请求参数
	upload_url : constants.url.fileUpload,	//访问地址
	flash_url : Ext.String.format("{0}/resources/plupload/swfupload.swf",WY.local.loadScriptPrefix),
	flash9_url : Ext.String.format("{0}/resources/plupload/swfupload_fp9.swf",WY.local.loadScriptPrefix),
	initComponent : function(){		
		//创建元素后即可赋值给post_params
		this.post_params.attach_bizCode = this.bizCode;
		this.post_params.attach_type 	= this.fileType;
		this.post_params.attach_table = this.busitypeid;
		////end
		this.dockedItems = [{
		    xtype: 'toolbar',
		    dock: 'top',
		    items: [
		        { 
			        xtype:'button',
			        itemId: 'addFileBtn',
			        iconCls : 'fa fa-plus fa-lg',
			        //id : '_btn_for_swf_',
			        text : this.addFileBtnText
		        },{ xtype: 'tbseparator' },{
		        	xtype : 'button',
		        	itemId : 'uploadBtn',
		        	iconCls : 'fa fa-cloud-upload fa-lg',
		        	text : this.uploadBtnText,
		        	scope : this,
		        	handler : this.onUpload
		        },{ xtype: 'tbseparator' },{
		        	xtype : 'button',
		        	itemId : 'removeBtn',
		        	iconCls : 'fa fa-trash-o fa-lg',
		        	text : this.removeBtnText,
		        	scope : this,
		        	handler : this.onRemove
		        },{ xtype: 'tbseparator' },{
		        	xtype : 'button',
		        	itemId : 'cancelBtn',
		        	iconCls : 'fa fa-close fa-lg',
		        	disabled : true,
		        	text : this.cancelBtnText,
		        	scope : this,
		        	handler : this.onCancelUpload
		        }
		    ]
		}];
		
		this.callParent();
		this.down('button[itemId=addFileBtn]').on({			
			afterrender : function(btn){
				var config = this.getSWFConfig(btn);		
				this.swfupload = new SWFUpload(config);
				Ext.get(this.swfupload.movieName).setStyle({
					position : 'absolute',
					top : 0,
					left : -2
				});	
			},
			scope : this,
			buffer:300
		});
	},
	getSWFConfig : function(btn){
		var me = this;
		var placeHolderId = Ext.id();
		var em = btn.getEl().child('em');
		if(em==null){
			em = Ext.get(btn.getId()+'-btnWrap');
		}		
		em.setStyle({
			position : 'relative',
			display : 'block'
		});
		em.createChild({
			tag : 'div',
			id : placeHolderId
		});
		return {
			debug: me.debug,
			flash_url : me.flash_url,
			flash9_url : me.flash9_url,	
			upload_url: me.upload_url,
			post_params: me.post_params||{savePath:'file\\'},
			file_size_limit : (me.file_size_limit*1024),
			file_types : me.file_types,
			file_types_description : me.file_types_description,
			file_upload_limit : me.file_upload_limit,
			file_queue_limit : me.file_queue_limit,
			button_width: em.getWidth(),
			button_height: em.getHeight(),
			button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor: SWFUpload.CURSOR.HAND,
			button_placeholder_id: placeHolderId,
			custom_settings : {
				scope_handler : me
			},
			swfupload_preload_handler : me.swfupload_preload_handler,
			file_queue_error_handler : me.file_queue_error_handler,
			swfupload_load_failed_handler : me.swfupload_load_failed_handler,
			upload_start_handler : me.upload_start_handler,
			upload_progress_handler : me.upload_progress_handler,
			upload_error_handler : me.upload_error_handler,
			upload_success_handler : me.upload_success_handler,
			upload_complete_handler : me.upload_complete_handler,
			file_queued_handler : me.file_queued_handler/*,
			file_dialog_complete_handler : me.file_dialog_complete_handler*/
		};
	},
	swfupload_preload_handler : function(){
		if (!this.support.loading) {
			Ext.Msg.show({
				title : '提示',
//				msg : '浏览器Flash Player版本太低,不能使用该上传功能！,请<a href="https://jingyan.baidu.com/article/11c17a2c3ffc2af447e39d76.html" style="color:blue;">点击</a>进行指导安装',
				msg : '浏览器Flash Player版本太低,不能使用该上传功能！,请<a href='+app.base +'/doc/flash_notHave.pdf target="_black" style="color:blue;">点击</a>进行指导安装',
				icon : Ext.Msg.ERROR,
				buttons :Ext.Msg.OK
			});
			return false;
		}
	},
	file_queue_error_handler : function(file, errorCode, message){
		switch(errorCode){
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED : msg('上传文件列表数量超限,不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT : msg('文件大小超过限制, 不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE : msg('该文件大小为0,不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE : msg('该文件类型不允许上传！');
			break;
		}
		function msg(info){
			Ext.Msg.show({
				title : '提示',
				msg : info,
				icon : Ext.Msg.WARNING,
				buttons :Ext.Msg.OK
			});
		}
	},
	swfupload_load_failed_handler : function(){
		Ext.Msg.show({
			title : '提示',
			msg : 'SWFUpload加载失败！',
			icon : Ext.Msg.ERROR,
			buttons :Ext.Msg.OK
		});
	},
	upload_start_handler : function(file){
		var me = this.settings.custom_settings.scope_handler;
		me.down('#cancelBtn').setDisabled(false);	
		var rec = me.store.getById(file.id);
		this.setFilePostName(encodeURIComponent(rec.get('fileName')));
	},
	upload_progress_handler : function(file, bytesLoaded, bytesTotal){
		var me = this.settings.custom_settings.scope_handler;		
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		percent = percent == 100? 99 : percent;
       	var rec = me.store.getById(file.id);
       	rec.set('percent', percent);
		rec.set('status', file.filestatus);
		rec.commit();
	},
	upload_error_handler : function(file, errorCode, message){
		var me = this.settings.custom_settings.scope_handler;		
		var rec = me.store.getById(file.id);
       	rec.set('percent', 0);
		rec.set('status', file.filestatus);
		rec.commit();
	},
	upload_success_handler : function(file, serverData, responseReceived){
		var me = this.settings.custom_settings.scope_handler;		
		var rec = me.store.getById(file.id);
		if(Ext.JSON.decode(serverData).success){			
	       	rec.set('percent', 100);
			rec.set('status', file.filestatus);			
		}else{
			rec.set('percent', 0);
			rec.set('status', SWFUpload.FILE_STATUS.ERROR);
		}
		rec.commit();
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload();
		}else{
			me.showBtn(me,true);
		}
	},
	upload_complete_handler : function(file){
		
	},
	file_queued_handler : function(file){
		var me = this.settings.custom_settings.scope_handler;
		me.store.add({
			id : file.id,
			name : file.name,
			fileName : file.name,
			size : file.size,
			type : file.type,
			status : file.filestatus,
			percent : 0
		});
	},
	onUpload : function(){
		if (this.swfupload&&this.store.getCount()>0) {
			if (this.swfupload.getStats().files_queued > 0) {
				this.showBtn(this,false);
				this.swfupload.uploadStopped = false;		
				this.swfupload.startUpload();
			}
		}
	},
	showBtn : function(me,bl){
		me.down('#addFileBtn').setDisabled(!bl);
		me.down('#uploadBtn').setDisabled(!bl);
		me.down('#removeBtn').setDisabled(!bl);
		me.down('#cancelBtn').setDisabled(bl);
		if(bl){
			me.down('actioncolumn').show();
		}else{
			me.down('actioncolumn').hide();
		}		
	},
	onRemove : function(){
		var ds = this.store;
		for(var i=0;i<ds.getCount();i++){
			var record =ds.getAt(i);
			var file_id = record.get('id');
			this.swfupload.cancelUpload(file_id,false);			
		}
		ds.removeAll();
		this.swfupload.uploadStopped = false;
	},
	onCancelUpload : function(){
		if (this.swfupload) {
			this.swfupload.uploadStopped = true;
			this.swfupload.stopUpload();
			this.showBtn(this,true);
		}
	}
});