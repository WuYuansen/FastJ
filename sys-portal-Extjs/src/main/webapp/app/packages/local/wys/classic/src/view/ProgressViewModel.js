/**
 *
 * <p> Title:PropertyView EXTJS FORM</p>
 * <p> Description:  进度，可用于任何流程等需要办理步骤的页面</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.view.ProgressViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.progressViewModel',
    data: {

    },
    stores: {
        dataviewProgress: {
            type: 'store',
            data: [
                {
                    list: [
                        { upMessage: "2017.06.19 物业系统前端框架确认", downMessage: "", status: 'successed' },
                        { upMessage: "", downMessage: "2017.06.20 物业系统后端框架雏形确认发生变更", status: 'failed', failedMessage: '业务流程有变化' },
                        { upMessage: "2017.06.23 物业系统前端展示页面正式进入开发", downMessage: "", status: 'being' ,failedMessage:'物业系统前端展示页面正式进入开发'},
                        { upMessage: "", downMessage: "2017.06.29 物业系统前端开发正式开始第一版本已确认有部分优化调整内容", status: 'successed'}
                    ]
                }
            ]
        },
        registerProgress: {
            type: 'store',
            data: [
                {
                    list: [
                        { upMessage: "2017.06.19 提交注册申请", downMessage: "", status: 'successed' },
                        { upMessage: "", downMessage: "2017.06.20 信息填写不符", status: 'failed', failedMessage: '企业组织机构编码填写有误' },
                        { upMessage: "2017.06.23 审核成功", downMessage: "", status: 'successed' ,failedMessage:'恭喜您，你的申请已通过'}
                    ]
                }
            ]
        }
    }
});