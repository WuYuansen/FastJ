package com.gtjy.p2p.modules.tiles.commontypes.Interceptor;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.gtjy.p2p.JSON.JSONUtil;
import org.gtjy.p2p.spring.SpringContextUtil;
import org.gtjy.p2p.util.DateUtil;
import org.gtjy.p2p.util.IPUtil;
import org.gtjy.p2p.util.StringUtils;
import org.gtjy.p2p.util.UserAgentUtil;
import org.gtjy.p2p.web.session.SessionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.NamedThreadLocal;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.gtjy.p2p.modules.sys.dto.Logs;
import com.gtjy.p2p.modules.sys.dto.User;
import com.gtjy.p2p.modules.tiles.sys.ILogs;
import com.gtjy.p2p.modules.tiles.sys.impl.ILogsImpl;

/**
 * 
 * 
 * LogInterceptor 日志拦截
 * 
 * 2015年5月29日 下午1:29:07
 * @author：wys
 * @version 1.0.0
 *
 */
public class LogInterceptor implements HandlerInterceptor {
    
    private static final ThreadLocal<Long> startTimeThreadLocal = new NamedThreadLocal<Long>("ThreadLocal StartTime");
    
    private Logger logger =LoggerFactory.getLogger(LogInterceptor.class);
    
    //日志类型（1 前台日志、2 后台日志、3 性能日志、4 其它日志 、5 出错日志）
    public static final Long TYPE_FRONTOPERA = 1l;
    public static final Long TYPE_MANAGER = 2l;
    public static final Long TYPE_PERFORMANCE = 3l;
    public static final Long TYPE_OTHER = 4l;
    public static final Long TYPE_EXCEPTION = 5l;
     
    
    /**
     * preHandle：预处理回调方法
	 * 实现处理器的预处理（如登录检查），第三个参数为响应的处理器（如我们上一章的Controller实现）；
	 * 返回值：true表示继续流程（如调用下一个拦截器或处理器）；
	 * 		 false表示流程中断（如登录检查失败），不会继续调用其他的拦截器或处理器，此时我们需要通过response来产生响应；
     * */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse resposne,
            Object obj) throws Exception {
        long beginTime = System.currentTimeMillis();//1、开始时间  
        startTimeThreadLocal.set(beginTime);        //线程绑定变量（该数据只有当前请求的线程可见）
        logger.debug("开始计时: {}  URI: {}", new SimpleDateFormat("hh:mm:ss.SSS")
            .format(beginTime), request.getRequestURI());
        
        //注销、进入模块、系统管理
        String uri = request.getRequestURI();
    	String modul = request.getParameter("module")!=null?request.getParameter("module"):"";

        if( modul.equals("menuEven")|| uri.contains("logout") ){
            saveLog2(request);
        }else if( uri.contains("dept")
        		||  uri.contains("dict")
        		||  uri.contains("logs")
        		||  uri.contains("modular")
        		||  uri.contains("right")
        		||  uri.contains("role")
        		||  uri.contains("roleRight")
        		||  uri.contains("user")
        		||  uri.contains("userRole")        		
        		){
        	if(uri.contains("save")|| uri.contains("edit")|| uri.contains("delete") ){
        	//来自系统管理的操作：增 删 改
        	 saveLog2(request);
        	}
        }
        
        return true;
    }
    
   /**
    * afterCompletion：整个请求处理完毕回调方法，即在视图渲染完毕时回调，
    * 如性能监控中我们可以在此记录结束时间并输出消耗时间，还可以进行一些资源清理，
    * 类似于try-catch-finally中的finally，
    * 但仅调用处理器执行链中preHandle返回true的拦截器的afterCompletion。
    * */
    @Override
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        long beginTime = startTimeThreadLocal.get();//得到线程绑定的局部变量（开始时间）  
        long endTime = System.currentTimeMillis();  //2、结束时间  
        
        String ms = "用户在:["+new SimpleDateFormat("hh:mm:ss.SSS").format(endTime)+"]执行请求:["+request.getRequestURI() +"]请求方式:["+request.getMethod()+"],请求参数:["+JSONUtil.ConvertJSONByObject(request.getParameterMap())+"]耗时:" + DateUtil.formatDateTime(endTime - beginTime);
        
        //saveLog(request, handler, ex, ms);
        logger.debug("计时结束：{}  耗时：{}  URI: {}  最大内存: {}m  已分配内存: {}m  已分配内存中的剩余空间: {}m  最大可用内存: {}m",
                new SimpleDateFormat("hh:mm:ss.SSS").format(endTime), DateUtil.formatDateTime(endTime - beginTime),
                request.getRequestURI(), Runtime.getRuntime().maxMemory()/1024/1024, Runtime.getRuntime().totalMemory()/1024/1024, Runtime.getRuntime().freeMemory()/1024/1024, 
                (Runtime.getRuntime().maxMemory()-Runtime.getRuntime().totalMemory()+Runtime.getRuntime().freeMemory())/1024/1024);
    }
    
    /*
     * postHandle：后处理回调方法，实现处理器的后处理（但在渲染视图之前），在业务方法执行完成后执行
     * 此时我们可以通过modelAndView（模型和视图对象）对模型数据进行处理或对视图进行处理
     * modelAndView也可能为null
      */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
            Object obj, ModelAndView arg3) throws Exception {
    	/*登陆:用户登陆放在业务执行完后执行，否则 从会话中取不到user对象 silence 2016-2-24*/
        String uri = request.getRequestURI();
        if(uri.contains("login")){
        	saveLog2(request);
        }
    }
    
    /**
     * 2016-2-23 Silence
     * saveLog(保存日志)
     * (这里描述这个方法适用条件 – 可选)
     * @param request 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    
    @Resource
    private ILogs services = null;    
    private void saveLog2(HttpServletRequest request) {
    	String uri = request.getRequestURI();
    	String modul = request.getParameter("module")!=null?request.getParameter("module"):"";
    	
    	User user = (User)SessionUtil.getCurrentUser(request);
    	long beginTime = startTimeThreadLocal.get();//得到线程绑定的局部变量（开始时间）
    	String tableName = null;
    	if(modul== null || modul.equals("") ){
    		if(uri.contains("dept")
            		||  uri.contains("dict")
            		||  uri.contains("logs")
            		||  uri.contains("modular")
            		||  uri.contains("right")
            		||  uri.contains("role")
            		||  uri.contains("roleRight")
            		||  uri.contains("user")
            		||  uri.contains("userRole")
    			){
	    		int end = uri.lastIndexOf("/");
	    		String s1= uri.substring(0, end);
	    		int start = s1.lastIndexOf("/");
	    		tableName = "sys_"+uri.substring(start+1, end);
	    	}
    	}
    	
    	if(user != null){
    		String userRealName = user.getRealname();
        	String operaTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(beginTime);
        	String type = null;
        	String endStr = null;

        	if(uri.contains("/data")) {
                type = "查询";                
            }
        	else if(uri.contains("login")) {
                type = "登录";
                endStr = "进入系统";
            }
        	else if(uri.contains("logout")) {
                type = "注销";
                endStr = "注销登录";
            }
        	else if(uri.contains("find")) {
                type = "条件查询";
                endStr = "对"+tableName+"表执行了条件查询操作";
            }
        	else if(uri.contains("save")) {
                type = "新增";
                endStr = "对"+tableName+"表执行了新增操作";
            }
        	else  if(uri.contains("delete")) {
                type = "删除";
                endStr = "对"+tableName+"表执行了删除操作";
            }
        	else if(uri.contains("edit")) {
                type = "修改";
                endStr = "对"+tableName+"表执行修改操作";
            }
            if(modul.equals("menuEven")) {
                type = "进入模块";
                String text = request.getParameter("text");
                endStr = "进入" + text +"模块";
            }
            
            if(type!=null){
            	StringBuffer sbf = new StringBuffer();
                sbf.append(type+":");
           		sbf.append("用户  "+userRealName);
           		sbf.append(" 于"+ operaTime );
           		sbf.append(endStr );
           		String remarks = sbf.toString();
           		
        		Logs log = new Logs();
        		log.setLogstype(TYPE_FRONTOPERA); //前端操作日志
        		log.setLogssource(UserAgentUtil.getDeviceType(request).getName()); //请求来源的硬件类型
        		log.setOperationdate(new Date(System.currentTimeMillis())); //
        		log.setOperationip(IPUtil.getRemortIp(request));
        		log.setOperationtype(type);  
        		log.setOperationremarks(remarks);
        		log.setOperationuser(userRealName); 
        		services.insert(log);
            }
            
    	}
    }
    
    public static String czType(String url) {
        String type = "";
        if(url.contains("/data")) {
            type = "查询";
        }
        if(url.contains("login")) {
            type = "登录";
        }
        if(url.contains("logout")) {
            type = "注销";
        }
        
        if(url.contains("find")) {
            type = "查询";
        }
        if(url.contains("save")) {
            type = "新增";
        }
        if(url.contains("delete")) {
            type = "删除";
        }
        if(url.contains("edit")) {
            type = "修改";
        }
        return type;
    }
    
    
    /**
     * 保存日志线程 内部类
     */
    public static class SaveLogThread extends Thread{
    	private static final ILogs logService = SpringContextUtil.getBean(ILogsImpl.class);
        private Exception ex;   //异常对象
        private Logs log;
        public SaveLogThread(Logs log, Object handler, Exception ex){
            super(SaveLogThread.class.getSimpleName());
            this.ex = ex;
            this.log = log;
        }
        
        @Override
        public void run() { /* 执行保存日志操作 */
            // 如果无操作人并无异常日志，则不保存信息
        	if (StringUtils.isBlank(log.getOperationuser()) && StringUtils.isBlank(ex.getMessage())){
                return;
            }
            logService.insert(log);
        }
    }
    
	@Deprecated
	private void saveLog(HttpServletRequest request,Object handler, Exception ex,String ms) {
		User user = (User)SessionUtil.getCurrentUser(request);
		request.setAttribute("userRealName", user.getRealname());
		if(user != null){
			Logs log = new Logs();
			log.setLogstype(ex == null?TYPE_FRONTOPERA:TYPE_EXCEPTION); //前端操作日志
			log.setLogssource(UserAgentUtil.getDeviceType(request).getName()); //请求来源的硬件类型
			log.setOperationdate(new Date(System.currentTimeMillis())); //
			
			log.setOperationip(IPUtil.getRemortIp(request));
			String operaType = czType(request.getRequestURI());
			log.setOperationtype(operaType);    		
			String remarks = getRemarts(operaType,user.getRealname());    		
			log.setOperationremarks(ex == null?remarks:ex.getMessage());
			log.setOperationuser(user.getRealname()); //
			services.insert(log);
		}
	}

	@Deprecated
	   private String getRemarts( String operaType , String userRealName){
		   /* 
		   String idvalue = null;
	    	String module = null;
	    	String className = null;
	    	StringBuffer sbf = new StringBuffer();
	    	
			if(operaType.equals("登录")){
				sbf.append("进入系统");
			}
			
			if(operaType.equals("注销")){
				sbf.append("注销登录");
			}
			
			if(operaType.equals("退出")){
				sbf.append("退出系统");
			}
			
			if(operaType.equals("进入模块")){
				sbf.append("进入"+module+"模块");
			}
			
			if(operaType.equals("查询")){
				sbf.append("在"+module+"模块执行了查询操作");
			}
	
			if(operaType.equals("保存")){
				sbf.append("对"+className+"表执行了查询操作，操作记录ID为"+idvalue);
			}
			
			if(operaType.equals("删除")){
				sbf.append("对"+className+"表执行了删除操作，操作记录ID为"+idvalue);
			}
	
			if(operaType.equals("编辑")){
				sbf.append("对"+className+"表执行了编辑操作，操作记录ID为"+idvalue);
			}
			*/
			String remarks = "success";
	    	return remarks;
	    }
}
