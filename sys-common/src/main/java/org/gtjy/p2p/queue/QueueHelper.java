package org.gtjy.p2p.queue;

import java.util.List;

/**
 * 调用类
 * @author wys
 *
 */
public class QueueHelper {
	 /**
     * 添加异步任务(任务列表)
     * @param queueList
     */
	public static void addTaskList(List<QueueEntity> queueList){
		QueuePoolManager.newInstance().addQueues(queueList);;
	}
	
	 /**
     * 添加异步任务(单个任务)
     * @param queue
     */
	public static void addTask(QueueEntity queue){
		QueuePoolManager.newInstance().addQueue(queue);
	}
	
}
