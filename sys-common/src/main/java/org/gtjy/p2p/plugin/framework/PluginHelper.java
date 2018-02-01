package org.gtjy.p2p.plugin.framework;

import java.util.ArrayList;
import java.util.List;

import org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception.ControllerException;

/**
 * 
 * @ClassName: PluginHelper    <br />
 * @Description: 初始化插件    <br />
 * @author wys 804253217@qq.com    <br />
 * @date 2016年1月6日 下午7:38:07    <br />
 *
 */
public class PluginHelper {
	private static final List<Plugin> pluginList = new ArrayList<Plugin>();
	
	static {
		try {
			List<Class<?>> pluginClassList =  getClassListBySuper("com.gtjy.p2p.modules",Plugin.class);
			for(Class<?> pluginClass : pluginClassList){
				Plugin plugin = (Plugin)pluginClass.newInstance();
				plugin.init();
				pluginList.add(plugin);
			}
		} catch (Exception e) {
			throw new ControllerException("init pluginHelper error" +e.getMessage());
		}
	}
	
	public static List<Plugin> getPluginList(){
		return pluginList;
	}
	
	private static List<Class<?>> getClassListBySuper(String packagename,Class<?> superClass){
		return new SuperClassTemplate(packagename,superClass) {
			@Override
			public boolean checkAddClass(Class<?> cls) {
				return superClass.isAssignableFrom(cls) && !superClass.equals(cls);
			}
		}.getClassList();
	}
}
