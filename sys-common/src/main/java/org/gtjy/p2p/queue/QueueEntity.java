package org.gtjy.p2p.queue;

import java.util.Date;
import java.util.Map;

/**
 * 任务调度实体
 * @author wys
 *
 */
public class QueueEntity {
	//要执行的任务类
	private Class<?> classes;
	//要执行的方法
	private String method;
	//执行方法所需参数
	private Map<?,?> params;
	//执行时间
	private Date runTime;
	
	public QueueEntity() {
	}
	
	public QueueEntity(Class<?> classes,String method,Map<?,?> params,Date runTime){
		this.classes = classes;
		this.method = method;
		this.params = params;
		this.runTime = runTime;
	}

	public Class<?> getClasses() {
		return classes;
	}

	public void setClasses(Class<?> classes) {
		this.classes = classes;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public Map<?,?> getParams() {
		return params;
	}

	public void setParams(Map<?,?> params) {
		this.params = params;
	}

	public Date getRunTime() {
		return runTime;
	}

	public void setRunTime(Date runTime) {
		this.runTime = runTime;
	}
}
