package com.yklis.yklis.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yklis.lisfunction.entity.WorkerEntity;
import com.yklis.lisfunction.service.ExecSQLCmdService;
import com.yklis.lisfunction.service.ScalarSQLCmdService;
import com.yklis.lisfunction.service.SelectDataSetSQLCmdService;
import com.yklis.lisfunction.service.WorkerService;
import com.yklis.util.CommFunction;
import com.yklis.yklis.util.Constants;

@Controller
@RequestMapping("/") 
public class HomeController{
	
    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    private final transient Logger logger = Logger.getLogger(this.getClass());
	    
    @Autowired
    private WorkerService workerService;    

    @Autowired
    private SelectDataSetSQLCmdService selectDataSetSQLCmdService;    

    @Autowired
    private ScalarSQLCmdService scalarSQLCmdService;

    @Autowired
    private ExecSQLCmdService execSQLCmdService;

    @RequestMapping("index")
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String handleIndexPageRequest(HttpServletRequest request,HttpServletResponse response) {
    	   	        
        return "index";
    }
    
    @RequestMapping(value = "goLogin" )
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String goLogin(HttpServletRequest request,HttpServletResponse response) {               
        
        return "login";
    }    
    
    @RequestMapping(value = "login" )
    //返回ModelAndView时,有没有@ResponseBody都没关系,因为已经很明确的指定了页面名称、页面内容
    @ResponseBody
    public ModelAndView login(HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam(value = "account",required = true) String account,
            @RequestParam(value = "password",required = false) String password,
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
        
        //请求远程用户信息接口begin
        URL url = null;
        try {
            url = new URL(Constants.BASE_URL);
        } catch (MalformedURLException e) {
            logger.error("new URL失败:"+e.toString());
        }
        HttpURLConnection httpURLConnection = null;
        try {
            httpURLConnection = (HttpURLConnection) url.openConnection();
        } catch (IOException e) {
            logger.error("url.openConnection失败:"+e.toString());
        }
        try {
            httpURLConnection.setRequestMethod("POST");
        } catch (ProtocolException e) {
            logger.error("httpURLConnection.setRequestMethod失败:"+e.toString());
        }
        
        //设置连接主机超时（单位：毫秒）
        httpURLConnection.setConnectTimeout(2000);
        //设置从主机读取数据超时（单位：毫秒）
        httpURLConnection.setReadTimeout(2000);
        //设置是否向httpUrlConnection输出,因为这个是post请求,参数要放在http正文内,因此需要设为true, 默认情况下是false
        httpURLConnection.setDoOutput(true);
        //设置是否从httpUrlConnection读入,默认情况下是true
        httpURLConnection.setDoInput(true);
        //Post请求不能使用缓存
        httpURLConnection.setUseCaches(false);
        
        String methodNum = "AIF012";
        String customer = querySqsydw();
        String localIP = request.getRemoteAddr();//客户端IP
        String localName = request.getLocalName();//WEB服务器名称
        StringBuilder sbSql = new StringBuilder();
        sbSql.append("insert into AppVisit (SysName,PageName,IP,ComputerName,Customer,UserName,ActionName,ActionTime) values ('LIS_BS','login','");
        sbSql.append(localIP);
        sbSql.append("','");
        sbSql.append(localName);
        sbSql.append("','");
        sbSql.append(customer);
        sbSql.append("','");
        sbSql.append(account);
        sbSql.append("','login success',getdate())");

        String[] sl1={methodNum};
        String[] sl2={sbSql.toString()};
        Map<String, String[]> inputParamMap = new HashMap<>();
        inputParamMap.put("methodNum", sl1);
        inputParamMap.put("sql", sl2);
        String sign = CommFunction.signCalc(inputParamMap,null);
        
        //请求接口前,对中文参数进行编码。可以对所以参数进行编码,因为对英文参数编码不会有变化
        String sql = null;
        try {
        	sql = URLEncoder.encode(sbSql.toString(), "utf-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("URLEncoder.encode sql失败"+e.toString());
		}
        
        PrintWriter printWriter = null;
        try {
            printWriter = new PrintWriter(httpURLConnection.getOutputStream());

            String param = "methodNum="+methodNum+"&sql="+sql+"&sign="+sign;
            printWriter.write(param);
        } catch (IOException e) {
            logger.error("httpURLConnection.getOutputStream失败:"+e.toString());
        } finally {
            if (printWriter != null) printWriter.close();
        }
        
        //开始获取数据
        int responseCode = 0;
		try {
			responseCode = httpURLConnection.getResponseCode();
		} catch (IOException e) {
			logger.error("httpURLConnection.getResponseCode失败:"+e.toString());
		}

		if(responseCode!=HttpURLConnection.HTTP_OK){
			
			//只有在httpURLConnection.HTTP_OK的情况下才能读取返回信息
			logger.info("请求远程用户信息接口,返回非200代码:"+responseCode+".可能签名验证不通过");
		}
        //请求远程用户信息接口end
        		
		HttpSession session = request.getSession(true);//参数默认值:true
        //该session值用于header.jsp中显示
        session.setAttribute("yklis.account", account);
		
        if("".equals(cookieRequest)||(null==cookieRequest)){
            
            return new ModelAndView("index", null);
        }else{
            
            Cookie cookie2 = new Cookie("yklis.request",null);
            cookie2.setMaxAge(0);
            response.addCookie(cookie2);
            
            String str1 = cookieRequest.replace(request.getContextPath()+"/","");
            
            //需要密码验证的页面,如果请求与页面名称不相符,都要做这样的处理
            switch(str1){
            case "goModifyPwd":
                str1 = "modifyPwd";
                break;
            }
            
            return new ModelAndView(str1, null);
        }
    }

	@RequestMapping(value = "selectLabReport" ,produces = "html/text;charset=UTF-8")
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
			    STRSQL46=" isnull((case when len(caseno)=8 and LEFT(caseno,1)='8' then 1 else printtimes end),0)<=0 and ";		  
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
	    
	    //logger.info("abcd:"+sbSQL.toString());
		      	
    	String aa = selectDataSetSQLCmdService.selectDataSetSQLCmd(sbSQL.toString());
    	
        return aa;
    }
    
