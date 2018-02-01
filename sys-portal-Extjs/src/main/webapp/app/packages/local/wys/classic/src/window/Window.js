/**
 *
 * <p> Title:Window EXTJS MODEL</p>
 * <p> Description:  重新定义window使其具有动画效果，可用于点击滑动显示流程步骤等功能</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 * @author wys
 * @version 1.0
 */
Ext.define('wys.window.Window',{
    extend : 'Ext.window.Window',
    xtype : 'pushWindow',
    closeAction: "destroy",
    initComponent: function() {
        var me = this;
        var name,id,sum;
        me.floating=true;
        billname = me.billName || [];
        name = me.billData.name;
        me.items=[
            {
                xtype: 'panel', //default panel
                margin:'5 5 5 5',
                minWidth: Ext.Element.getViewportWidth()*0.4,
                autoWidth:true,
                layout: {
                    type: 'vbox'//,
                    //column:1
                },
                items: [
                    {
                        xtype: 'button',
                        text: '关闭',
						ui : 'button-commonToolbarBtn-toolbar',
                        iconCls : 'fa fa-close',
                        listeners: {
                            click: Ext.bind(me.onCloseWindow,me)
                        }
                    },{
	                   	xtype: 'panel',
	                    tag: 'timecontentBanner'/*,
	                    html: '<div class="caretLeft" style="border-right-color:#ff9900;margin-top:3px;margin-left:250px;"></div><div class="shadow" style="width:290px;background-color: #FF9900;padding:0px 5px;color:#fff;text-align:center;">执行时间：xxxx/xx/xx </div>'*/
                    },{
                        width: Ext.Element.getViewportWidth()*0.3,
                        items: me.billData
                    }
                ]
            }
        ];
        //自定义显示动画
        me.listeners=
        {
            show:
            {
                fn: function() {
                    me.getEl().fadeIn({
                        easing: 'easeOut',
                        duration: 500,
                        from: {
                            width: 0, //starting width 400
                            opacity: 0,       // Transparent
                            color: '#ffffff', // White
                            right: 0
                        },
                        to: {
                            width: document.body.clientWidth-230, //end width 300
                            height: document.body.clientHeight-150,
                            left:  Ext.Element.getViewportWidth()*0.4// end height 300
                        }
                    });
                }
            },
            closeAnimate:
            {
                fn: function() {
                    me.getEl().fadeIn({
                        duration: 500,
                        from: {
                            left:  Ext.Element.getViewportWidth()*0.4// end height 300

                        },
                        to: {
                            left: document.body.clientWidth
                        }
                    });
                }
            }
        };
        me.callParent();
    },
    onCloseWindow: function() {
        var me=this;
        me.fireEvent("closeAnimate",me);
        Ext.defer(function() { me.close() },500,me);
    }
});