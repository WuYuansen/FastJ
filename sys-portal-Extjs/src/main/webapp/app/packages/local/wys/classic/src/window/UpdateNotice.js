/**
 *
 * <p> Title:UpdateNotice.js BY EXTJS V6.0 (src/main/newwebapp/classic/overrides/window)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define("wys.window.UpdateNotice",{
	extend: 'Ext.window.Window',
    xtype: 'window-updateNotice',
    ui: 'updateNotice',
    header: false,
    resizable: false,
    closable: true,
    modal: true,
    width: 683,
    height: 440,
    requires: [
        'wys.toolbar.NoInputPaging'
    ],
    style: 'background-color:#fff;',
    dockedItems: [{
        xtype: 'panel',
        dock: 'top',
        cls : 'updateWinBg',
        bodyStyle: 'background-color:transparent;',
        width: 683,
        height: 153,
        bind: {
            html: '<div class="updateNoticeHeader"><p>{title}</p><div>{updateDate}</div></div>'
        },
        items: [{//关闭按钮
            xtype: 'tool',
            type: 'close',
            style: 'float:right;margin-right:10px;margin-top:10px;',
            handler: function () {
                arguments[2].up("window-updateNotice").close();
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        style: 'background-color:#ffffff;border-top:1px solid #efefef!important',
        items: ['->', /*{
            xtype: 'toolbar-noinputpaging',
            ui: 'paging',
            bind: { store: '{updateNotice}' }
        },*/{
        	xtype : 'button',
        	iconCls : 'fa fa-upload',
        	text : '更新系统',
        	handler : function(btn){
        		Ext.MessageBox.show({
                    wait: true,height:50,
                    waitConfig: {
                        interval: 1,
                        increment: 280,
                        text: '<span class="app-normal">正在更新系统，请稍后</span>'
                    }
                });
        		Ext.defer(function(){window.location.reload();},1000)
        	}
        }, '->']
    }],
    items: [{
        xtype: 'panel',
        bodyStyle: 'background-color:#ffffff;',
        cls: 'updateNoticePanel',
        width: 663,
        height: 227,
        scrollable: 'y',
        padding: '5 0 0 35',
        items: [{
            xtype: 'dataview',
            height: 200,
//            bind: { data: '{currentUpdateNotice}' },
            bind : '{updateNotice}',
            itemSelector: 'tr',
            tpl: [
                 '<table>',
                    '<tpl for=".">',
                        '<tr>',
                            '<td style="vertical-align: top">{#}.</td>',
                            '<td>{content}</td>',
                        '</tr>',
                    '</tpl>',
                '</table>'
            ]
        }]
    }],
    initComponent: function () {
        var me = this;
        me.callParent();
    }
});