package com.yklis.yklis.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;

/**
 * 切面:用于插入到指定位置实现某项功能的类
 * 
 * 记录Controller被请求的日志
 * @author ying07.liu
 *
 */

//通过@AspectJ将类标识为切面
@Aspect
public class AspectCtlLog {
    
    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    private final Logger logger = Logger.getLogger(this.getClass());
    
    private String requestPath; // 请求地址  
    //private String userName = null ; // 用户名  
    private Map<String, String[]> inputParamMap; // 传入参数  
    private Object obj;
    private long startTimeMillis; // 开始时间  
    private long endTimeMillis; // 结束时间  
  
    //Spring支持的5种增强：
    //前置增强:表示在目标方法执行前实施增强
    //后置增强:表示在目标方法执行后实施增强
    //环绕增强:表示在目标方法执行前后实施增强.可替代前、后置增强
    //抛出异常增强:表示在目标方法抛出异常后实施增强
    //引介增强:表示在目标类中添加一些新的方法和属性
    
    //定义增强类型:Before,前置增强；切点：由切点表达式确定
    @Before("execution(* com.yklis.yklis.controller.*.*(..))")  
    //增强的横切逻辑
    public void doBefore(JoinPoint joinPoint) {  
        //记录方法开始执行的时间  
        startTimeMillis = System.currentTimeMillis(); 
    }  
  
    @After("execution(* com.yklis.yklis.controller.*.*(..))")  
    public void doAfter(JoinPoint joinPoint) {  
        //记录方法执行完成的时间  
        endTimeMillis = System.currentTimeMillis(); 
        this.printOptLog();  
    }  
  
    @Around("execution(* com.yklis.yklis.controller.*.*(..))")  
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        
        //在目标方法执行前调用
        
        //SpringMVC中获取request对象
        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
        
        //获取输入参数  
        inputParamMap = request.getParameterMap();
        
        //获取请求地址  
        requestPath = request.getRequestURI();  
                  
        //通过反射机制调用目标方法
        //obj就是被拦截方法的返回值
        obj = pjp.proceed();
        
        //在目标方法执行后调用
          
        return obj;  
    }  
  
    private void printOptLog() {  
        
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        
        String optTime = dateFormat.format(startTimeMillis);  
        
        StringBuilder sbLog = new StringBuilder();
        sbLog.append("请求url:");
        sbLog.append(requestPath);
        sbLog.append(";请求开始时间:");
        sbLog.append(optTime);
        sbLog.append(";时长:");
        sbLog.append(endTimeMillis - startTimeMillis);
        sbLog.append("ms;请求参数:");
        sbLog.append(JSON.toJSONString(inputParamMap));
        sbLog.append(";返回结果:");
        sbLog.append(JSON.toJSONString(obj));

        logger.info(sbLog);
    }

}
