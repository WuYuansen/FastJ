/**
 * 
 * <p>
 * Title:VTypes EXTJS MODEL
 * </p>
 * <p>
 * Description: 系统输入校验规则定义
 * </p>
 * <p>
 * Copyright: Copyright (c) 2017
 * </p>
 * <p>
 * Company:乌鲁木齐光通嘉业网络服务有限公司
 * </p>
 * <p>
 * 匹配险金明细比例 基数上限下限对比 验证邮箱 验证企业账号 验证执照号码 验证服务人数 验证经营地址或注册地址 验证网址，www开头 验证手机号码
 * 验证传真号码 验证合作伙伴名称 验证人名
 * </p>
 * 
 * @author wys
 * @version 1.0
 */
Ext.define('wys.form.field.VTypes',{
    override : 'Ext.form.field.VTypes',
    /**
	 * 匹配险金明细比例
	 */
    rate:function(value,object){
        var max=object.max,
            min=object.min,
            value=Number(value);
        if(value+''!="NaN"){
            if(value>=min&&value<=max){
                object.vtypeText="输入值范围为"+min+"到"+max;
                return true;
            }
        }else{
            object.vtypeText="只能输入>=0的数值";
        }
    },
    /**
	 * 上限下限对比，上限可以等于下限
	 */
    compareMaxMin:function(value,object){
        var maxObj=object.maxObj,
            minObj=object.minObj,
            value=Number(object.getValue());// 因为combo机制，value无法直接取到值，所以从object取值

        if(value+''!="NaN"){
            if(minObj){// 如果当前是上限的对象
                var minObjValue=Number(object.up("[viewModel]").down("[tag="+minObj+"]").getValue());
                if(value>=minObjValue){
                    return true;
                }
                else{
                    object.vtypeText="请输入比"+minObjValue+"大的数值";
                    return false;
                }
            }else if(maxObj){// 如果当前是下限的对象
                var maxObjValue=Number(object.up("[viewModel]").down("[tag="+maxObj+"]").getValue());
                if(value<=maxObjValue||maxObjValue==""){
                    return true;
                }else{
                    object.vtypeText="请输入比"+maxObjValue+"小的数值";
                    return false;
                }
            }
        }else{
            object.vtypeText="只能输入>=0的数值";
        }
    },
    /**
	 * 上限下限对比，对比逻辑依赖于其它因素 compareGroup:进行对比的组，考虑到同一个页面可能有多个带有依赖项的对比组，所以通过此参数进行区分
	 * dependent:在对比组中，需要依赖的项
	 */
    compareDependentMaxMin:function(objValue,object){
        var maxObj,
            minObj,
            dependentObj,
            compareGroupName = object.compareGroup,
            compareGroup = Ext.ComponentQuery.query("[compareGroup="+compareGroupName+"]"),
            value=Number(object.getValue());// 因为combo机制，value无法直接取到值，所以从object取值

        // 循环所有属于同组的控件，根据dependent筛选出需要依赖的项
        Ext.each(compareGroup,function(item,index,self){
            if(item.dependent!=undefined){
                dependentObj = item;
            }
        });

        // 循环所有属于同组的控件，根据dependent的值决定maxObj和minObj对应的项
        Ext.each(compareGroup,function(item,index,self){
            var depObj = dependentObj;
            // 如果当前选择是A<B
            if(depObj.dependent[depObj.getValue()]=='less'){
                // 将第一个控件设为minObj
                if(index==0){
                    item.tag=compareGroupName+'minObj';
                    item.maxObj = compareGroupName+'maxObj';
                    if(item.minObj){
                        delete item.minObj;
                    }
                }
                if(index==2){
                    item.tag=compareGroupName+'maxObj';
                    item.minObj = compareGroupName+'minObj';
                    if(item.maxObj){
                        delete item.maxObj;
                    }
                }
            }else{
                // 将第一个控件设为maxObj
                if(index==0){
                    item.tag=compareGroupName+'maxObj';
                    item.minObj = compareGroupName+'minObj';
                    if(item.maxObj){
                        delete item.maxObj;
                    }
                }
                if(index==2){
                    item.tag=compareGroupName+'minObj';
                    item.maxObj = compareGroupName+'maxObj';
                    if(item.minObj){
                        delete item.minObj;
                    }
                }
            }
        });
        return true;
    },
    card: function (value, field) {
    },
    /**
	 * 验证登录系统的用户名 
	 * 
	 * @param {value}
	 *            str 输入值
	 * @param {field}
	 *            obj textfield
	 */
    userName: function(value,field) {
        var me=this,isEmail,isMobile;
        // 验证邮箱
        isEmail=me.checkEmail(value);
        // 验证手机号
        isMobile=me.checkMobile(value);
        if(isEmail||isMobile) {
            return true;
        } else {
            return false;
        }
        return true;
    },
    /*
	 * 检测验证码 @param {value} str 输入的验证码
	 */
    code: function(value,object) {
        var data={},backInfo="";
        var url="验证码请求地址";
        data.code=value.toUpperCase();
        data.regType=-1;
        Ext.Ajax.request({
            method: "POST",
            url: url,
            params: data,
            async: false,
            success: function(response,opts) {
                backInfo=response.responseText;
            }
        });
        return backInfo=="1"?true:false;
    },
    /**
	 * 验证邮箱
	 * 
	 * @param {string}
	 *            str 邮箱
	 */
    checkEmail: function(str,object) {
        var regTxt=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        object.vtypeText='请输入正确的Email';
        return regTxt.test(str.toLowerCase());
    },
    /**
	 * 验证手机号码
	 * 
	 * @param {string}
	 *            str 电话号码
	 */
    checkMobile: function(str) {
        var regTxt=/^((\+?86)|(\(\+86\)))?1\d{10}$/;
        return regTxt.test(str.replace(/\-/g,""));
    },
    
    
    /***
     * 验证汉字加其他字母的长度
     */
    maxInputLength:function(str,object){
    	var maxLength=object.maxlen;
    	var len=str.length;
       if(maxLength>=len){
    	   return true;
       }else{
    	   object.vtypeText='您输入的内容超出长度';
       }
    },
    
    /**
	 * 身份证验证
	 * 
	 * @param str
	 * @param object
	 * @returns
	 */
    
    cardText:function(str,object){
    	
   	 var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;
        
        if(!str || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(str)){
            object.vtypeText='身份证号格式错误';
            pass = false;
        }
       else if(!city[str.substr(0,2)]){
       	object.vtypeText= '地址编码错误';
            pass = false;
        }
        else{
            // 18位身份证需要验证最后一位校验位
            /*if(str.length == 18){
            	str = str.split('');
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = str[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != str[17]){
               	 object.vtypeText= '校验位错误';
                    pass =false;
                }
            }*/
        }
        return pass;
   },
    /**
	 * 验证企业账号
	 */
    checkIknowId:function(value,object){
        var regTxt=/^(\+?[1-9][0-9]*|0)$/;
        object.vtypeText='请输入正确的企业账号';
        return regTxt.test(value)
    },
    /**
	 * 
	 * 验证执照号码
	 */
    checkRegCode:function(value,object){
        var regTxt=/^\+?[1-9][0-9]*$/;
        object.vtypeText='请输入正确的执照号码';
        return regTxt.test(value);
    },
    /**
	 * 验证服务人数 规则为 1、正整数 2、最大长度5位
	 */
    checkServiceEmCount:function(value,object){
        var regTxt=/^[1-9][0-9]{0,4}$/;
        object.vtypeText='请输入正确的服务人数（最大长度5位的正整数）';
        return regTxt.test(value);
    },
    /**
	 * 验证经营地址或注册地址 规则为"中文或英文或数字"
	 */
    checkAddress:function(value,object){
        var regTxt=/^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
        object.vtypeText='请输入正确的地址（只能输入中文或英文或数字）';
        return regTxt.test(value);
    },
    /**
     * 验证是否中文
     */
    checkChainese : function(value,object){
    	var regTxt=/^[\u4e00-\u9fa5]+$/;
        object.vtypeText='只能输入中文';
        return regTxt.test(value);
    },
    /**
	 * 验证网址，www开头
	 */
    checkWebSite:function(value,object){
        var regTxt=/^[wW]{3}\.[\w-]+\.\w{2,4}(\/.*)?$/;
        object.vtypeText='请输入正确的网址（www开头）';
        return regTxt.test(value);
    },
    /**
	 * 验证手机号码
	 */
    checkMobile:function(value,object){
        var regTxt=/^1[1-9]\d{9}$/;
        object.vtypeText='请输入正确的手机号码（11位数字）';
        return regTxt.test(value);
    },
    /**
     * 校验手机以及座机
     */
    checkMobildAndTel : function(value,object){
    	var regTxt = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    	object.vtypeText = "您输入的联系方式有误请重写输入座机格式0000-000000手机13*********";
    	return regTxt.test(value);
    },
    /**
	 * 验证传真号码
	 */
    checkFax:function(value,object){
        var regTxt=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
        object.vtypeText='请输入正确的号码';
        return regTxt.test(value);
    },
    /**
	 * 验证人名
	 */
    checkName:function(value,object){
        var regTxt=/^[a-zA-Z?:·\u4e00-\u9fa5]+$/;
        object.vtypeText='请输入正确的姓名，只能含汉字和字母';
        return regTxt.test(value);
    },
    /**
     * 检测是否输入的是拼音
     */
    checkPy : function(value,object){
    	var regTxt=/^[a-zA-Z]+$/;
        object.vtypeText='此输入项不正确，只能输入字母';
        return regTxt.test(value);
    },
    /**
	 * 验证两个文本框的值是否一致
	 * 
	 * @param val
	 * @param field
	 */
    repetition: function(val, field) {
        if (field.repetition) {
            var cmp =field.up('form').getForm().findField(field.repetition.targetCmpId);
            if (Ext.isEmpty(cmp)) {
                util.err('发生异常错误，指定的组件未找到')
                return false;
            }
            if (val == cmp.getValue()) {
                return true;
            } else {
                return false;
            }
        }
    },
    repetitionText: '两次输入的值不一致请检查',
    dateRange : function(val, field) {    //时间校验
        var date = field.parseDate(val);    
        if (!date) {    
            return;    
        }    
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {    
            var start = field.up().down('datefield[name='+field.startDateField+']'); 
            start.setMaxValue(date);    
            start.validate();    
            this.dateRangeMax = date;    
        } else if (field.endDateField&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up().down('datefield[name='+field.endDateField+']');
            end.setMinValue(date);    
            end.validate();    
            this.dateRangeMin = date;    
        }    
        return true;    
	},  
	daterangeText : '开始时间必须小于结束时间',
	/**
	 * IP地址校验
	 */
    checkIP:function(value,object){
        var regTxt=/^(1|([1-9]{1,2}|[1-9]0)|(1[0-9]{2}|2[0-5]{2}))((.(0|([1-9]{1,2}|[1-9]0)|(1[0-9]{2}|2[0-5]{2}))){2}).(1|([1-9]{1,2}|[1-9]0)|(1[0-9]{2}|2[0-5]{2}))$/;
        object.vtypeText='请输入正确的IP地址，例如：192.168.0.1';
        return regTxt.test(value)
    }
})