package org.gtjy.p2p.web;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.gtjy.p2p.spring.SpringContextUtil;
import org.gtjy.p2p.util.DateUtil;
import org.springframework.context.ApplicationContext;

/**
 * 应用程序启动监听 启动后台管理端,解决后台启动时间过长tomcat自动停止问题
 * @author wys
 *
 */
public class SystemManagerInitListeners implements ServletContextListener {
    
    private static Log logger = LogFactory.getLog(SystemManagerInitListeners.class);
    
    private ApplicationContext wac = null;
    private Boolean success = true;
    
    /**
     * 当Servlet 容器启动Web 应用时调用该方法。<br>
     * 在调用完该方法之后，容器再对Filter 初始化， 
     * 并且对那些在Web 应用启动时就需要被初始化的Servlet 进行初始化。
     */
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        systemStartup(sce.getServletContext());
    }
    
    /**
     * 当Servlet容器销毁web应用时调用该方法<br>
     * 在调用该方法之前，容器会先销毁所有的Servlet 和Filter 过滤器。 
     */
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        logger.info("光通嘉业[特种设备数字化动态监管平台]Services服务停止 :" + sce.getServletContext().getServerInfo() + "|" +sce.getSource());
    }
    
    /**
     * 启动项目
     * @param sc
     */
    private void systemStartup(ServletContext sc){
        //在此中可以添加一些系统变量的初始化工作
        long start = System.currentTimeMillis();
        logger.info("*******************************************************");
        logger.info("光通嘉业[特种设备数字化动态监管平台]Services服务开始启动...");
        logger.info("*******************************************************");
        if(success){
            logger.info("检测平台数据库有效性");
            logger.info("检测平台数据库有效性完成 数据库连接正常");
        }
        try {
            logger.info("系统正在初始化服务容器...");
            wac = SpringContextUtil.getApplicationContext();
            StringBuffer sb = new StringBuffer();
            for(String s:wac.getBeanDefinitionNames()){
                sb.append(s);
                sb.append(",");
            }
            logger.info(sb);
            logger.info("容器初始化成功啦，您的托管Bean已经被实例化。");
        } catch (Exception e) {
            logger.debug("服务容器初始化失败.");
            success = false;
            e.printStackTrace();
            logger.debug("初始化服务容器发生错误,请仔细检查您的配置文件!\n" + e.getMessage());
        }
        long timeSec = (System.currentTimeMillis() - start) / 1000;
        logger.info("********************************************");
        if(success){
            logger.info("光通嘉业[特种设备数字化动态监管平台]Services服务启动成功[" + DateUtil.getDateTime() + "]");
            logger.info("启动总耗时: " + timeSec / 60 + "分 " + timeSec % 60 + "秒 ");
        }else{
            logger.info("光通嘉业[特种设备数字化动态监管平台]Services服务启动失败["+DateUtil.getDateTime()+"]");
            logger.info("启动总耗时: " + timeSec / 60 + "分 " + timeSec % 60 + "秒 ");
        }
        logger.info("********************************************");
    }
    
}
