package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.convert;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.gtjy.p2p.constants.SystemConstant;
import org.springframework.util.StringUtils;

/**
 * 
 * <p> Title: </p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class DateConvertEditor extends PropertyEditorSupport {

	private SimpleDateFormat datetimeFormat = new SimpleDateFormat(SystemConstant.FORMAT_DATE_ALL_24);
	private SimpleDateFormat dateFormat = new SimpleDateFormat(SystemConstant.FORMAT_DATE_SIMPLE);
	
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (StringUtils.hasText(text))
			try {
				if ((text.indexOf(":") == -1) && (text.length() == 10)) {
					setValue(this.dateFormat.parse(text));
				}
				if ((text.indexOf("T") > 0) && (text.length() == 19)) {
					String dataTime = text.replace("T", " ");
					setValue(this.datetimeFormat.parse(dataTime));
				}
				throw new IllegalArgumentException("不能转换的时间格式");
			} catch (ParseException ex) {
				ex.printStackTrace();
				IllegalArgumentException iae = new IllegalArgumentException(
						"转换失败: " + ex.getMessage());
				iae.initCause(ex);
				throw iae;
			}
		else
			setValue(null);
	}

	@Override
	public String getAsText() {

		return getValue().toString();
	}
}
