package org.gtjy.p2p.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * <p> Title: 读取properties配置文件的工具类</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class PropertiesUtil {

	protected static final Log _log= LogFactory.getLog(PropertiesUtil.class);
	private static Properties prop = new Properties();
	private FileOutputStream out;
	static String configFile = "";

	/**
	 * 
	 * 根据传进的文件名载入文件
	 * 
	 * @param fileName
	 *            String
	 * 
	 */

	private PropertiesUtil(String fileName) {
		
	}
	
	public static void setConfig(String filePath){
		try {
			_log.info("loaded " + URLEncoder.encode(filePath, "UTF-8"));
			FileInputStream fin = new FileInputStream(filePath);//URLEncoder.encode(filePath, "UTF-8")
			prop.clear();    //清空
			prop.load(fin);// 加载文件 
			fin.close();
		} catch (Exception e) {
			_log.error(e.getMessage(),e);
		}
	}
	@SuppressWarnings("all")
	public static Properties getKeyStartWithBy(String prefix){
		Properties properties = new Properties();
		String key = "";
		Iterator it = prop.entrySet().iterator();
		while(it.hasNext()){
			Entry entry = (Entry)it.next();
			key = entry.getKey().toString();
			if(key.startsWith(prefix)){
				properties.setProperty(entry.getKey().toString(),entry.getValue().toString());
			}
		}
		return properties;
	}
	
	public static String getValue(String key) {
		return prop.getProperty(key);
	}

	public static String get(String key) {
		return (String) prop.get(key);
	}

	public static void setValue(String key, String value) {
		prop.setProperty(key, value);
	}

	public void putValue(String key, String value) {
		prop.put(key, value);
	}

	public static Properties getProperties(){
		return prop;
	}

	public void saveFile(String fileName, String description) throws Exception {
		try {
			File f = new File(fileName);
			out = new FileOutputStream(f);
			prop.store(out, description);// 保存文件
			out.close();
		} catch (IOException ex) {
			throw new Exception("无法保存指定的配置文件:" + fileName);
		}
	}
}
