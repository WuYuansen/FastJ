/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
//		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
		'/',
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'others' }
	];
	
	config.baseFloatZIndex = 299999;
	
	//保留word样式
	config.pasteFromWordRemoveFontStyles = false;
	config.pasteFromWordRemoveStyles = false;
	//是否强制复制来的内容去除格式 
	config.forcePasteAsPlainText = false;//不去除
	config.pasteFromWordNumberedHeadingToList = false;

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';
	
	/* 自定义插件 */
	//1  注册插件
	config.extraPlugins += (config.extraPlugins ? ',dropDownList' : 'dropDownList'); //myTemplateData
	//2 plugins文件夹下新建：插件名称 文件夹
};
