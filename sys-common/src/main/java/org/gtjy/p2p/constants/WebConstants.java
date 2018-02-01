package org.gtjy.p2p.constants;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 
 * <p> Title: 系统web公共变量 </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class WebConstants {
	/* 系统访问路径 */
	public static final String BASEPATH = "basePath";
	
	public static final String PAYBILLNO = "payOrderNo"; //支付单号
	
	public static final String TOKEN_PAY = "token_pay";	//
	
	public static final String SEPARATOR = File.separator;
	
	/** 支付页面跳转相关 **/
	public static final String PAYBILLNO_BANKPAGF = "payBillNo";
	public static final String PAYMONEY_BANKPAGF = "payMoney";
	public static final String PAYTOKEN_BANKPAGF = "payToken";
	public static final String FORWORDBANK_BANKPAGF = "forwordBank";
	public static final String PAYTYPE_BANKPAGF = "payType";
	public static final List<Map<String,String>> searchMap = new ArrayList<Map<String,String>>();
}
