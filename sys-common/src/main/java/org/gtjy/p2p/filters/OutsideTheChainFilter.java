package org.gtjy.p2p.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * OutsideTheChainFilter 防盗链过滤器
 * 
 * 2015年4月3日 下午1:43:19
 * @author：wys
 * @version 1.0.0
 *
 */
public class OutsideTheChainFilter implements Filter {
    
    private static Log logger = LogFactory.getLog(OutsideTheChainFilter.class);

    private String urls = null; //可以在浏览器地址栏中直接访问的地址
    private String localPath = null;    //项目地址
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        logger.info("光通嘉业[特种设备数字化动态监管平台]防盗链过滤器初始化");
        if(filterConfig.getInitParameter("urls") != null){
            urls = filterConfig.getInitParameter("urls");
        }
        if(filterConfig.getInitParameter("localPath") != null){
            localPath = filterConfig.getInitParameter("localPath");
        }
        for(String u : urls.split(",")) {
            logger.info("可用地址:"+u);
        }
        logger.info("项目访问地址:"+localPath);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        @SuppressWarnings("unused")
        String referer = req.getHeader("referer"); //获取请求连接是从那里来的
//        if(referer != null && referer.trim().startsWith(localPath)) {
            filterChain.doFilter(request, response);
            return;    
//        }else {
//            throw new OutSideTheChainException();
//        }
    }

    @Override
    public void destroy() {
        // TODO Auto-generated method stub
    }

}
