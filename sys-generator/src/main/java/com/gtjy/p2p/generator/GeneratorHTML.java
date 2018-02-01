package com.gtjy.p2p.generator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


import org.gtjy.p2p.constants.WebConstants;
import org.gtjy.p2p.util.MapUtil;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

/**
 * 生成HTML文件
 * @author html
 *
 */
public class GeneratorHTML {
	
	private static Log logger = LogFactory.getLog(GeneratorHTML.class);
	
	private Configuration configuration;
	
	public Configuration getConfiguration() {
		return configuration;
	}
	
	/**
	 * 初始化configuration 设置编码格式
	 */
	private void init(String ftlFilePath) {
		configuration = new Configuration();
		try {
			configuration.setDirectoryForTemplateLoading(new File(ftlFilePath));
		} catch (IOException e) {
			logger.debug("初始化模版文件异常，错误信息:"+e.getMessage());
			e.printStackTrace();
		}
		configuration.setEncoding(Locale.CHINA, "UTF-8");
	}
	
	/** 
     * 通过flt文件用html文件展示课程数据 
     * @param filePath flt文件路径 
     * @param templateFile flt模板文件 
     * @param content 模版文件内容
     * @param charset flt生成数据的编码格式 
     * @param htmlFile 通过flt生成html的文件 
     * @throws Exception 
     */  
    public void showCourse(String filePath, String templateFile, Articles content, String charset, String htmlFile){  
        init(filePath);  
        try {
			Map<String, Object> root = MapUtil.newHashMap();  
			Template temp = getConfiguration().getTemplate(templateFile);
			root.put(WebConstants.BASEPATH, "");
			root.put("articles", content);  
			Writer out=new OutputStreamWriter(new FileOutputStream(htmlFile), charset);  
			temp.process(root, out);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}  
    }
    
    /**
     * 内部类 文章内容用于生成静态资源的内容
     * @author Administrator
     *
     */
    public class Articles{
    	private String title; //文章标题/页面标题
    	private String keyWords;	//关键字 SEO
    	private String des;			//描述  SEO
    	private String includeTopFTL;	//引入头部文件名称
    	private String includeButtomFTL;	//引入底部文件名称
    	private String content;	//文章内容
    	private String topAricles;		//上一篇	a标签
    	private String buttomAricles;	//下一篇 a标签
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getKeyWords() {
			return keyWords;
		}
		public void setKeyWords(String keyWords) {
			this.keyWords = keyWords;
		}
		public String getDes() {
			return des;
		}
		public void setDes(String des) {
			this.des = des;
		}
		public String getIncludeTopFTL() {
			return includeTopFTL;
		}
		public void setIncludeTopFTL(String includeTopFTL) {
			this.includeTopFTL = includeTopFTL;
		}
		public String getIncludeButtomFTL() {
			return includeButtomFTL;
		}
		public void setIncludeButtomFTL(String includeButtomFTL) {
			this.includeButtomFTL = includeButtomFTL;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		public String getTopAricles() {
			return topAricles;
		}
		public void setTopAricles(String topAricles) {
			this.topAricles = topAricles;
		}
		public String getButtomAricles() {
			return buttomAricles;
		}
		public void setButtomAricles(String buttomAricles) {
			this.buttomAricles = buttomAricles;
		}
    }
    
}
