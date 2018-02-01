package org.gtjy.p2p.log4j;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.PropertyConfigurator;
import org.gtjy.p2p.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * <p> Title: 用来初始化log4j的配置信息.</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class Log4jStart extends HttpServlet  {
	
	private static final long serialVersionUID = 1L;
	
	private static final Logger logger = LoggerFactory.getLogger(Log4jStart.class);
	/**
     * Servlet初始化
     */
    public void init(ServletConfig config) throws ServletException {
        String root = config.getServletContext().getRealPath("/");
        String log4jLocation = config.getInitParameter("log4jLocation");
        System.setProperty("webRoot", root);
        logger.info("系统日志文件:" + log4jLocation);
        System.out.println(DateUtil.getDateTime() + "system load log4j properties from file"+ root+log4jLocation);
        if (!"".equals(log4jLocation)) {
            PropertyConfigurator.configure(root + log4jLocation);
        }
    }
}
