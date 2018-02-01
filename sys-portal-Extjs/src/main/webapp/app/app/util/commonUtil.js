/**
 * @功能：系统前端常用工具类
 * @作者:wys
 */
Ext.define('app.util.commonUtil', {
    singleton: true,
    gridpanelTip : function(v, metadata, record, rowIndex, columnIndex, store){
    	metadata.attr = ' ext:qtip="' + v + '"';    
		return v;
    },
    /**
     * 求百分比
     * @params dividend 被除数
     * @params divisor 除数
     */
    percentage : function(dividend,divisor){
    	if(divisor == 0){
    		return 0
    	}else{
    		return Math.round(dividend/divisor * 10000) / 100.00;
    	}
    },
    trim : function(str){ //去除空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    /**
     * 千位分割
     */
    splitNumber : function(num){
    	var b = /([-+]?\d{3})(?=\d)/g;
    	var result = num.replace(b, function($0, $1){
            return $1 + ',';
        });
        return result;
    },
    /**
     * 修改只读输入框背景颜色
     */
    setReadOnlyStyle : function(input){
    	if(input.setFieldStyle)
    		input.setFieldStyle({'background':'#f1f1f1','cursor':'not-allowed'});
    	if(input.allowBlank === false){ //解决为加入*号必填内容
        	if(!input.afterLabelTextTpl){
        		input.afterLabelTextTpl=required;
        	}
        }
    },
    /**
     * 格式化时间
     */
    formatDate : function(value){
    	if(value){
    		return Ext.util.Format.date(new Date(parseInt(value)),'Y-m-d H:i');
    	}else{
    		return  '';
        }
    },
    formatDate : function(value,format){
    	if(value){
    		return Ext.util.Format.date(new Date(parseInt(value)),format);
    	}else{
    		return  '';
        }
    },
    /**
     * 格式化钱数
     */
    formatMoney : function(value){
    	return value?Ext.util.Format.usMoney(value).replace('$',''):0.00;
    },
    /**
     * 格式化金钱
     * 0 - (123457) show only digits, no precision
     * 0.00 - (123456.79) show only digits, 2 precision
     * 0.0000 - (123456.7890) show only digits, 4 precision
     * 0,000 - (123,457) show comma and digits, no precision
     * 0,000.00 - (123,456.79) show comma and digits, 2 precision
     * 0,0.00 - (123,456.79) shortcut method, show comma and digits, 2 precision
     * 0.#### - (123,456.789) Allow maximum 4 decimal places, but do not right pad with zeroes
     * 0.00## - (123456.789) Show at least 2 decimal places, maximum 4, but do not right pad with zeroes
     */
    formatNumber : function(value,format){
    	return value?Ext.util.Format.number(value,format):0;
    },
    /**
     * 发起Aiax请求
     *
     * @param wait
     *          是否自动显示等待框。缺省：true。
     * @param wmsg
     *          等待框提示信息。缺省：同AOS.wait()的缺省值。
     * @param url
     *          Ajax的请求地址
     * @param ok
     *          成功回调函数(参数为Json返回JS对象)
     * @param params
     *          参数Json对象
     * @param forms
     *          参与这次提交的相关表单或表单数组(复合参数类型)。
     * @param timeout
     *          超时时间，缺省为120s。
     * @param validate
     *          是否对forms参数传入的表单开启表单校验功能。缺省：true。
     *
     */
    ajax : function (cfg) {
        var validate = cfg.validate;
        // 缺省开启表单校验开关
        if (Ext.isEmpty(validate)) {
            validate = true;
        }
        var params = cfg.params;
        if (Ext.isEmpty(params)) {
            params = {};
        }
        var forms = cfg.forms;
        // 表单验证通过标志，缺省为true
        var isValid = true;
        if (!Ext.isEmpty(forms)) {
            Ext.Array.each(forms, function (form) {
                // 表单验证
                if (validate && !form.isValid()) {
                    isValid = false;
                }
                // 表单参数复制
                Ext.apply(params, form.getValues());
            });
        }
        // 如果是表单提交，且表单验证不通过则返回
        if (!isValid) {
            Ext.log('表单合法性校验未通过，Ajax请求取消。如果这和您的预期不符，请检查调用window.util.ajax()时是否多传或错传了forms参数。');
            return;
        }
        if(cfg.url && cfg.url.indexOf('?')<0){
        	cfg.url = cfg.url+'?_dc='+new Date().getTime();
        }else if(cfg.url && cfg.url.indexOf('?')>0 && cfg.url.indexOf('_dc')<0){
        	cfg.url = cfg.url+'&_dc='+new Date().getTime();
        }
        var mycfg = {
            params: params,
//            async : false, //setting this request should run asynchronously
            url: cfg.url
        };
        if(cfg.async != null){
        	mycfg.async = cfg.async;
        }else{
        	window.util.wait(cfg.wmsg);
        }
        // 如果未配置则缺省使用全局配置的超时时间120S
        if (!Ext.isEmpty(cfg.timeout)) {
            mycfg.timeout = cfg.timeout;
        }
        /*if (Ext.isEmpty(cfg.wait) || cfg.asynccfg.wait) {
        	window.util.wait(cfg.wmsg);
        }*/
        var _cfg = {
            success: function (response, opts) {
            	window.util.hide();
                /*if (Ext.isEmpty(cfg.wait) || cfg.wait) {
                    window.util.hide();
                }*/
                var responseText = response.responseText;
                if (Ext.isEmpty(responseText)) {
                    responseText = "{}";
                }
                try{
                	cfg.ok(Ext.decode(responseText));
                }catch(error){
//                	console.warn(error);
                }
            },
            failure: function(form, action) {
            	window.util.hide();
            	Ext.Msg.show({ 
        	      title: WY.local.lang.common.system_msg.sysError, 
        	      msg: WY.local.lang.common.system_msg.systemRunError, 
        	      buttons: Ext.Msg.OK, 
        	      icon: Ext.Msg.ERROR 
        	     }); 
        	}
        };
        Ext.apply(_cfg, mycfg);
        Ext.Ajax.request(_cfg);
    },
    queryDatasBySql : function(params, callback){
    	util.ajax({
    		url : constants.url.report.queryDatasBySql,
    		params : params,
    		ok : function(response){
    			if(response.success){
    				callback(response.list);
    			}else{
    				util.err(response.msg_info);
    			}
    		}
        });
    },
    /**
     * 保存操作日志
     * @params opertype 操作类型
     * @params des 描述
     */
    recordLog : function(opertype,des){
    	util.ajax({
    		url : constants.url.logs.save,
    		params : {
    			opertype:opertype,
    			description:des
    		}
    	});
    },
    recordLog : function(opertype,operurl,des){
    	util.ajax({
    		url : constants.url.logs.save2,
    		params : {
    			opertype:opertype,
    			requestUrl:operurl,
    			description:des
    		}
    	});
    },
    /**
     * 提示信息
     */
    info : function (msg, fn, title) {
        if (Ext.isEmpty(title)) {
            title = WY.local.lang.common.system_msg.sysTip;
        }
        Ext.Msg.show({
            title: '<span class="app-container-title-normal"><i class="fa fa-info-circle fa-lg"></i> ' + title + '</span>',
            msg: msg,
            buttons: Ext.Msg.OK,
            fn: fn,
            buttonText: {
                ok: WY.local.lang.common.okButtonText
            },
            icon: Ext.Msg.INFO
        });
    },

    /**
     * 错误信息
     */
    err : function (msg, title) {
        if (Ext.isEmpty(title)) {
            title = WY.local.lang.common.system_msg.sysError;
        }
        Ext.Msg.show({
            title: '<span class="app-container-title-normal"><i class="fa fa-warning fa-lg"></i> ' + title + '</span>',
            msg: msg,
            buttons: Ext.Msg.OK,
            buttonText: {
                ok: WY.local.lang.common.okButtonText
            },
            icon: Ext.Msg.ERROR
        });
    },
    /**
     * Store 加载数据异常
     * @param response
     */
    storeLoadErr : function(response){
        var status = response.status,
        	url = response.request.url;
        switch(status){
            case 201:
                util.err('请求方式错误，此请求紧接 POST命令。 <br><span style="color:red;">资源地址</span>：'+url);
                break;
            case 202:
                util.err('已接受用于处理，但处理尚未完成。 <br><span style="color:red;">资源地址</span>：'+url);
                break;
            case 301:
                util.err('请求的数据具有新的位置且更改是永久的。 <br><span style="color:red;">资源地址</span>：'+url);
                break;
            case 400:
                util.err('请求中有语法问题，或不能满足请求。 <br><span style="color:red;">资源地址</span>：'+url);
                break;
            case 401:
                util.err('未授权客户机访问数据。 <br><span style="color:red;">资源地址</span>：'+url);
                break;
            case 404:
                util.err('服务器找不到给定的资源或请求地址。 <br><span style="color:red;">资源地址</span>：'+url);
                break;
            case 500:
                util.err('因为意外情况，服务器不能完成请求 或者出问题了。 <br><span style="color:red;">资源地址</span>：'+url);
                break;
            default:
                if(status===200){
                	var json = Ext.JSON.decode(response.responseText);
//                	util.err(json.message || json.msg_info +' <br>资源地址</span>：'+url);
                	util.showQQMask('',json.msg_info);
                }else{
                	util.err('系统无法完成您的请求，请稍后再试或联系管理员。 <br><span style="color:red;">资源地址</span>：'+url);
                }
                break;
        }
    },
    /**
     * 确认信息
     */
    confirm : function (msg, fn, title) {
        if (Ext.isEmpty(title)) {
            title = WY.local.lang.common.system_msg.sysConfirm;
        }
        Ext.Msg.show({
            title: '<span class="app-container-title-normal"><i class="fa fa-question-circle fa-lg"></i> ' + title + '</span>',
            msg: msg,
            buttons: Ext.Msg.OKCANCEL,
            fn: fn,
            buttonText: {
                ok: WY.local.lang.common.yesButtonText,
                cancel: WY.local.lang.common.noButtonText
            },
            icon: Ext.Msg.QUESTION
        });
    },
    MaskWindow :{},
    /**
     * 等待信息
     */
    wait : function (msg, waitText) {
        if (Ext.isEmpty(waitText)) {
            waitText = WY.local.lang.common.system_msg.runingTitle;
        }
        if (Ext.isEmpty(msg)) {
            msg = WY.local.lang.common.system_msg.runing;
        }
        MaskWindow = Ext.MessageBox.show({
            msg: msg,
            wait: true,
            waitConfig: {
                interval: 1,
                increment: 280,
                text: '<span class="app-normal">' + waitText + '</span>'
            }
        });
    },
    /**
     * 结束等待信息
     */
    hide : function () {
        try {
        	MaskWindow.hide();
        } catch (e) {
            // do nothing
        }
    },
    // 全局阴影对象
    MaskObj : {},
    /**
     * 阴影遮盖等待信息
     *
     * @param msg
     *          提示信息文本
     * @param parent
     *          遮罩的元素
     */
    mask : function (msg, parent) {
        if (Ext.isEmpty(parent)) {
            parent = Ext.getBody();
        }
        if (Ext.isEmpty(msg)) {
            msg = WY.local.lang.commonsystem_msg.runing;
        }
        MaskObj = Ext.create('Ext.LoadMask', {
            target: parent,
            useTargetEl: true,
            msg: msg
        });
        MaskObj.show();
    },
    /**
     * 关闭阴影遮盖等待信息
     */
    unmask : function () {
        try {
        	 MaskObj.hide();
        } catch (e) {
            //
        }
    },
    /**
     * 合并单元格
     */
    mergeCells : function(grid, rowOrCol,colName, borderStyle){
    	var array1 = new Array();
        var count1 = 0;
        var count2 = 0;
        var index1 = 0;
        var index2 = 0;
        var aRow = undefined;
        var preValue = undefined;
        var firstSameCell = 0;
        var allRecs = grid.getStore().getRange();
        if (rowOrCol == "row") {
            count1 = grid.getColumns().length;
            count2 = grid.getStore().getCount();
        } else {
            count1 = grid.getStore().getCount();
            count2 = grid.getColumns().length;
        }
        count1 = 2; // 对第二列合并
        for (i = 1; i < count1; i++) {
            preValue = undefined;
            firstSameCell = 0;
            array1[i] = new Array();
            for (j = 0; j < count2; j++) {
                if (rowOrCol == "row") {
                    index1 = j;
                    index2 = i;
                } else {
                    index1 = i;
                    index2 = j;
                } 
                if (allRecs[index1].get(colName) == preValue) {
                    allRecs[index1].set(colName, "&nbsp;");
                    array1[i].push(j);
                    //alert(i + "\r\n"+j);
                    if (j == count2 - 1) {
                        var index = firstSameCell + Math.round((j + 1 - firstSameCell) / 2 - 1);
                        if (rowOrCol == "row") {
                            allRecs[index].set(colName, preValue);
                        } else {
                            allRecs[index1].set(grid.getColumns()[index], preValue);
                        }
                    }
                } else {
                    if (j != 0) {
                        var index = firstSameCell + Math.round((j + 1 - firstSameCell) / 2 - 1);
                        if (rowOrCol == "row") {
                            allRecs[index].set(colName, preValue);
                        } else {
                            allRecs[index1].set(grid.getColumns()[index], preValue);
                        }
                    }
                    firstSameCell = j;
                    preValue = allRecs[index1].get(colName);
                    allRecs[index1].set(colName, "&nbsp;");
                    if (j == count2 - 1) {
                        allRecs[index1].set(colName, preValue);
                    }
                }
            }
        }
        grid.getStore().commitChanges();//添加所有分隔线
        for (i = 0; i < grid.getStore().getCount(); i++) {
            for (j = 0; j < grid.getColumns().length; j++) {
//                aRow = grid.getView().getCell(i,2);
//                aRow.style.borderTop = borderStyle;
//                aRow.style.borderLeft = borderStyle;
            }
        }//去除合并的单元格的分隔线
        for (i = 1; i < array1.length; i++) {
            for (j = 0; j < array1[i].length; j++) {
                if (rowOrCol == "row") {
//                    aRow = grid.getView().getCell(array1[i][j], i);
//                    aRow.style.borderTop = 'none';
                } else {
                    aRow = grid.getView().getCell(i, array1[i][j]);
                    aRow.style.borderLeft = "none";
                }
            }
        }
    },
    /**
     * 模拟右下角淡出消息
     * @returns
     */
    showQQMask : function(title,message){
    	if(title){
    		title='<span class="app-container-title-normal"><i class="fa fa-volume-up"></i> '+title+'</span>';
    	}else{
    		title ='<span class="app-container-title-normal"><i class="fa fa-volume-up"></i> 系统运行异常</span>';
    	}
    	
    	Ext.create('widget.notification',{
    		position : 'br',
    		ui: 'windowqq',
    		title : title,
    		closeToolText: WY.local.lang.common.clickCloseWindow,
    		closable : true,
    		autoClose : false,
    		autoCloseDelay : 1000,
    		slideInDuration : 1500,
    		width:250,
    		height:300,
    		autoHeight:true,
    		autoScroll:true,
    		slideInAnimation : 'elasticIn',
    		html : message,
    		dockedItems:[
    		   {
    			   xtype: 'toolbar',
    	    	   dock: 'top',
    	    	   border:1,
    	    	   items : [
					{text:'忽略全部',handler:function(){
						this.up('window').close();
					}},
					'->',
					{text:'告知系统管理员',handler:function(){
						this.up('window').close();
						util.info('感谢您的反馈,我们将尽快解决您反馈的问题');
					}}
    	           ]
    		   }
    		]
    	}).show();
    },
    /**
     * add new component to mainPanel
     */
    renderToMain : function(xtypes,title,records){
    	var me = this,
    		mainCard = Ext.ComponentQuery.query('tabpanel[itemId=contentPanel]')[0],
    		existingItem = mainCard.child('component[routeId=' + xtypes + ']');
    	    newView = Ext.create('GasApp.view.' + (xtypes || 'main.Error404Window'), {
                hideMode: 'offsets',
                border : 1,
                routeId : xtypes, //路由,
                title : title,
                iconCls : 'fa fa-book fa-fw',
                closable : true,
                record :records,
                listeners : {
                }
            });
    	if(existingItem){
    		mainCard.setActiveItem(existingItem);
    		newView = existingItem;
    	}else{
	    	Ext.suspendLayouts();
	    	mainCard.setActiveItem(mainCard.add(newView));
	    	Ext.resumeLayouts(true);
    	}
    	if (newView.isFocusable(true)) {
            newView.focus();
        }
    },
    zoom : function(el, offset, type){
    	var width = el.getWidth();  
        var height = el.getHeight();  
        var nwidth = type ? (width * offset) : (width / offset);  
        var nheight = type ? (height * offset) : (height / offset);  
        var left = 0;//type ? -((nwidth - width) / 2) : ((width - nwidth) / 2);  
        var top = 0;//type ? -((nheight - height) / 2) : ((height - nheight) / 2);
        var obj = {  
            height : {to : nheight,from : height},  
            width : {to : nwidth,from : width},  
            left : {by : left},  
            top : {by : top}  
        }
        el.animate(obj, 1, null, 'backBoth', 'motion');  
    },
    dictsConvert : function(type,value){
    	if(!type || !value)
    		return null;
    	var values = window.localStorage.getItem('DICT_'+type);
    	var name = null;
    	if(!values){
    		util.ajax({
        		url : Ext.String.format(constants.url.dict.findDictByTypeAndCode,type,'','true'),
        		ok : function(response){
        			if(response.success && response.list){
        				var datas = response.list;
        				for(var i=0;i<datas.length;i++){
        					if(datas[i].elevalue == value){
        						name = datas[i].elevaluename;
        						break;
        					}
        				}
        				window.localStorage.setItem("DICT_"+type,JSON.stringify(datas));
        			}
        		},
        		async:false
        	});
    		window.util.hide();
    		return name;
    	}else{
    		var datas = JSON.parse(values);
			for(var i=0;i<datas.length;i++){
				if(datas[i].elevalue == value){
					name = datas[i].elevaluename;
					break;
				}
			}
			window.util.hide();
			return name;
    	}
    },
    /**
     * 延迟执行
     * @params fn 延迟执行的方法块
     * @params time 延迟多少秒后执行（毫秒数）
     */
    delayedTask :  function(fn,time){
    	var task = new Ext.util.DelayedTask(fn);
    	task.delay(500);
    },
    /** 
     * 删除数组中的一个元素,给了元素的索引即可 
     *  
     * @param {} 
     *            index 
     * @return {} 
     */  
    arrayDelte : function(arr, index) {  
        if (index < 0)  
            return arr;  
        return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));  
    },  
    /** 
     * 产生从start开始到end结束的随机数字 
     * @param {} 
     *            start 
     * @param {} 
     *            end 
     */  
    randomNum : function(start, end) {  
        return parseInt(Math.random() * (end - start + 1) + start);  
    },
    /**
     * 移动端使用
     * Viewport添加新项,Viewport之中始终只有一项
     * 这里的xtype参数是指视图中的alternateClassName的值
     */
    ePush: function (xtype) {
        //获取容器
        var me = Ext.Viewport,
        //获取当前显示的视图
        view = me.getActiveItem();
        //根据itemId判断视图是否已经被展示了，避免重复展示
        if (view && view.getItemId() == xtype) {
            return;
        }
        //创建视图
        view = Ext.create(xtype, {
            itemId: xtype
        });
        //将视图添加到容器中，并展示
        me.animateActiveItem(view, {
            //视图切换动画效果
            type: 'slide',
            //视图切换方向
            direction: 'left'
        });
    },
    /**
     * 清除grid选中效果
     * @params view gridpanel视图
     */
    clearSelection : function(view){
    	view.getSelectionModel().deselectAll();
    	view.getStore().reload();
    },
    /**
     * 判断对象是否为空
     * @params obj 对象
     */
    isEmptyObject : function(obj) {
    	var t;
    	for (t in obj)
    		return !1;
    	return !0
    },
    /**
     * 刷新数据
     */
    viewLoad: function (view, params, update) {
        var store = view.getStore(),
        storeId = store.storeId;
        if (storeId == 'ext-empty-store') {
            //在ext中，如果使用bind方式绑定store，在加载数据时可能出现store还未绑定到视图中就请求数据的情况
            //这种情况我们就获取到ViewModel，根据ViewModel来加载数据
            //console.log('列表还未绑定store，从ViewModel中加载');
            store = view.getViewModel().getStore(view.getBind().store.stub.name);
        }
        this.storeLoad(store, params, update);
    },
    //store请求数据的方法
    //store数据仓库对象
    //params参数，这是一个json对象，示例{userName:'test',passWord:'test'}
    //update是否强制重新请求数据
    storeLoad: function (store, params, update) {
        //console.log('store正在加载:', store.isLoading(), '参数：', params);
        //如果已经在请求数据，中断
        if (store.isLoading()) {
            return;
        } else if (update) {
            //如果强制刷新，重新设置参数，并且清空数据
            store.getProxy().setExtraParams(params);
            store.removeAll();
        }
            //如果有参数
        else if (params) {
            //获取旧的参数
            var oldParams = store.getProxy().getExtraParams();
            //如果没有数据直接重新请求
            //比较新旧两个参数是否相同，如果不同，重新设置参数，并且清空数据
            //如果相同中断执行
            if (store.getCount() < 1) {
                store.getProxy().setExtraParams(params);
            } else if (!this.equals(oldParams, params)) {
                store.getProxy().setExtraParams(params);
                store.removeAll();
            } else {
                return;
            }
        } else if (store.getCount() > 0) {
            //console.log('已有数据，中断执行');
            //如果没有参数，但是数据已经存在，中断执行
            return;
        }
        //请求数据
        store.loadPage(1);
    },
    /**
     * 设置打印内容
     */
    setPrintContent : function(printContent){
    	LODOP.PRINT_INIT("");		            
		LODOP.ADD_PRINT_HTM(10,55,"100%","100%",printContent);
    },
    /**
     * 打印预览
     */
    printPreview : function(){
    	LODOP.PREVIEW();
    },
    /**
     * 直接打印
     */
    print : function(){
    	LODOP.PRINT();
    }
}, function () {
    window.utils = this;
    window.util = window.utils;
});