package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.convert;

import java.beans.PropertyEditorSupport;
import java.util.Date;

import org.springframework.util.StringUtils;

/**
 * @类名称: TimeStapConvertEditor
 * @说明: 
 * @作者: Loser森 javaer0415@gmail.com
 * @创建时间: 2017年5月18日 下午11:47:41
 */
public class TimeStapConvertEditor extends PropertyEditorSupport{

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (StringUtils.hasText(text)){
			Object text1 = text;
			if(text1 instanceof Long){
				if (text.length() == 13) {
					setValue(new Date(Long.parseLong(text)));
				}
			}
			throw new IllegalArgumentException("不能转换的时间格式");
		}
		else
			setValue(null);
	}

	@Override
	public String getAsText() {
		return getValue().toString();
	}
}
