package org.gtjy.p2p.plugin.framework;

/**
 * 
 * @ClassName: SuperClassTemplate    <br />
 * @Description: 获取子类模板   <br />
 * @author wys 804253217@qq.com    <br />
 * @date 2016年1月6日 下午7:41:21    <br />
 *
 */
public abstract class SuperClassTemplate extends ClassTemplate{
	protected final Class<?> superClass;
	
	protected SuperClassTemplate(String packageName,Class<?> superClass){
		super(packageName);
		this.superClass = superClass;
	}
}
