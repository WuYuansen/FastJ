/**
 *
 * <p> Title:PicShow EXTJS</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.HtmlShow", {
    extend: 'Ext.window.Window',
    xtype: 'htmlShowWin',
    ui: 'htmlList',
    width: "100%",
    height: "100%",
    header: false,
    closable: true,
    closeAction: "destroy",
    isLocalData : true,	//是否是本地数据
    localData : [],	//本地数据数组
    fileKey : '',	//图片地址
    modal: true,
    scrollable:true,
    style: {
        textAlign: "center"
    },
//    layout: "absolute",
    align:'center',
    items: [
        {
            xtype: "button",
            iconCls: 'fa icon-close',
            style: {
                background: 'transparent',
                border: 'none',
                fontSize: "50px",
                width: "60px",
                height: "60px"
            },
            scale: 'large',
            x: "calc(100% - 50px)",
            y: 0,
            handler: function () {
                this.up("window").destroy();
            }
        }
    ],
    buttonAlign: "center",
    buttons: [
       {
        	xtype: 'button',
            text: '关闭',
			ui : 'button-commonToolbarBtn-toolbar',
            iconCls : 'fa fa-close',
            handler : function(){
            	 var me = this;
                 var win = me.up("window");
                 win.close();
            }
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent();
        util.ajax({
    		url : constants.url.attachment.wordToHtml,
    		params : {
    			fileKey:me.fileKey
    		},
    		ok : function(response){
    			if(response.success){
    				me.setHtml(response.root);
    			}else{
    				util.err(response.msg_info);
    			}
    		}
    	});
    }
});