    @RequestMapping("labReport")
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String labReport(HttpServletRequest request) {    	
        
        return "labReport";
    }
    
    @RequestMapping(value = "loadDeptname" ,produces = "html/text;charset=UTF-8")
    @ResponseBody
    public String loadDeptname(HttpServletRequest request) {
                
        return selectDataSetSQLCmdService.selectDataSetSQLCmd("select Name from CommCode where TypeName='部门'");
    }
    
    @RequestMapping(value = "loadWorker" ,produces = "html/text;charset=UTF-8")
    @ResponseBody
    public String loadWorker(HttpServletRequest request) {
                
        return selectDataSetSQLCmdService.selectDataSetSQLCmd("select name from worker");
    }
    
    @RequestMapping("logout")
    //不能加@ResponseBody,否则,不会跳转到index页面,而是将index做为字符串返回到当前页面中
    public String logout(HttpServletRequest request,HttpServletResponse response) {
    	
        HttpSession session = request.getSession(false);//参数默认值:true
        if(null!=session){
            session.invalidate();
        }

        Cookie cookie2 = new Cookie("yklis.request",null);
        cookie2.setMaxAge(0);
        response.addCookie(cookie2);
    	
        return "index";
    }
    
    @RequestMapping("checkValue")
    //返回ModelAndView时,有没有@ResponseBody都没关系,因为已经很明确的指定了页面名称、页面内容
    @ResponseBody
    public ModelAndView checkValue(HttpServletRequest request,HttpServletResponse response) {
    	
    	String unid = request.getParameter("unid");
    	String ifCompleted = request.getParameter("ifCompleted");
    	//以下4个参数仅用于显示到结果界面
        String patientname = null;
        try {
            //IE get方式传参,后端取到的中文可能乱码
            //处理方式:前端使用两次encodeURIComponent编码,后台用下面的方式解码
            patientname = URLDecoder.decode(request.getParameter("patientname"),"utf-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("URLDecoder.decode patientname报错:"+e.toString());
        }
        String sex = null;
        try {
            sex = URLDecoder.decode(request.getParameter("sex"),"utf-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("URLDecoder.decode sex报错:"+e.toString());
        }
        String age = null;
        try {
            age = URLDecoder.decode(request.getParameter("age"),"utf-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("URLDecoder.decode age报错:"+e.toString());
        }
        String check_date = request.getParameter("check_date");
    	
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
	    sbSQL.append("select (case when photo is null then null else '图' end) as 图,combin_Name as 组合项目,name as 名称,english_name as 英文名,itemvalue as 检验结果,dbo.uf_ValueAlarm(itemid,Min_value,Max_value,itemvalue) as ifValueAlarm,min_value as 最小值,max_value as 最大值,unit as 单位,pkcombin_id as 组合项目号,itemid as 项目编号,valueid as 唯一编号 from ");
	    sbSQL.append(strsql12);
	    sbSQL.append(strsql13);
	    sbSQL.append(strsql14);
	    sbSQL.append(strsql15);
	    
		String ss1 = selectDataSetSQLCmdService.selectDataSetSQLCmd(sbSQL.toString());
		
		JSONObject jso=JSON.parseObject(ss1);//json字符串转换成JSONObject(JSON对象)
		
		boolean bb1 = jso.getBooleanValue("success");
		if(!bb1){
			
		}

		JSONArray jsarr=jso.getJSONArray("response");//JSONObject取得response对应的JSONArray(JSON数组)
		
		ModelAndView mv = new ModelAndView();
        mv.addObject("DataTable", jsarr);

        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("patientname", patientname);
        modelMap.put("sex", sex);
        modelMap.put("age", age);
        modelMap.put("check_date", check_date);
        mv.addObject("baseInfo", modelMap);
        
		mv.setViewName("checkValue");
		
		return mv;
    }
    
    @RequestMapping(value = "printReport" ,produces = "html/text;charset=UTF-8")
    //此处需要@ResponseBody.否则,认为返回的是页面名称,会因为找不到该页面导致ajax方法进入error(404)
    @ResponseBody
    public String printReport(HttpServletRequest request,HttpServletResponse response) {
    	        
        /**
        [{"unid":"25","ifCompleted":"0"},{"unid":"24","ifCompleted":"0"},{"unid":"23","ifCompleted":"1"}]
         */
        String lsSelected = request.getParameter("lsSelected");
        
        JSONArray selected = JSON.parseArray(lsSelected);
		
        List<Map<String, Object>> listCheckInfo = new ArrayList<>();
                
        for(int j = 0 ; j < selected.size() ; j++) {
            
            String unid = selected.getJSONObject(j).getString("unid");
            String ifCompleted = selected.getJSONObject(j).getString("ifCompleted");
            
            StringBuilder sbChkcon = new StringBuilder();
            sbChkcon.append("select * from ");
            if("1".equals(ifCompleted)){
                sbChkcon.append("chk_con_bak ");
            }else{
                sbChkcon.append("chk_con ");
            }
            sbChkcon.append("where unid=");
            sbChkcon.append(unid);
            
            StringBuilder sbChkvalu = new StringBuilder();
            sbChkvalu.append("select itemid,Name,english_name,itemvalue,Min_value,Max_value,dbo.uf_Reference_Value_B1(min_value,max_value) as 前段参考范围,isnull(dbo.uf_Reference_Value_B2(min_value,max_value),'') as 后段参考范围,Unit,min(printorder) as 打印编号,min(pkcombin_id) as 组合项目号,Reserve1,Reserve2,Dosage1,Dosage2,Reserve5,Reserve6,Reserve7,Reserve8,Reserve9,Reserve10,dbo.uf_ValueAlarm(itemid,Min_value,Max_value,itemvalue) as ifValueAlarm from ");
            if("1".equals(ifCompleted)){
                sbChkvalu.append("chk_valu_bak ");
            }else{
                sbChkvalu.append("chk_valu ");
            }    
            sbChkvalu.append("where pkunid=");
            sbChkvalu.append(unid);
            sbChkvalu.append(" and issure=1 and ltrim(rtrim(isnull(itemvalue,'')))<>'' group by itemid,name,english_name,itemvalue,min_value,max_value,unit,Reserve1,Reserve2,Dosage1,Dosage2,Reserve5,Reserve6,Reserve7,Reserve8,Reserve9,Reserve10 order by 组合项目号,打印编号");
            
            String ssChkcon = selectDataSetSQLCmdService.selectDataSetSQLCmd(sbChkcon.toString());
            String ssChkvalu = selectDataSetSQLCmdService.selectDataSetSQLCmd(sbChkvalu.toString());
            
    		JSONObject jsoChkcon=JSON.parseObject(ssChkcon);//json字符串转换成JSONObject(JSON对象)
    		
    		boolean bbChkcon = jsoChkcon.getBooleanValue("success");
    		if(!bbChkcon){
    			
    		}

    		JSONArray jsarrChkcon=jsoChkcon.getJSONArray("response");//JSONObject取得response对应的JSONArray(JSON数组)
            
            Map<String, Object> map = null;
            for(int i=0;i<jsarrChkcon.size();i++){   
                map = jsarrChkcon.getJSONObject(i);
            }
            
    		JSONObject jsoChkvalu=JSON.parseObject(ssChkvalu);//json字符串转换成JSONObject(JSON对象)
    		
    		boolean bbChkvalu = jsoChkcon.getBooleanValue("success");
    		if(!bbChkvalu){
    			
    		}

    		JSONArray jsarrChkvalu=jsoChkvalu.getJSONArray("response");//JSONObject取得response对应的JSONArray(JSON数组)
            
            map.put("chkvalu", jsarrChkvalu);
            
            listCheckInfo.add(map);
        }
    	       
    	String ss = JSON.toJSONString(listCheckInfo);
        
        return ss;
    }
    
    @RequestMapping(value = "commonQuestion" )
    public String commonQuestion(HttpServletRequest request,HttpServletResponse response) {               
        
        return "commonQuestion";
    }
    
    @RequestMapping(value = "updatePrinttimes" )
    @ResponseBody
    public String updatePrinttimes(HttpServletRequest request,HttpServletResponse response) {               
        
        String ifCompleted = request.getParameter("ifCompleted");
        String unid = request.getParameter("unid");
        
        StringBuilder sb = new StringBuilder();
        sb.append("update ");
        if("1".equals(ifCompleted)){
            sb.append("chk_con_bak");
        }else{
            sb.append("chk_con");
        }
        sb.append(" set printtimes=1 where unid=");
        sb.append(unid);

        return execSQLCmdService.ExecSQLCmd(sb.toString());
    }
    
    @RequestMapping(value = "insertPrinttimes" )
    @ResponseBody
    public String insertPrinttimes(HttpServletRequest request,HttpServletResponse response) {               
        
        String unid = request.getParameter("unid");
        String operator_name = request.getParameter("operator_name");
        
        StringBuilder sb = new StringBuilder();
        sb.append("insert into pix_tran (pkunid,Reserve1,Reserve2,OpType) values (");
        sb.append(unid);
        sb.append(",'");
        sb.append(operator_name);
        sb.append("','Class_Print','");
        sb.append(Constants.SYSNAME);
        sb.append("')");
        
        return execSQLCmdService.ExecSQLCmd(sb.toString());
    }
    
    @RequestMapping("goModifyPwd")
    public String goModifyPwd(HttpServletRequest request) {
                
        return "modifyPwd";
    }
    
    @RequestMapping("modifyPwd")
    public ModelAndView modifyPwd(HttpServletRequest request,
            @CookieValue(value = "yklis.account",required = false) String cookieAccount) {
                
        String oldPwd = request.getParameter("oldPwd");
        String newPwd = request.getParameter("newPwd");
        String confirmPwd = request.getParameter("confirmPwd");
        
        List<WorkerEntity> workerList = workerService.ifCanLogin(cookieAccount, oldPwd);

        if((workerList == null)||(workerList.isEmpty())){
            
            Map<String, Object> modelMap = new HashMap<>();
            modelMap.put("msg", "原密码错误");
            
            return new ModelAndView("modifyPwd", modelMap);
        }
        
        if(!newPwd.equals(confirmPwd)){
            
            Map<String, Object> modelMap = new HashMap<>();
            modelMap.put("msg", "两次输入的新密码不一致");
            
            return new ModelAndView("modifyPwd", modelMap);
        }
        
        StringBuilder sb = new StringBuilder();
        sb.append("update worker set passwd='");
        sb.append(newPwd);
        sb.append("' where id='");
        sb.append(cookieAccount);
        sb.append("'");
        
        String ss1 = execSQLCmdService.ExecSQLCmd(sb.toString());
        
        JSONObject jso=JSON.parseObject(ss1);//json字符串转换成JSONObject(JSON对象)
        boolean bb1 = jso.getBooleanValue("success");
        
        if(bb1){
        
            Map<String, Object> modelMap = new HashMap<String, Object>();
            modelMap.put("msg", "密码修改成功!");
            return new ModelAndView("modifyPwdSucc", modelMap);
        }else{
            
            JSONObject jso2=jso.getJSONObject("response");
            String errorMsg =jso2.getString("errorMsg");
            
            Map<String, Object> modelMap = new HashMap<String, Object>();
            modelMap.put("msg", "密码修改失败:"+errorMsg);
            return new ModelAndView("modifyPwd", modelMap);
        }
    }
    
    @RequestMapping(value = "querySqsydw")
    @ResponseBody
    public String querySqsydw() {
                
        //获取授权使用单位
        String s1 = scalarSQLCmdService.ScalarSQLCmd("select Name from CommCode where TypeName='系统代码' and ReMark='授权使用单位' ");
        //{"success":true,"response":{"result":""}}
                
        JSONObject jso=JSON.parseObject(s1);//json字符串转换成JSONObject(JSON对象)
        boolean bb1 = jso.getBooleanValue("success");
        
        String s2 = null;
        
        if(bb1){
            
            JSONObject jso2=jso.getJSONObject("response");
            String result =jso2.getString("result");
            
            s2 = CommFunction.deCryptStr(result, Constants.DES_KEY);            
        }
        
        return s2;
    }
        
    @RequestMapping("querySessionAccount")
    @ResponseBody
    public String querySessionAccount(HttpServletRequest request) {
        
        String s2 = null;
        
        HttpSession session = request.getSession(false);
        if(null!=session){
            s2 = (String) session.getAttribute("yklis.account");
        }                
        
        return s2;
    }
}
