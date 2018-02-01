/**
 *
 * <p> Title:FileUpLoad.js BY EXTJS V6.0 (src/main/newwebapp/modern/src/plugs/ux/picker)</p>
 * <p> Description:  附件上传js</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.picker.FileUpLoad',{
	extend : 'Ext.Container',
	xtype : 'fileUploadPicker',
	requires:['Ext.Container'],
	config: {
        cls: 'guide',
        plugins: [{
            xtype: 'conTpl',
            delegate: 'button',
            scrollable: null
        }],
        html: '<button fire="getPhoto" class="my-btn my-btn-danger"><i class="fa fa-cloud-upload fa-lg"></i>文件上传</button>'+
        	  '<input class="my-upload-file" type="file" name="file">'
    },
    constructor: function (config) {
        this.callParent();
    },
    /**
     * 执行
     */
	dogetPhoto : function(){
		$(".my-upload-file").trigger("click");
	}
});