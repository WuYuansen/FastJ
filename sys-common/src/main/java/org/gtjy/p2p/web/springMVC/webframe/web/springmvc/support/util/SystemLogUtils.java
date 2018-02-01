package org.gtjy.p2p.web.springMVC.webframe.web.springmvc.support.util;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * <p> Title: 系统日志记录到指定文件</p>
 * <p> Description: </p>
 * <p> Copyright: Copyright (c) 2013 </p>
 * <p> Company:乌鲁木齐光通嘉业网络服务有限公司 </p>
 *
 * @author wys
 * @version 1.0
 */
public class SystemLogUtils {
	
	private static Log logger = LogFactory.getLog(SystemLogUtils.class);
	
	public static boolean enableSystemLog = true;

	public static long currentTime = new Date().getTime();

	private SystemLogUtils() {
	}

	public static void println(String filePath,Object msg,boolean isWrite) {
		if (enableSystemLog)
			System.out.println(timeMsg(filePath,"[INFO]", msg,isWrite));
	}
	
	public static void println(Object msg) {
		if (enableSystemLog)
			System.out.println(timeMsg("[INFO]", msg));
	}

	public static void errorPrintln(Object msg) {
		if (enableSystemLog)
			System.err.println("[ERROR]" + msg);
	}

	public static void rootPrintln(Object msg) {
		println("<=======================" + msg + "=======================>");
	}

	public static void secondPrintln(Object msg) {
		println("  " + msg + "----------->");
	}

	public static void thirdPrintln(Object msg) {
		println("    " + msg);
	}

	private static String timeMsg(String filePath,String level, Object msg,boolean isWrite) {
		long time = new Date().getTime();
		try {
			if(isWrite){
				appendToFile(filePath,level + (time - currentTime) + " ms " + msg);
			}
			return level + (time - currentTime) + " ms " + msg;
		} finally {
			currentTime = time;
		}
	}
	
	private static String timeMsg(String level, Object msg) {
		long time = new Date().getTime();
		try {
			return level + (time - currentTime) + " ms " + msg;
		} finally {
			currentTime = time;
		}
	}
	
	private static void appendToFile(String filePath,String content){
		try {
			//打开一个写文件器，构造函数中的第二个参数true表示以追加形式写文件  
			FileWriter writer = new FileWriter(filePath, true);
			writer.write(content + "\n");  
			writer.close();
		} catch (IOException e) {
			logger.debug("文件操作异常，异常信息："+e.getMessage());
			e.printStackTrace();
		}  
	}
}
