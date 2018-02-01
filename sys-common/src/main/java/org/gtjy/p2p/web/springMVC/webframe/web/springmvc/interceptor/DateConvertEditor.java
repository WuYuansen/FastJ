package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.interceptor;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.util.StringUtils;

/**
 * 
 * <p>
 * Title: 设定拦截时间格式转换样式
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2013
 * </p>
 * <p>
 * Company:乌鲁木齐光通嘉业网络服务有限公司
 * </p>
 * 
 * @author wys
 * @version 1.0
 */
public class DateConvertEditor extends PropertyEditorSupport {
    private SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private SimpleDateFormat datetimeFormat02 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    public void setAsText(String text) throws IllegalArgumentException {
        if (StringUtils.hasText(text))
            try {
                if ((text.indexOf(":") == -1) && (text.length() == 10)) {
                    setValue(this.dateFormat.parse(text));
                    return;
                }
                if ((text.indexOf(":") > 0) && (text.length() == 16)) {
                    setValue(this.datetimeFormat02.parse(text));
                    return;
                }
                if ((text.indexOf(":") > 0) && (text.length() == 19)) {
                    setValue(this.datetimeFormat.parse(text));
                    return;
                }
                if ((text.indexOf(":") > 0) && (text.length() == 21)) {
                    text = text.replace(".0", "");
                    setValue(this.datetimeFormat.parse(text));
                    return;
                }

                throw new IllegalArgumentException(
                        "Could not parse date, date format is error ");
            } catch (ParseException ex) {
                IllegalArgumentException iae = new IllegalArgumentException(
                        "Could not parse date: " + ex.getMessage());
                iae.initCause(ex);
                throw iae;
            }
        else
            setValue(null);
    }
}
