package org.gtjy.p2p.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

/**
 * 
 * <p> Title: XSS漏洞解决方案之一：过滤器</p>
 * <p> Description:使用时在web.xml 中加入
 * <filter>
 *	<filter-name>xssFilter</filter-name>
 *		<filter-class>org.gtjy.p2p.security.XSSFilter</filter-class>
 *		<init-param>
 *			<param-name>rule</param-name>
 *			<param-value><![CDATA[$r$:<script(.|\n)*\/script>\s*#split#$r$: href *= *[\\s\\s]*script *:#split#$r$: on[\\s\\s]*=#split#$r$: <iframe[\\s\\s]+</iframe *>#split#$r$: <frameset[\\s\\s]+</frameset *>]]></param-value>
 *		</init-param>
 *	</filter>
 *	<filter-mapping>
 *		<filter-name>xssFilter</filter-name>
 *		<url-pattern>/*</url-pattern>
 *	</filter-mapping>
 *  </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class XSSFilter implements javax.servlet.Filter{
	private final static Logger log = Logger.getLogger(XSSFilter.class);
	private Boolean filtered = false;
	private String[] rule = new String[]{};
	private List<Rule> rules = new ArrayList<Rule>();

	//@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		if(filterConfig.getInitParameter("rule") != null){
			rule = filterConfig.getInitParameter("rule").split("#split#");
		}
		log.info("XSS/CSS 攻击检测启动...");
		log.info("XSS/CSS 过滤参数列表:");
		for(String _r : rule){
			Rule r = new Rule(_r.substring(0, 3),_r.substring(4));
			if(r.getType().equals("$r$")){
				log.info("正则:" + _r.substring(4));
				r.setValue(Pattern.compile(_r.substring(4), Pattern.CASE_INSENSITIVE));
			}
			if(r.getType().equals("$s$")){
				log.info("字符串:" + _r.substring(4));
			}
			rules.add(r);
		}
		log.info("XSS/CSS End.");
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	//@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest _request = (HttpServletRequest) request;
		Map<String, String[]> params = request.getParameterMap();
		if(params.isEmpty()){
			filterChain.doFilter(request, response);
			return;
		}

		for(Iterator iter = params.entrySet().iterator();iter.hasNext();){  
			Map.Entry element = (Map.Entry)iter.next();  
			Object strKey = element.getKey(); 
			String[] value=(String[])element.getValue();  
			String valueStr="";
			//System.out.print(strKey.toString() +"="); 
			for(int i=0;i <value.length;i++){  
				valueStr += value[i];
			}
			check(valueStr);
			if(filtered){
				log.info("XSS/CSS 攻击来源 IP:" + request.getRemoteHost() + ":" + request.getRemotePort() + "(" + _request.getMethod() + ") \tCODE:" + strKey.toString()+ "=" + valueStr + "\tPATH:" + _request.getRequestURI());
				response.flushBuffer();
				response.getWriter().flush();
				response.setContentType("text/html; charset=UTF-8");
				response.getWriter().println("请勿进行非法操作!");
				filtered = false;
				return;
			}
		}
		filterChain.doFilter(request, response);
		return;
	}

	//@Override
	public void destroy() {

	}

	private void check(String value){

		for(Rule r : rules){
			if(r.getType().equals("$r$")){
				Pattern p = (Pattern)r.getValue();
				Matcher m = p.matcher(value); 
				if(m.find()){
					filtered = true;
					return ;
				}
			}
			if(r.getType().equals("$s$")){
				if(value.indexOf(r.getValue().toString()) !=-1){
					filtered = true;
					return ;
				}
			}
		}
	}
}


class Rule{
	private String type;
	private Object value;

	public Rule() {
	}

	public Rule(String _type , Object _value) {
		this.type = _type;
		this.value = _value;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
	
}
