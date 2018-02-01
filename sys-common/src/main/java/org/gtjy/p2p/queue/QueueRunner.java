package org.gtjy.p2p.queue;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * 执行任务的线程
 * @author wys
 *
 */
public class QueueRunner implements Runnable {
	
	private static Log logger = LogFactory.getLog(QueueRunner.class);
	
	private QueueEntity queue;
	
	public QueueEntity getQueue() {
		return queue;
	}
	
	public QueueRunner(QueueEntity queue) {
		this.queue = queue;
	}
	
	@Override
	public void run() {
		try {
			//利用java反射实现任务调用
			Class<?> classes = queue.getClasses();
			String methodName = queue.getMethod();
			Method method = classes.getMethod(methodName, Map.class);
			method.invoke(classes.newInstance(),queue.getParams());
		} catch (SecurityException e) {
			logger.debug("Security Exception "+e.getMessage());
		} catch (NoSuchMethodException e) {
			logger.debug("NoSuchMethod Exception "+e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.debug("IllegalArgument Exception "+e.getMessage());
		} catch (IllegalAccessException e) {
			logger.debug("IllegalAccess Exception "+e.getMessage());
		} catch (InvocationTargetException e) {
			logger.debug("InvocationTarget Exception "+e.getMessage());
		} catch (InstantiationException e) {
			logger.debug("InvocationTarget Exception "+e.getMessage());
		}
		
	}

}
