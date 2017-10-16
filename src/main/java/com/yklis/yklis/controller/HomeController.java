package com.yklis.yklis.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.yklis.lisfunction.entity.WorkerEntity;
import com.yklis.lisfunction.service.ScalarSQLCmdService;
import com.yklis.lisfunction.service.SelectDataSetSQLCmdService;
import com.yklis.lisfunction.service.WorkerService;
import com.yklis.util.CommFunction;
import com.yklis.yklis.util.Constants;

@Controller
@RequestMapping("/") 
public class HomeController{
	
    private Logger logger = Logger.getLogger(this.getClass());

	    
    @Autowired
    private WorkerService workerService;    

    @Autowired
    private SelectDataSetSQLCmdService selectDataSetSQLCmdService;    

    @Autowired
    private ScalarSQLCmdService scalarSQLCmdService;

    @RequestMapping("index")
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String handleIndexPageRequest(HttpServletRequest request,HttpServletResponse response) {
    	
    	//获取授权使用单位 begin
    	String s1 = scalarSQLCmdService.ScalarSQLCmd("select Name from CommCode where TypeName='系统代码' and ReMark='授权使用单位' ");
    	//{"success":true,"response":{"result":""}}
    	    	
    	String s2 = null;
    	
    	JsonParser parser =new JsonParser();//创建json解析器
    	JsonElement jsonElement =parser.parse(s1);
    	//josn字符串转换为json对象
    	JsonObject jsonObject =jsonElement.getAsJsonObject();
    	JsonPrimitive jpSuccess =jsonObject.getAsJsonPrimitive("success");
    	boolean success = jpSuccess.getAsBoolean();
    	if(success){
    		
    	    //获得 response节点的值，response节点为Object数据节点 
    	    JsonObject joResponse = jsonObject.getAsJsonObject("response");  
    	    JsonPrimitive jpResult =joResponse.getAsJsonPrimitive("result");  
    	    String result =jpResult.getAsString();
    	    
    	    s2 = CommFunction.deCryptStr(result, Constants.DES_KEY);
    	}
    	
    	//中文add到cookie时会报错,故URLEncoder.encode
        String s3 = null;
        try {
            s3 = URLEncoder.encode(s2, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("URLEncoder.encode报错:"+e.toString());
        }
        
        if("".equals(s3)||null==s3){
            Cookie cookie = new Cookie("yklis.SCSYDW",null);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }else{
            Cookie cookie = new Cookie("yklis.SCSYDW",s3);
            response.addCookie(cookie);            
        }        
    	//获取授权使用单位 end
   	        
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
            @RequestParam(value = "password",required = false) String password,
            @CookieValue(value = "yklis.account",required = false) String cookieAccount,
            @CookieValue(value = "yklis.request",required = false) String cookieRequest) {
                        
        //passWord为null时Mybatis并不会作为空字符串""处理
    	String tmpPassword = password;
        if(null == password){
        	tmpPassword = "";
        }
        
        List<WorkerEntity> workerList = workerService.ifCanLogin(account, tmpPassword);

        if((workerList == null)||(workerList.isEmpty())){
            
            Map<String, Object> modelMap = new HashMap<>();
            modelMap.put("msg", "用户或密码错误");
            
            return new ModelAndView("login", modelMap);
        }
        
        Cookie cookie = new Cookie("yklis.account",account);
        response.addCookie(cookie);                

        if("".equals(cookieRequest)||(null==cookieRequest)){
            
            return new ModelAndView("index", null);
        }else{
            
            Cookie cookie2 = new Cookie("yklis.request",null);
            cookie2.setMaxAge(0);
            response.addCookie(cookie2);
            
            String str1 = cookieRequest.replace(request.getContextPath()+"/","");
            
            return new ModelAndView(str1, null);
        }
    }
    
    @RequestMapping(value = "selectLabReport" )
    //此处需要@ResponseBody.否则,认为返回的是页面名称,会因为找不到该页面导致ajax方法进入error(404)
    @ResponseBody
    public String selectLabReport(HttpServletRequest request,HttpServletResponse response) {               
        
    	String checkDate = request.getParameter("checkDate");
    	String printtimes = request.getParameter("printtimes");
    	String caseno = request.getParameter("caseno");
    	String patientname = request.getParameter("patientname");
    	String deptname = request.getParameter("deptname");
    	String check_doctor = request.getParameter("check_doctor");
    	
    	 String SHOW_CHK_CON="select top 1000 patientname as 姓名,"+
    		        " sex as 性别,"+
    		        " age as 年龄,0 as 选择,caseno as 病历号,bedno as 床号,deptname as 送检科室,"+
    		        " check_doctor as 送检医生,check_date as 检查日期,"+
    		        " report_date as 申请日期,report_doctor as 审核者,"+//dbo.uf_GetPatientCombName(ifCompleted,unid) as 组合项目,
    		        " combin_id as 工作组,operator as 操作者,diagnosetype as 优先级别,"+
    		        " (case when len(caseno)=8 and LEFT(caseno,1)='8' then 1 else isnull(printtimes,0) end) as 打印次数,"+//PEIS的单:caseno长度为8且以8开头
    		        " flagetype as 样本类型,diagnose as 临床诊断,typeflagcase as 样本情况,"+
    		        " issure as 备注,unid as 唯一编号, "+
    		        " isnull(His_Unid,'') as His唯一编号,isnull(His_MzOrZy,'') as His门诊或住院, "+
    		        " isnull(WorkDepartment,'') as 所属部门,isnull(WorkCategory,'') as 工种,isnull(WorkID,'') as 工号,isnull(ifMarry,'') as 婚否,isnull(OldAddress,'') as 籍贯,isnull(Address,'') as 住址,isnull(Telephone,'') as 电话,isnull(WorkCompany,'') as 所属公司, "+
    		        " Audit_Date as 审核时间,ifCompleted,checkid as 联机号,lsh as 流水号 "+
    		        " from view_Chk_Con_All ";
    	
    	String strsql44;
		  if( "1".equals(checkDate)){
			    strsql44 =" CONVERT(CHAR(10),check_date,121)=CONVERT(CHAR(10),GETDATE(),121) and ";			  
		  }
		  else if ("2".equals(checkDate)) {
			  strsql44=" check_date>GETDATE()-7 and ";
		  }		    
		  else if ("3".equals(checkDate)) {
			  strsql44=" check_date>GETDATE()-30 and ";
		  }		    
		  else strsql44=" ";

		  String STRSQL46;
		  if ( "1".equals(printtimes)){
			    STRSQL46=" isnull((case when len(caseno)=8 and LEFT(caseno,1)=''8'' then 1 else printtimes end),0)<=0 and ";		  
		  }
  		  else STRSQL46="";
		  
		  StringBuilder STRSQL48 = new StringBuilder("");
		  if (!"".equals(caseno.trim())) {
			  STRSQL48.append(" Caseno='");
			  STRSQL48.append(caseno.trim());
			  STRSQL48.append("' and ");
		  }
		  
		  StringBuilder STRSQL22 = new StringBuilder("");
		  if (!"".equals(patientname.trim())) {
			  STRSQL22.append(" patientname like '%");
			  STRSQL22.append(patientname.trim());
			  STRSQL22.append("%' and ");
		  }
		  
		  StringBuilder STRSQL45 = new StringBuilder("");
		  if (!"".equals(deptname.trim())) {
			  STRSQL45.append(" deptname='");
			  STRSQL45.append(deptname.trim());
			  STRSQL45.append("' and ");
		  }
		  
		  StringBuilder STRSQL50 = new StringBuilder("");
		  if (!"".equals(check_doctor.trim())) {
			  STRSQL50.append(" check_doctor='");
			  STRSQL50.append(check_doctor.trim());
			  STRSQL50.append("' and ");
		  }
		  
		  String STRSQL47=" isnull(report_doctor,'')<>'' ";
		  String STRSQL49=" order by patientname ";
		  
	    StringBuilder sbSQL = new StringBuilder();
	    sbSQL.append(SHOW_CHK_CON);
	    sbSQL.append(" where ");
	    sbSQL.append(strsql44);
	    sbSQL.append(STRSQL46);
	    sbSQL.append(STRSQL48);
	    sbSQL.append(STRSQL22);
	    sbSQL.append(STRSQL45);
	    sbSQL.append(STRSQL50);
	    sbSQL.append(STRSQL47);
	    sbSQL.append(STRSQL49);
	    
	    //logger.info("selectLabReport方法：SQL:"+sbSQL.toString());
		      	
    	String aa = selectDataSetSQLCmdService.selectDataSetSQLCmd(sbSQL.toString());
    	
	    //logger.info("selectLabReport方法：结果:"+aa);
	    
        //获取输入参数  
        //Map<String, String[]> inputParamMap = request.getParameterMap();
        
        //Gson gson = new Gson();
        
        //logger.info("selectLabReport:"+gson.toJson(inputParamMap));
        return aa;
    }
    
    @RequestMapping("labReport")
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String labReport(HttpServletRequest request) {
    	
        return "labReport";
    } 
    
    @RequestMapping("logout")
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String logout(HttpServletRequest request,HttpServletResponse response) {
    	
        Cookie cookie = new Cookie("yklis.account",null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);                

        Cookie cookie2 = new Cookie("yklis.request",null);
        cookie2.setMaxAge(0);
        response.addCookie(cookie2);
    	
        return "index";
    }
    
    @RequestMapping("checkValue")
    @ResponseBody
    public ModelAndView checkValue(HttpServletRequest request,HttpServletResponse response) {
    	
    	String unid = request.getParameter("unid");
    	String ifCompleted = request.getParameter("ifCompleted");
    	
    	String  strsql11="select "+
    	            "(case when photo is null then null else '图' end) as 图,"+
    	            "combin_Name as 组合项目,name as 名称,english_name as 英文名,itemvalue as 检验结果,"+
    	            "min_value as 最小值,max_value as 最大值,"+
    	            "unit as 单位,"+
    	            "pkcombin_id as 组合项目号,itemid as 项目编号,valueid as 唯一编号 "+
    	            " from ";
    	String strsql12;
    	if("1".equals(ifCompleted)){
    		strsql12="chk_valu_bak";
    	}else{
    		strsql12="chk_valu";
    	}

    	String strsql13=" where pkunid=";
    	String strsql14=unid;
    	String strsql15=" and issure=1 and ltrim(rtrim(isnull(itemvalue,'')))<>'' "+
    	            " order by pkcombin_id,printorder ";
    			  
	    StringBuilder sbSQL = new StringBuilder();
	    sbSQL.append(strsql11);
	    sbSQL.append(strsql12);
	    sbSQL.append(strsql13);
	    sbSQL.append(strsql14);
	    sbSQL.append(strsql15);
	    
	    //logger.info("selectLabReport方法：SQL:"+sbSQL.toString());
		      	    	
    	
	    //logger.info("selectLabReport方法：结果:"+aa);
	    
        //获取输入参数  
        //Map<String, String[]> inputParamMap = request.getParameterMap();
        
        //Gson gson = new Gson();
        
        //logger.info("selectLabReport:"+gson.toJson(inputParamMap));
		ModelAndView mv = new ModelAndView();
		mv.addObject("DataTable", selectDataSetSQLCmdService.selectDataSetSQLCmd2(sbSQL.toString()));
		mv.setViewName("checkValue");
		
		return mv;
    }
    
    @RequestMapping("printReport")
    //此处需要@ResponseBody.否则,认为返回的是页面名称,会因为找不到该页面导致ajax方法进入error(404)
    @ResponseBody
    public String printReport(HttpServletRequest request) {
    	
    	String unid = request.getParameter("unid");
    	String ifCompleted = request.getParameter("ifCompleted");
    	
    	List<Map<String, Object>> lsChkcon;
    	List<Map<String, Object>> lsChkvalu;
    	
    	if("1".equals(ifCompleted)){
    		lsChkcon = selectDataSetSQLCmdService.selectDataSetSQLCmd2("select * from chk_con_bak where unid="+unid);
    		lsChkvalu = selectDataSetSQLCmdService.selectDataSetSQLCmd2("select *,dbo.uf_Reference_Value_B1(min_value,max_value) as 前段参考范围,isnull(dbo.uf_Reference_Value_B2(min_value,max_value),'') as 后段参考范围  from chk_valu_bak where pkunid="+unid);
    		
    	}else{
    		lsChkcon = selectDataSetSQLCmdService.selectDataSetSQLCmd2("select * from chk_con where unid="+unid);
    		lsChkvalu = selectDataSetSQLCmdService.selectDataSetSQLCmd2("select *,dbo.uf_Reference_Value_B1(min_value,max_value) as 前段参考范围,isnull(dbo.uf_Reference_Value_B2(min_value,max_value),'') as 后段参考范围 from chk_valu where pkunid="+unid);
    		
    	}  
    	
    	Map<String, Object>    map2 = null;
    	for(int i=0;i<lsChkcon.size();i++){   
    		map2    =    lsChkcon.get(i);   
    	}    
        map2.put("chkvalu", lsChkvalu);
        
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);
        map.put("response", map2);
        
    	Gson gson = new Gson();
    	String ss = gson.toJson(map);
        
        return ss;
    }
}
