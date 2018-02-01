package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.exception;

import java.io.Writer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import freemarker.core.Environment;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

/**
 * freemarker页面上的异常控制 <br>
 * 在webmvc-config.xml里面的freemarkerSettings里头配置<br>
 * @author wys
 *
 */
public class FreemarkerExceptionHandler implements TemplateExceptionHandler {

    private static Log logger = LogFactory.getLog(FreemarkerExceptionHandler.class);
    
    @Override
    public void handleTemplateException(TemplateException te, Environment env,
            Writer out) throws TemplateException {
        logger.error("[页面展示模版异常:"+te.getMessage()+"]");
        throw new ControllerException("页面展示模版异常:"+te);
    }

}
