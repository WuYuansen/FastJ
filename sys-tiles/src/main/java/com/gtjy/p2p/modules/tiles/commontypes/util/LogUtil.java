package com.gtjy.p2p.modules.tiles.commontypes.util;

import javax.servlet.http.HttpServletRequest;


/**
 * 
 * 
 * LogUtil 保存操作日志
 * 
 * 2015年6月4日 上午11:10:40
 * @author：wys
 * @version 1.0.0
 *
 */
public class LogUtil {
    
    public static String czType(String url) {
        String type = "";
        if(url.contains("/data")) {
            type = "查询";
        }
        if(url.contains("doLogin")) {
            type = "登录";
        }
        if(url.contains("find")) {
            type = "查询";
        }
        if(url.contains("save")) {
            type = "保存";
        }
        if(url.contains("delete")) {
            type = "删除";
        }
        if(url.contains("edit")) {
            type = "编辑";
        }
        return type;
    }

    /**
     * 
     * saveLog(保存日志)
     * (这里描述这个方法适用条件 – 可选)
     * @param request 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public static void saveLog(HttpServletRequest request,Exception ex,String ms) {
    }
    
    
    /**
     * 保存日志线程 内部类
     */
    public static class SaveLogThread extends Thread{
        @SuppressWarnings("unused")
		private Exception ex;   //异常对象
        
        public SaveLogThread(Exception ex){
            super(SaveLogThread.class.getSimpleName());
            this.ex = ex;
        }
        
        @Override
        public void run() { /* 执行保存日志操作 */
            // 如果无操作人并无异常日志，则不保存信息
        }
    }
    
    /**
     * 获取IP地址
     * 
     * @throws Exception
     */
    public static String getRemortIP(HttpServletRequest request){
        String ip = "";
        if (request.getHeader("x-forwarded-for") == null) {
            ip = request.getRemoteAddr();
        } else {
            ip = request.getHeader("x-forwarded-for");
        }
        return ip;
    }
}
