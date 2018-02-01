/**
 *
 * <p> Title:Picker.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/modern/overrides/field)</p>
 * <p> Description:  优化选择控件</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.modern.overrides.field.Picker',{
	override: "Ext.field.Picker",
    //根据标签名称设置空白提示语
    updateLabel: function (value) {
        //如果已经配置空白提示语则不执行
        if (value) { 
//            this.setPlaceholder('请选择' + value);
        }
        this.callParent(arguments);
        Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        Ext.define("Ext.zh.DatePicker", {
            override: "Ext.picker.Date",
            config: {
                yearFrom: 2000,
                monthText: '月',
                dayText: '日',
                yearText: '年'
            }
        });
    }
});