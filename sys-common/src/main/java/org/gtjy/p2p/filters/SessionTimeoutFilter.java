package org.gtjy.p2p.filters;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.gtjy.p2p.constants.SystemConstant;
import org.gtjy.p2p.util.CookieUtils;
import org.gtjy.p2p.web.session.SessionUtil;

/**
 * 
 * 
 * SessionTimeoutFilter
 * 
 * 2015年6月8日 下午12:04:12
 * @author：wys
 * @version 1.0.0
 *
 */
public class SessionTimeoutFilter implements Filter {
    private String login = "/index.jsp";   //登录页面
    private String timeOut = "/index.jsp";//超时页面
    private String overleap_path = null;    //允许未登录用户访问的地址
    private String overleap_file = null;    //允许未登录用户访问的文件后缀
    
    public void init(FilterConfig config) throws ServletException {
        this.login = config.getInitParameter("login");
        this.overleap_path = config.getInitParameter("overleap_path");
        this.overleap_file = config.getInitParameter("overleap_file");
    }

    public void doFilter(ServletRequest req, ServletResponse res,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request=(HttpServletRequest) req;
        HttpServletResponse response=(HttpServletResponse) res;
        String requestUri = request.getRequestURI();
        String contextPath = request.getContextPath();
        String path = requestUri.substring(contextPath.length());
        Object obj = SessionUtil.getAttr(request, SystemConstant.SESSION_USER);
        if(obj == null) {
            if(checkFileName(path,overleap_file) || checkPath(path,overleap_path) || path.equals(login)) {
                chain.doFilter(request,response);
            }else{
                    if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {    //ajax超时处理      
                        response.addHeader("sessionstatus", "timeout");  
                        Cookie[] cookies = request.getCookies();
                 		if (cookies != null) {
                 			for (Cookie tmpCookie : cookies) {
                 				if ("token".equals(tmpCookie.getName())) {
                 					CookieUtils.removeCookie(response, "token");
                 				}
                 			}
                 		}
                        PrintWriter writer = response.getWriter();
                        writer.print("{\"sessionstatus\":\"timeout\"}");
                        writer.flush();
                        writer.close();
                    }else{
                    	Cookie[] cookies = request.getCookies();
                 		if (cookies != null) {
                 			for (Cookie tmpCookie : cookies) {
                 				if ("token".equals(tmpCookie.getName())) {
                 					CookieUtils.removeCookie(response, "token");
                 				}
                 			}
                 		}
                        response.sendRedirect(request.getContextPath()+timeOut);
                    }
            }
        }else {
            chain.doFilter(request,response);
        }
    }

    public void destroy() {
        //do nothing
    }

    public boolean checkPath(String path,String rule) {
        boolean ok = false;
        //如果rule为*,则允许访问任何路径;如果为空,则不允许访问任何路径
        if("*".equals(rule))
            return true;
        else if(StringUtils.isEmpty(rule))
            return false;
        
        String[] rules = org.gtjy.p2p.util.StringUtils.splitString(rule,",");
        for(int i=0;i<rules.length;i++) {
            if(path.startsWith(rules[i])) {
                ok = true;
                break;
            }
        }
        return ok;
    }
    
    public boolean checkFileName(String fileName,String rule) {
        boolean ok = false;
        //如果rule为*,则允许访问任何文件;如果为空,则不允许访问任何文件
        if("*".equals(rule))
            return true;
        else if(StringUtils.isEmpty(rule))
            return false;
        
        String exName = "";
        int a = fileName.lastIndexOf(".");
        if(a!=-1)
            exName = fileName.substring(a+1);
        else
            return false;
        
        String okName [] = org.gtjy.p2p.util.StringUtils.splitString(rule,",");
        for(int i=0;i<okName.length;i++) {
            if(exName.equalsIgnoreCase(okName[i])) {
                ok = true;
                break;
            }
        }
        return ok;
    }
}
