/**
 * 
 * <p> Title:${className} EXTJS FORM</p>
 * <p> Description:  ${codeName}</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('${JS_PATH_form}.${className}Form',{
	extend : 'app.view.BaseForm',
	alias: 'widget.${lowerName}form',
	requires : [
	    'Ext.button.Button',
	    'Ext.form.field.Text'
    ],
    layout: {
        type:'vbox',
        align:'stretch'
    },
    bodyPadding: 10,
    scrollable: true,
    defaultType: 'textfield',
    defaults: {
        labelWidth: 60,
        labelSeparator: '：'
    },
	items : [
		/*最后一行需要去除逗号负责IE下会报错*/
		#foreach($item in $!{columnDatas})
		{fieldLabel:'$!item.columnName',name:'$!item.columnName',xtype:'textfield',flex:1,anchor : '100%',allowBlank : false,afterLabelTextTpl: required},
		#end
	]
});