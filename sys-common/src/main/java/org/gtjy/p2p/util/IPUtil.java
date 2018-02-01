package org.gtjy.p2p.util;

import javax.servlet.http.HttpServletRequest;

/**
 * 
 * <p> Title: 获取用户访问真实IP地址</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class IPUtil {
	
	/**
	 * 获取用户实际IP地址
	 * @param request
	 * @return
	 */
	public static String getRemortIp(HttpServletRequest request) {
		String ipAdd = request.getHeader("x-forwarded-for");
		if (ipAdd == null || ipAdd.length() == 0
				|| "unknown".equalsIgnoreCase(ipAdd)) {
			ipAdd = request.getHeader("Proxy-Client-IP");
		}
		if (ipAdd == null || ipAdd.length() == 0
				|| "unknown".equalsIgnoreCase(ipAdd)) {
			ipAdd = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ipAdd == null || ipAdd.length() == 0
				|| "unknown".equalsIgnoreCase(ipAdd)) {
			ipAdd = request.getRemoteAddr();
		}
		return ipAdd;
	}
}
