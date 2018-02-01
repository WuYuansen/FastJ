/**
 *
 * <p> Title:Text.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/field)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.field.Text',{
	override: "Ext.field.Text",
    //根据空白提示语设置必填提示
    updatePlaceholder: function (value) {
        //如果已经配置必填提示语则不执行
        if (value && !this.getRequiredMessage() != '此项为必填项') {
            this.setRequiredMessage(value);
        }
//        this.callParent(arguments);
    },
    //根据标签名称设置空白提示语
    updateLabel: function (value) {
        //如果已经配置空白提示语则不执行
        if (value && !this.placeholder) { 
            this.setPlaceHolder('请输入' + value);
        }
//        this.callParent(arguments);
    }
});