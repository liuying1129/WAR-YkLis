package com.yklis.yklis.business;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

import com.yklis.util.MySingleton;

public class StartupServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    private transient Logger logger = Logger.getLogger(this.getClass());
           
    /**
     * init仅在 Servlet创建时被调用
     * Servlet创建于用户第一次调用对应于该 Servlet的 URL，或指定该Servlet在服务器启动时被加载的情况
     */
    @Override
    public void init(ServletConfig config) throws ServletException {
        
        super.init(config);
        
        //HttpServlet中自动装配spring定义的Bean
        //SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,config.getServletContext());
        //执行上面这句后，就可以使用
        //@Autowired
        //private WorkerService workerService;
                
        logger.info("Quartz Initializer Servlet loaded");

        SchedulerFactory factory;
        try {
            //默认从ClassPath读取quartz.properties
            //也可通过参数指定其他位置的配置文件
            factory = new StdSchedulerFactory();
            logger.info("创建Scheduler Factory成功");
        } catch (Exception e) {
            
            logger.error("创建Scheduler Factory失败:"+e.toString());
            return;
        }
        
        MySingleton mySingleton = MySingleton.getInstance();
        
        try {
            Scheduler scheduler = factory.getScheduler();
            mySingleton.setScheduler(scheduler);
            logger.info("获取Scheduler成功");
        } catch (SchedulerException e) {

            logger.error("获取Scheduler失败:"+e.toString());
            return;

        }
                
        /*//手动设置Job、Trigger
        JobDetail getMessageJob = newJob(Job1.class).withIdentity("getDetailsJob", "group1").build();  

        Trigger getMessageTrigger = newTrigger()
                .withIdentity("getDetailsTrigger", "group1")
                .startNow()
                .withSchedule(simpleSchedule().withIntervalInSeconds(5).repeatForever())  
                .build();

        try {
            scheduler.scheduleJob(getMessageJob, getMessageTrigger);
        } catch (SchedulerException e) {
            
            System.out.println("为Scheduler设置job失败");
            return;
        } 
        //===================*/
        
        Scheduler scheduler = mySingleton.getScheduler();
        try {
            scheduler.start();
            logger.info("Scheduler has been started");                
        } catch (SchedulerException e) {
            
            logger.error("启动Scheduler失败:"+e.toString());
            return;
        }
    }
    
    @Override
    public void destroy() {

        MySingleton mySingleton = MySingleton.getInstance();
        Scheduler scheduler = mySingleton.getScheduler();
        
        if (scheduler != null) {
            try {
                //true:等待进行中的Job完成后才关闭
                scheduler.shutdown(true);
            } catch (SchedulerException e) {
                logger.error("Quartz Scheduler shutdown fail:"+e.toString());
                return;
            }
        }
        
        logger.info("Quartz Scheduler successful shutdown.");
        
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }

}
