/**
 *
 * <p> Title:myTemplateData.js BY EXTJS V6.0 (src/main/newwebapp/resources/plugins/ckeditor/plugins/myTemplateData/dialogs)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
(function() {
    CKEDITOR.dialog.add("myTemplateData", function(a) {
        return {
            title: "模版数据构建器",
            minWidth: "500",
            minHeight:"200",
            contents: [{
                id: "myTemplateDataBySQL",
                label: "",
                title: "",
                expand: true,
                padding: 0,
                elements: [{
                	type:'html',
                    html:'<span>说明：请输入查询数据的SQL语句。</span>'
                },{
                    type: "textarea",
                    required:true
                },{
                	type:'checkbox',
                    html:'<span>说明：请输入查询数据的SQL语句。</span>'
                }]
            }],
            onOk: function(){
                //点击确定按钮后的操作,提交到后端进行数据加载
                a.insertHtml("编辑器追加内容");
            }
        }
    })
})();