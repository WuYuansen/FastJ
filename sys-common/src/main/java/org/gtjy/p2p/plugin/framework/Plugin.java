package org.gtjy.p2p.plugin.framework;

/**
 * 
 * @ClassName: Plugin    <br />
 * @Description:  插件接口 <br />
 * @author wys 804253217@qq.com    <br />
 * @date 2016年1月6日 下午7:20:33    <br />
 *
 */
public interface Plugin {
	/**
	 * 
	 * @Title: init    <br />
	 * @Description: 初始化插件    <br />
	 * @param     设定文件    <br />
	 * @return void    返回类型    <br />
	 * @throws
	 */
	void init();
	/**
	 * 
	 * @Title: destroy    <br />
	 * @Description: 销毁插件   <br />
	 * @param     设定文件    <br />
	 * @return void    返回类型    <br />
	 * @throws
	 */
	void destroy();
}
