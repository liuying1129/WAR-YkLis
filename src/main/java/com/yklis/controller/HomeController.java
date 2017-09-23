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
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
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
    
    @RequestMapping(value = "selectLabReport" )
    @ResponseBody
    public String selectLabReport(HttpServletRequest request,HttpServletResponse response) {               
        
    	  		  /*if RadioGroup1.ItemIndex=1 then
    			    strsql44:=' CONVERT(CHAR(10),check_date,121)=CONVERT(CHAR(10),GETDATE(),121) and '
    			  else if RadioGroup1.ItemIndex=2 then
    			    strsql44:=' check_date>GETDATE()-7 and '
    			  else if RadioGroup1.ItemIndex=3 then
    			    strsql44:=' check_date>GETDATE()-30 and '
    			  else strsql44:=' ';
    			  if RadioGroup3.ItemIndex=1 then
    			    STRSQL46:=' isnull((case when len(caseno)=8 and LEFT(caseno,1)=''8'' then 1 else printtimes end),0)<=0 and '
    			  else STRSQL46:='';
    			  if trim(LabeledEdit1.Text)<>'' then STRSQL48:=' Caseno='''+trim(LabeledEdit1.Text)+''' and '
    			  else STRSQL48:='';
    			  if trim(LabeledEdit2.Text)<>'' then STRSQL22:=' patientname like ''%'+trim(LabeledEdit2.Text)+'%'' and '
    			  else STRSQL22:='';
    			  if trim(LabeledEdit3.Text)<>'' then STRSQL45:=' deptname='''+trim(LabeledEdit3.Text)+''' and '
    			  else STRSQL45:='';
    			  if trim(LabeledEdit4.Text)<>'' then STRSQL50:=' check_doctor='''+trim(LabeledEdit4.Text)+''' and '
    			  else STRSQL50:='';
    			  STRSQL47:=' isnull(report_doctor,'''')<>'''' ';
    			  STRSQL49:=' order by patientname ';
    			  ADObasic.Close;
    			  ADObasic.SQL.Clear;
    			  ADObasic.SQL.Add(SHOW_CHK_CON);
    			  ADObasic.SQL.Add(' where ');
    			  ADObasic.SQL.Add(strsql44);
    			  ADObasic.SQL.Add(strsql46);
    			  ADObasic.SQL.Add(strsql48);
    			  ADObasic.SQL.Add(strsql22);
    			  ADObasic.SQL.Add(strsql45);
    			  ADObasic.SQL.Add(strsql50);
    			  ADObasic.SQL.Add(strsql47);
    			  ADObasic.SQL.Add(strsql49);
    			  ADObasic.Open;*/

    	String checkDate = request.getParameter("checkDate");
    	String printtimes = request.getParameter("printtimes");
    	String caseno = request.getParameter("caseno");
    	String patientname = request.getParameter("patientname");
    	String deptname = request.getParameter("deptname");
    	String check_doctor = request.getParameter("check_doctor");
    	
        //获取输入参数  
        Map<String, String[]> inputParamMap = request.getParameterMap();
        
        Gson gson = new Gson();
        
        logger.info("selectLabReport:"+gson.toJson(inputParamMap));
        return gson.toJson(inputParamMap);
    }          
}
