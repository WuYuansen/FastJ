/**
 *
 * <p> Title:plugin.js BY EXTJS V6.0 (src/main/newwebapp/resources/plugins/ckeditor/plugins/myTemplateData)</p>
 * <p> Description:  模版数据构建</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
(function() {  
    CKEDITOR.plugins.add("myTemplateData", {  
        requires: ["dialog"],  
        init: function(a) {  
            a.addCommand("myTemplateData", new CKEDITOR.dialogCommand("myTemplateData"));  
            a.ui.addButton("myTemplateData", {  
                label: "点击配置合同模版数据",//调用dialog时显示的名称  
                command: "myTemplateData",  
                icon: this.path + "g.ico"//在toolbar中的图标  
   
            });  
            CKEDITOR.dialog.add("myTemplateData", this.path + "dialogs/myTemplateData.js")  
        }  
   
    })  
   
})(); 