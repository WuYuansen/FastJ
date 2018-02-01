package org.gtjy.p2p.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * <p> Title: java的普通类中获取Session以及request对象</p>
 * <p> Description: 调用方法: 
 * 	/获取request
 * HttpServletRequest request = RequestFilter.threadLocal.get();
 * request.getSession().getAttribute("所保存的名称");
 * HttpServletRequest request = RequestFilter.threadLocal.get();这句话一定要放在方法里面，不能放在方法外面。
 * </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class RequestFilter implements Filter {
	// 创建线程
	public static ThreadLocal<HttpServletRequest> threadLocalRequest = new ThreadLocal<HttpServletRequest>();
	public static ThreadLocal<HttpServletResponse> threadLocalResponse = new ThreadLocal<HttpServletResponse>();

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		threadLocalRequest.set((HttpServletRequest) arg0);
		threadLocalResponse.set((HttpServletResponse) arg1);
		arg2.doFilter(arg0, arg1);
	}

	public void destroy() {
	}

	public void init(FilterConfig arg0) throws ServletException {
	}
}
/*
在类RequestFilter中写好代码后在WEB-INF目录下的web.xml文件中注册此类，
<filter>
   <filter-name>RequestFilter</filter-name>
   <filter-class>架包名.RequestFilter</filter-class>
</filter>
<filter-mapping>
   <filter-name>RequestFilter</filter-name>
   <url-pattern>/*</url-pattern>
</filter-mapping>
<filter-mapping>
   <filter-name>RequestFilter</filter-name>
   <url-pattern>*.do</url-pattern>
</filter-mapping>
*/
