/**
 *
 * <p> Title:PicShow EXTJS</p>
 * <p> Description:  定义图片浏览器效果</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.PicShow", {
    extend: 'Ext.window.Window',
    xtype: 'picShowWin',
    ui: 'picList',
    width: 800,
    height: 600,
    header: false,
    closable: true,
    animCollapse : true,
    closeAction: "destroy",
    isLocalData : true,	//是否是本地数据
    localData : [],	//本地数据数组
    imgSrc : '',	//图片地址
    modal: true,
    layout: "absolute",
    align:'center',
    scrollable:true,
    style: 'background-color:#ebebeb',
    bodyStyle: 'background-color:transparent',
    items: [
        {
            xtype: "image",
            x: "50%",
            y: "50%",
            src : '',
            cls: "my-showPic",
            itemId: "picShow",
            afterRender : function(sel){
            	new Ext.dd.DD(Ext.getCmp(this.id), 'pic');  
            	Ext.get(this.id).dom.title = '鼠标滚轮控制图片的放大和缩小';
            	Ext.get(this.id).on('dblclick',function(){
            		util.zoom(Ext.getCmp(this.id), 1.5,true); 
            	});
            	Ext.get(this.id).on('mousewheel',function(e){
            		var delta = e.getWheelDelta();  
                    if (delta > 0) {  
                 	   util.zoom(Ext.getCmp(this.id), 1.5,true);  
                    } else {
                 	   util.zoom(Ext.getCmp(this.id), 1.5,false);  
                    }  
            	});
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
        var win = me;
        var img = win.down("image");
        img.setSrc(me.imgSrc);
    }
});