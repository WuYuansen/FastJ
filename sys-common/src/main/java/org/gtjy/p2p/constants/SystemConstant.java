package org.gtjy.p2p.constants;


/**
 * 
 * <p> Title: 系统公共变量 </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class SystemConstant {
	/** 文件路径分隔符 解决window 和linux下文件路径问题 **/
    
	public static final String SEPARATOR = System.getProperties().getProperty("file.separator");//File.separator;
	/** 正式环境还是开发环境 **/
	public static final boolean devMode = true;
	/** 系统编码 **/
	public static final String SYSTEM_ENCODE_UTF8 = "UTF-8";
	/** 格式化时间格式(yyyy-MM-dd HH:mm:ss)  **/
	public static final String FORMAT_DATE_ALL_24 = "yyyy-MM-dd HH:mm:ss";
	/** 格式化时间格式(yyyy-MM-dd) **/
	public static final String FORMAT_DATE_SIMPLE = "yyyy-MM-dd";
	/** 验证码session存储变量 **/
	public static final String VERIFY_TYPE_COMMENT="VERIFY_TYPE_COMMENT";
	/** 系统session用户存储变量 **/
	public static final String SESSION_USER="SESSION_USER";
	/** 系统session用户存储变量 前端 **/
	public static final String SESSION_USER_FRONT="FRONT_ACCOUNT";
	/** 系统权限编号 **/
	public static final String SESSION_PRIVIEW = "SESSION_PRIVIEW";
	/** 前端 **/
	public static final String SESSION_PRIVIEW_FRONT = "SESSION_PRIVIEW_FRONT";
	/** 系统权限访问地址 **/
	public static final String SESSION_PRIVIEW_URL="SESSION_PRIVIEW_URL";
	/** java令牌 **/
	public static final String TOKEN_VALUE = "TOKEN";
	/** 业务类型定义 用于用户附加上传 **/
	public static final String USERPHOTO = "p_register";	//用户头像上传
	
	public static final String IDCARDPHOTO = "p_loan";	//用户身份证
	public static final String MONEYSTREAM	= "p_loan";			//工资流水
	public static final String XYBG	= "p_loan";	//信用报告
	//担保人
	public static final String DBRSFZ="p_loan";
	//工作证明
	public static final String GZZM="p_loan";
	//住址证明	
	public static final String ZZZM="p_loan";
	//商贷进账单
	public static final String SDJZD="p_loan";
	
	/**  数据缓存兼职 **/
	public static final String CACHE_DICT_MAP = "dicMap";
	public static final String CACHE_XZQ_MAP = "xzqMap";
	
	// 显示/隐藏
    public static final String SHOW = "1";
    public static final String HIDE = "0";

    // 是/否
    public static final String YES = "1";
    public static final String NO = "0";
    
    // 对/错
    public static final String TRUE = "true";
    public static final String FALSE = "false";
	
}
