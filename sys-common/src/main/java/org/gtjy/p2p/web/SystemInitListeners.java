package org.gtjy.p2p.web;

import java.io.File;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.gtjy.p2p.constants.WebConstants;
import org.gtjy.p2p.plugin.framework.PluginHelper;
import org.gtjy.p2p.util.DateUtil;
import org.gtjy.p2p.util.MapUtil;
import org.springframework.context.ApplicationContext;

/**
 * 应用程序启动监听
 * @author wys
 *
 */
public class SystemInitListeners implements ServletContextListener{

//	private static Log logger = LogFactory.getLog(SystemInitListeners.class);

	@SuppressWarnings("unused")
	private ApplicationContext wac = null;
	
//	private Boolean success = true;
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
		System.out.println("fastJ快速开发平台服务停止 :" + sce.getServletContext().getServerInfo() + "|" +sce.getSource());
	}
	
	/**
	 * 启动项目
	 * @param sc
	 */
	private void systemStartup(ServletContext sc){
		//在此中可以添加一些系统变量的初始化工作
		long start = System.currentTimeMillis();
		StringBuilder sb = new StringBuilder();
        sb.append("\r\n======================================================================\r\n");
        sb.append("\r\n    欢迎使用  fastJ快速开发平台-开发框架   - Powered By Loser森 15909910367@163.com\r\n");
        sb.append("\r\n======================================================================\r\n");
        System.out.println(sb.toString());
        System.out.println();
        System.out.println("----->系统已成功装载系统管理模块");
        Class<?>[] classList = {PluginHelper.class};
        for(Class<?> cls : classList){
        	loadClass(cls.getName(), true);
        }
        //加载字典数据
        System.out.println();
		long timeSec = (System.currentTimeMillis() - start) / 1000; 
		System.out.println("********************************************");
		System.out.println("fastJ快速开发平台-开发框架 启动成功[" + DateUtil.getDateTime() + "]");
		System.out.println("启动总耗时: " + timeSec / 60 + "分 " + timeSec % 60 + "秒 ");
		System.out.println("********************************************");
	}
	
	private static Class<?> loadClass(String className,boolean isInititalized){
		Class<?> cls;
		try {
			cls = Class.forName(className,isInititalized,Thread.currentThread().getContextClassLoader());
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("load class error",e);
		}
		return cls;
	}
	
	/**
	 * 解析查询xml
	 * @return
	 * @throws DocumentException
	 */
	public void parseXml(){
		try {
			// 创建saxReader对象
			SAXReader reader = new SAXReader();
			// 通过read方法读取一个文件 转换成Document对象
			Document document = reader.read(new File(this.getClass().getResource("/").getPath()+"/search.xml"));
			//获取根节点元素对象
			Element root = document.getRootElement();
			for (Iterator<?> i_pe = root.elementIterator(); i_pe.hasNext();) { 
			       Element e_pe = (Element) i_pe.next(); 
			       Map<String,String> elementMap = MapUtil.newHashMap();
			       elementMap.put(e_pe.attributeValue("id"), e_pe.getData().toString());
			       WebConstants.searchMap.add(elementMap);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	} 
}
