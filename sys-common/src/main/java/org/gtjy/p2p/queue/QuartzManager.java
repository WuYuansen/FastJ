package org.gtjy.p2p.queue;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.gtjy.p2p.util.DateUtil;
import org.quartz.CronTrigger;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;


/**
 * 
 * 
 * QuartzManager 定时任务管理类 基于java代码实现
 * 
 * 2015年2月28日 下午4:30:14
 * @author：wys
 * @version 1.0.0
 *
 */
public class QuartzManager {
    
    private static Log logger = LogFactory.getLog(QuartzManager.class);
    
    private static SchedulerFactory schedulerFactory = new StdSchedulerFactory();
    
    private static String JOB_GROUP_NAME="p2p_JBO_GROUP_NAME";
    private static String TRIGGER_GROUP_NAME = "p2p_TRIGGER_GROUP_NAME";
    
    /**
     *  
     * addJOB(添加一个定时任务，使用默认的任务组名，触发器名，触发器组名 )
     * (这里描述这个方法适用条件 – 可选)
     * @param jobName  任务名称 
     * @param jobClass  任务
     * @param time  执行时间
     * @return void 返回类型
     * @exception 
     * @version  1.0.0
     */
    public static void addJOB(String jobName,Class<?> jobClass,JobDataMap jobDataMap,String time) {
        try {
            Scheduler sched = schedulerFactory.getScheduler();  
            JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, jobClass);// 任务名，任务组，任务执行类  
            // 触发器  
            CronTrigger trigger = new CronTrigger(jobName, TRIGGER_GROUP_NAME);// 触发器名,触发器组  
            trigger.setJobDataMap(jobDataMap);
            trigger.setCronExpression(time);// 触发器时间设定  
            sched.scheduleJob(jobDetail, trigger);  
            // 启动  
            if (!sched.isShutdown()){  
                sched.start();  
            }
            logger.info("添加定时任务 ["+jobName+"] 成功  ---> 执行时间:"+time);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 
     * removeJob(移除一个任务(使用默认的任务组名，触发器名，触发器组名) )
     * (这里描述这个方法适用条件 – 可选)
     * @param jobName 
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public static void removeJob(String jobName) {  
        try {  
            Scheduler sched = schedulerFactory.getScheduler();  
            sched.pauseTrigger(jobName, TRIGGER_GROUP_NAME);// 停止触发器  
            sched.unscheduleJob(jobName, TRIGGER_GROUP_NAME);// 移除触发器  
            sched.deleteJob(jobName, JOB_GROUP_NAME);// 删除任务  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }
    
    /**
     * 
     * executeJob(执行JOB任务,将指定任务添加到JOB中)
     * (这里描述这个方法适用条件 – 可选)
     * @param jobDataMap    参数队列 和map对象功能类此,存储键值对形式
     * @param executeTime   指定执行事件
     * @return void
     * @exception 
     * @version  1.0.0
     */
    public static void executeJob(String job_name,Class<?> classes,JobDataMap jobDataMap,Date executeTime) {
        jobDataMap.put("removeJobName", job_name);
        Date sysDate = new Date(System.currentTimeMillis());
        if(sysDate.getTime() > executeTime.getTime()) {
            logger.info("添加定时任务 ["+job_name+"] 成功  ---> 立即执行");
            QuartzManager.addJOB(job_name, classes, jobDataMap, formatDateByPattern(sysDate));
        }else {
            logger.info("添加定时任务 ["+job_name+"] 成功  ---> 执行时间:"+DateUtil.formatDate(executeTime, "yyyy-MM-dd HH:mm:ss"));
            QuartzManager.addJOB(job_name,classes,jobDataMap,formatDateByPattern(executeTime));
        }
    }
    
    private static final String cronExpFormat = "ss mm HH dd MM ? yyyy";  //指定时间执行
    
    /**
     * 
     * formatDateByPattern(转换CRON表达式)
     * (这里描述这个方法适用条件 – 可选)
     * @param date
     * @return 
     * @return String
     * @exception 
     * @version  1.0.0
     */
    public static String formatDateByPattern(Date date){  
        SimpleDateFormat sdf = new SimpleDateFormat(cronExpFormat);
        String formatTimeStr = null;  
        if (date != null) {  
            formatTimeStr = sdf.format(date);  
        }  
        return formatTimeStr;  
    }
}
