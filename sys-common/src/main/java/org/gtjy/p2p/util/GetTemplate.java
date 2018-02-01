package org.gtjy.p2p.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;

import org.gtjy.p2p.constants.SystemConstant;

/**
 * 
 * <p> Title: 获取模板页面<br>
 * <p> Description: 模板页面存放地址为:conf/template 中</p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class GetTemplate {
	private static GetTemplate tem = new GetTemplate();
	
	/**
	 * 根据文件名称获取模本文件内容 
	 * 
	 * @param temName
	 * @return
	 * @throws IOException 
	 */
	public static String getTemplate(String temName) throws IOException{
		File f = new File(tem.getWebInfPath()+SystemConstant.SEPARATOR+"WEB-INF"+SystemConstant.SEPARATOR+"classes"+SystemConstant.SEPARATOR+"template"+SystemConstant.SEPARATOR+temName);   
        InputStream in = new FileInputStream(f);   
		StringBuffer template = new StringBuffer(512);
		BufferedReader reader = null;
		try{
			reader = new BufferedReader(new InputStreamReader(in,"UTF-8"));
			do{
				String line = reader.readLine();
				if(line==null)
					break;
				template.append(line);
				template.append("\r\n");
			}while(true);
		}finally{
			if(in!=null){
				try{
					in.close();
				}catch(Exception e){}
			}
			if(reader!=null){
				try{
					reader.close();
				}catch(Exception e){}
			}
		}
		return template.toString();
	}
	
	public static String getTemplate2(String filePath) throws IOException{
		File f = new File(filePath);   
        InputStream in = new FileInputStream(f);   
		StringBuffer template = new StringBuffer(512);
		BufferedReader reader = null;
		try{
			reader = new BufferedReader(new InputStreamReader(in,"UTF-8"));
			do{
				String line = reader.readLine();
				if(line==null)
					break;
				template.append(line);
				template.append("\r\n");
			}while(true);
		}finally{
			if(in!=null){
				try{
					in.close();
				}catch(Exception e){}
			}
			if(reader!=null){
				try{
					reader.close();
				}catch(Exception e){}
			}
		}
		return template.toString();
	}
	
	/**
	 * 根据文件名称获取模本文件内容 
	 * 
	 * @param temName
	 * @return
	 * @throws IOException 
	 */
	public static String getTemplate(File filePath) throws IOException{
        InputStream in = new FileInputStream(filePath);   
		StringBuffer template = new StringBuffer(512);
		BufferedReader reader = null;
		try{
			reader = new BufferedReader(new InputStreamReader(in,"UTF-8"));
			do{
				String line = reader.readLine();
				if(line==null)
					break;
				template.append(line);
				template.append("\r\n");
			}while(true);
		}finally{
			if(in!=null){
				try{
					in.close();
				}catch(Exception e){}
			}
			if(reader!=null){
				try{
					reader.close();
				}catch(Exception e){}
			}
		}
		return template.toString();
	}
	
	/**
	 * 获取项目WEB-INF目录
	 * @return
	 */
	private String getWebInfPath(){  
        URL url = getClass().getProtectionDomain().getCodeSource().getLocation();  
        String path = url.toString();  
        int index = path.indexOf("WEB-INF");  
          
        if(index == -1){  
            index = path.indexOf("classes");  
        }  
        if(index == -1){  
            index = path.indexOf("bin");  
        }  
        path = path.substring(0, index);  
        if(path.startsWith("zip")){//当class文件在war中时，此时返回zip:D:/...这样的路径  
            path = path.substring(4);  
        }else if(path.startsWith("file")){//当class文件在class文件中时，此时返回file:/D:/...这样的路径  
            path = path.substring(6);  
        }else if(path.startsWith("jar")){//当class文件在jar文件里面时，此时返回jar:file:/D:/...这样的路径  
            path = path.substring(10);   
        }  
        try {  
            path =  URLDecoder.decode(path, "UTF-8");  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
        return path;  
    }  
}
