package com.yklis.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.yklis.entity.WorkerEntity;
import com.yklis.service.WorkerService;

@Controller
@RequestMapping("/") 
public class HomeController{
	
    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    private transient Logger logger = Logger.getLogger(this.getClass());
    
    @Autowired
    private WorkerService workerService;    

    @RequestMapping("index")
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String handleIndexPageRequest(HttpServletRequest request) {
    	
        return "index";
    }
    
    @RequestMapping(value = "goLogin" )
    @ResponseBody
    public ModelAndView goLogin(HttpServletRequest request,HttpServletResponse response) {               
        
        Map<String, Object> modelMap = new HashMap<String, Object>();
        //modelMap.put("user", name);
        return new ModelAndView("login", modelMap);        
    }    
    
    @RequestMapping(value = "login" )
    @ResponseBody
    public ModelAndView login(HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam(value = "account",required = true) String account,
            @RequestParam(value = "password",required = false) String password) {               
        
        logger.info("login方法。用户【" + account + "】,密码:【"+password+"】");        
                
        //passWord为null时Mybatis并不会作为空字符串""处理
    	String tmpPassword = password;
        if(null == password){
        	tmpPassword = "";
            logger.info("密码为null");
        }
        
        List<WorkerEntity> workerList = workerService.ifCanLogin(account, tmpPassword);

        if((workerList == null)||(workerList.isEmpty())){
            
            Map<String, Object> modelMap = new HashMap<>();
            modelMap.put("msg", "用户或密码错误");
            
            return new ModelAndView("login", modelMap);
        }           
                
        return new ModelAndView("labReport", null);
    }      
}
