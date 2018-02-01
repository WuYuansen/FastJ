/**
 *
 * <p> Title:LoadMask.js BY EXTJS V6.0 (src/main/newwebapp/packages/local/wys/overrides/Ext)</p>
 * <p> Description:  TODO</p>
 * <p> Copyright: Copyright (c) 2017 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
Ext.define('wys.LoadMask',{
	override : 'Ext.LoadMask',
	renderTpl: [
        '<div id="{id}-msgWrapEl" data-ref="msgWrapEl" class="my_preloader my_spinner">',
		'		<div class="my_spinWrap" id="{id}-msgEl" data-ref="msgEl">',
		'		<p class="my_spinnerImage"></p>',
		'		<p class="my_loader"></p>',
		'		<p class="my_loadingMessage" data-ref="msgTextEl" id="{id}-msgTextEl">{msg}</p>',
		'		<p class="my_loadingSubHeading" id="spinnerSubHeading"></p>',
		'	</div>',
		'</div>'
    ]
});