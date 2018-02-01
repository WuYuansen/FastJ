package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.web.session.SessionUtil;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;



/**
 * 
 * <p> Title: 系统访问权限页面设置  </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class AuthInterceptor implements HandlerInterceptor {
	private List<String> excepUrlPattern;  //需要排除的URL正则表达式
	private List<String> excludeUrls;	//排除拦截的URL地址
	 
	/**
	 * 在调用controller具体方法前拦截
	 */
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
		String requestUri = request.getRequestURI();
		String contextPath = request.getContextPath();
		String url = requestUri.substring(contextPath.length());
        if (SessionUtil.getCurrentUser(request) == null) {
            request.setAttribute("msg_info", "您还没有登录或登录已超时，请重新登录，然后再刷新本功能！");
            response.sendRedirect(contextPath+"/services/login");
            return false;
        } else if (url.isEmpty()) {
            response.sendRedirect(contextPath+"/login");
            return false;
        } else if (StringUtils.ListToString(excludeUrls).contains(url)) {
            return true;
        } else {
            return true;
        }
	}
	
	/**
     * 完成页面的render后调用
     */
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception exception) throws Exception {

    }

    /**
     * 在调用controller具体方法后拦截
     */
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView modelAndView) throws Exception {

    }
	
	public List<String> getExcludeUrls() {
        return excludeUrls;
    }

    public void setExcludeUrls(List<String> excludeUrls) {
        this.excludeUrls = excludeUrls;
    }
    
    public List<String> getExcepUrlPattern() {
        return excepUrlPattern;
    }
    
    public void setExcepUrlPattern(List<String> excepUrlPattern) {
        this.excepUrlPattern = excepUrlPattern;
    }
}