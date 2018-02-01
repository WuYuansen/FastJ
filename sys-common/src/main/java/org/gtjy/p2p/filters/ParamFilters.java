package org.gtjy.p2p.filters;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.gtjy.p2p.JSON.JSONUtil;
import org.gtjy.p2p.constants.ParamMap;
import org.gtjy.p2p.security.Des;
import org.gtjy.p2p.util.DateUtil;

/**
 * 
 * <p> Title: URL参数过滤器</p>
 * <p> Description: 拦截并获取系统所有url中的参数并存储到Map对象中map对象支持直接转换成javaBean</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class ParamFilters implements Filter {
	
	private static Log logger = LogFactory.getLog(ParamFilters.class);
	
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		logger.info(DateUtil.getDateTime() + " 初始化URL参数过滤器，并配置参数");
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		@SuppressWarnings("rawtypes")
		Map map = httpRequest.getParameterMap();
		Object parameterDES = map.get("d");
		String url =parameterDES == null?"{}":JSONUtil.ConvertJSONByObject(parameterDES).toString();
		if(url != "{}" && !url.equals("{}")){
			Des desObj = new Des();
			String desURL = desObj.strDec(url.substring(2,url.length()-2));
			String[] paramsDes = desURL.split("&"); 
			for (int i = 0; i < paramsDes.length; i++) {  
	            String[] p = paramsDes[i].split("=");  
	            if (p.length == 2) {  
	                ParamMap.put(p[0], p[1]);  
	            }  
	        } 
			filterChain.doFilter(request, response);//继续执行
		}else{
			filterChain.doFilter(request, response);//继续执行
		}
	}

	@Override
	public void destroy() {
		logger.info(DateUtil.getDateTime() + " 调用完成执行销毁URL参数过滤器，并且情况MAP对象中所有参数键值");
	}
	
	/**
	 * 将用户请求URL转换成系统自定义的map对象中 (废除不用了)
	 * @param url
	 */
	protected void convertParamMap(String url) {
		if(url.contains("?_p=")){
//			logger.info("包含");
			String lastURL = url.substring(url.indexOf("?"), url.length());
//			logger.info("截取过后的url："+lastURL);
			Map<String, Object> map = new HashMap<String, Object>(0);  
			String[] params = lastURL.split("&");  
	        for (int i = 0; i < params.length; i++) {  
	            String[] p = params[i].split("=");  
	            if (p.length == 2) {  
	                map.put(p[0], p[1]);  
	            }  
	        }  
//	        logger.info(JSONUtil.ConvertJSONByObject(map));
			Object parameterDES = map.get("d");
			Des desObj = new Des();
			String desURL = desObj.strDec(parameterDES.toString());
//			logger.info("解密后的url:"+desURL);
			String[] paramsDes = desURL.split("&"); 
			for (int i = 0; i < paramsDes.length; i++) {  
	            String[] p = paramsDes[i].split("=");  
	            if (p.length == 2) {  
	                ParamMap.put(p[0], p[1]);  
	            }  
	        } 
			System.out.println("解密过后压缩到map对象"+JSONUtil.ConvertJSONByObject(ParamMap.getParameterMap()));
		}else{
//			logger.info("不包含");
		}
	}
}
