/**
 *
 * <p> Title:myTemplateData.js BY EXTJS V6.0 (src/main/newwebapp/resources/plugins/ckeditor/plugins/myTemplateData/dialogs)</p>
 * <p> Description:  下拉选择占位符，先决条件是将模版数据源写入</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
CKEDITOR.plugins.add( 'dropDownList',{
   requires : ['richcombo'], //, 'styles' ],
   init : function(editor){
      var config = editor.config,
         lang = editor.lang.format;
      // Add the link and unlink buttons.
      editor.addCommand('dropDownList',new CKEDITOR.dialogCommand('dropDownList'));
      // Gets the list of tags from the settings.
      var tags = []; //new Array();
      //this.add('value', 'drop_text', 'drop_label');
      tags[0]=["{$项目名称$}", "项目名称", "项目名称"];
      tags[1]=["{$法人姓名$}", "法人姓名", "法人姓名"];
      tags[2]=["{$法人联系电话$}", "法人联系电话", "法人联系电话"];
      // Create style objects for all defined styles.
      editor.ui.addRichCombo('dropDownList',{
            label : "替换符",
            title :"添加占位符",
            voiceLabel : "添加占位符",
            className : 'cke_format',
            multiSelect : false,
            panel : {
               css : [config.contentsCss,CKEDITOR.getUrl(CKEDITOR.skin.getPath('editor'))],
               voiceLabel : lang.panelVoiceLabel
            },
            init : function(editor){
               this.startGroup( "添加占位符" );
               //this.add('value', 'drop_text', 'drop_label');
               for (var this_tag in tags){
                  this.add(tags[this_tag][0], tags[this_tag][1], tags[this_tag][2]);
               }
            },
            onClick : function( value ){
               editor.focus();
               editor.fire( 'saveSnapshot' );
               editor.insertHtml(value);
               editor.fire( 'saveSnapshot' );
            }
         });
   }
});