package org.gtjy.p2p.ftl;

import java.util.Date;
import java.util.List;

import org.gtjy.p2p.util.DateUtil;


import org.gtjy.p2p.util.StringUtils;

import freemarker.template.TemplateMethodModel;
import freemarker.template.TemplateModelException;

/**
 * FTL 自定义函数 创建时间格式化
 * 调用:<#assign getjgdate= "org.gtjy.p2p.ftl.FtlData"?new()>
		${getjgdate(ggItem.modifydate)}
 * @author Administrator
 *
 */
@SuppressWarnings("all")
public class FtlData implements TemplateMethodModel {

	@Override
	public Object exec(List args) throws TemplateModelException {
		 String datePattern = (args.get(0).toString());
		 String dateFormat = (args.get(1).toString());
		 if(StringUtils.isEmpty(dateFormat)){
	        if(StringUtils.isEmpty(datePattern)) return "";
	        if(datePattern.length()>18) datePattern =datePattern.substring(0,19)+"."+datePattern.substring(19);
	        Date date = new Date(Long.parseLong(datePattern));
			return DateUtil.formatDate(date, "yyyy-MM-dd HH:mm:ss");
		 }else{
			if(StringUtils.isEmpty(datePattern)) return "";
	        if(datePattern.length()>18) datePattern =datePattern.substring(0,19)+"."+datePattern.substring(19);
	        Date date = new Date(Long.parseLong(datePattern));
			return DateUtil.formatDate(date, dateFormat);
		 }
	}
}
