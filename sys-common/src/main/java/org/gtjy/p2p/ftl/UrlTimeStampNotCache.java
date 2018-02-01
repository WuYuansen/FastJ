package org.gtjy.p2p.ftl;

import java.io.IOException;
import java.util.Map;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * 解决使用freemarker的web项目经常需要用在Url后面加上时间戳来保证资源不被缓存
 * @author wys
 *
 */
public class UrlTimeStampNotCache implements TemplateDirectiveModel {

    @Override
    public void execute(Environment env, @SuppressWarnings("rawtypes") Map params, TemplateModel[] loopVars,
            TemplateDirectiveBody body) throws TemplateException, IOException {
        //使用系统时间戳函数
        env.getOut().write(System.currentTimeMillis()+"");
    }

}
