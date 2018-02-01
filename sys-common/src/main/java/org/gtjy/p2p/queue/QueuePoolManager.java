package org.gtjy.p2p.queue;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * 任务调度线程池化管理
 * @author wys
 *
 */
public class QueuePoolManager {
	//构造一个单例的线程池
	private static QueuePoolManager poolManager = new QueuePoolManager();
	public QueuePoolManager() {}
	public static QueuePoolManager newInstance(){
		return poolManager;
	}
	//线程池维护线程的最少数量
	private final static int CORE_POOL_SIZE = 4;
	//线程池维护线程的最大数量
	private final static int MAX_POOL_SIZE = 100;
	//线程池维护线程所允许的空闲时间
	private final static int KEEP_ALIVE_TIME = 0;
	//线程池所使用的缓冲队列大小
	private final static int WORK_QUEUE_SIZE = 100;
	//消息队列
	private Queue<QueueEntity> queues = new LinkedList<QueueEntity>();
	//访问消息缓存的调度线程
	final Runnable accessBufferThread = new Runnable() {
		public void run() {
			/**查看是否有待定请求，如果有，则创建一个新的TaskEntity，并添加到线程池中**/
			if (hasMoreAcquire()) {
				QueueEntity msg = queues.poll();
				Runnable task = new QueueRunner(msg);
				threadPool.execute(task);
			}
		}
	};
	
	final RejectedExecutionHandler handler = new RejectedExecutionHandler() {
		public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
			queues.offer(((QueueRunner) r).getQueue());
		}
	};
	
	//管理线程池
	final ThreadPoolExecutor threadPool = new ThreadPoolExecutor(
			CORE_POOL_SIZE, MAX_POOL_SIZE, KEEP_ALIVE_TIME, TimeUnit.SECONDS,
			new ArrayBlockingQueue<Runnable>(WORK_QUEUE_SIZE), this.handler);
	
	//调度线程池
	final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
	//从现在开始每间隔一分钟执行一次
	final ScheduledFuture<?> taskHandler = scheduler.scheduleAtFixedRate(accessBufferThread, 0, 10, TimeUnit.SECONDS);
	
	/**
	 * 判断线程池是否为空
	 * @return
	 */
	private boolean hasMoreAcquire(){
		return !queues.isEmpty();
	}
	
	/**
	 * 添加单个任务调度
	 * @param entity
	 */
	public void addQueue(QueueEntity queue){
		Runnable runnable = new QueueRunner(queue);
		threadPool.execute(runnable);
	}
	
	/**
	 * 添加多个任务调度
	 * @param queues
	 */
	public void addQueues(List<QueueEntity> queues){
		Runnable runnable = null;
		for(QueueEntity QE : queues){
			runnable = new QueueRunner(QE);
			threadPool.execute(runnable);
		}
	}
}
