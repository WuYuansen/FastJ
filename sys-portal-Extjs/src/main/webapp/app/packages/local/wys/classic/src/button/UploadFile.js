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
Ext.define('wys.button.UploadFile',{
    extend : 'Ext.button.Button',
    xtype:'uploadFileBtn',
    iconCls : 'fa fa-upload fa-lw',
    text:'文件上传',
	ui : 'button-commonToolbarBtn-toolbar',
    tooltip : '<span style="font-size:12px">点击进行文件上传</span>',
    alias: 'widget.uploadFileBtn',
    requires: ['wys.ux.FileUpload'],
    listeners: {
        click: function() {
            var me = this;
            Ext.applyIf(me.config.uploader, {
                browse_button: me.config.id || me.getId()
            });
            me.uploader = me.createUploader();
            me.uploader.initialize();
            me.relayEvents(me.uploader, [
                'beforestart',
                'uploadready',
                'uploadstarted',
                'uploadcomplete',
                'uploaderror',
                'filesadded',
                'beforeupload',
                'fileuploaded',
                'updateprogress',
                'uploadprogress',
                'storeempty'
            ]);
        }
    },
    /**
     * @private
     */
    createUploader: function(){
        return Ext.create('wys.ux.FileUpload', this, Ext.applyIf({
            listeners: {}
        }, this.initialConfig));
    }
});