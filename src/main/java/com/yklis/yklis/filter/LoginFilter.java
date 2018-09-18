package com.yklis.yklis.filter;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

/**
 * 未登录的情况下，强制进入登录页面
 * @author ying07.liu
 *
 */
public class LoginFilter implements Filter {	
    
    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    private final Logger logger = Logger.getLogger(this.getClass());

    private ServletContext servletContext;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    	
    	servletContext = filterConfig.getServletContext();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req= (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;  
                  
        //生成二维码图片begin
        //servletContext.getRealPath("/")->D:\Tools\apache-tomcat-8.5.4\webapps\YkLis\
        String ssFile = servletContext.getRealPath("/")+"static/images/QRCodeURL.png";
        File file = new File(ssFile);
        if(!file.exists()) {
        	
            String contents = req.getScheme()+"://"+req.getServerName()+":"+req.getServerPort()+req.getContextPath()+"/";
            Map<EncodeHintType, Object> encodeHints = new HashMap<EncodeHintType, Object>();
            encodeHints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            BitMatrix bitMatrix = null;
            try {
                bitMatrix = new MultiFormatWriter().encode(contents, BarcodeFormat.QR_CODE, 100, 100, encodeHints);
            } catch (WriterException e) {
                logger.error("MultiFormatWriter.encode失败:"+e.toString());
            }
        	Path path = FileSystems.getDefault().getPath(ssFile);
            try {
            	MatrixToImageWriter.writeToPath(bitMatrix, "png", path);
            } catch (IOException e) {
                logger.error("MatrixToImageWriter.writeToPath失败:"+e.toString());
            }
        }
        //生成二维码图片end

        //静态资源文件
        if (req.getRequestURI().indexOf("/static/") >= 0) {
            //chain.doFilter表示放过去，不做处理
            chain.doFilter(request, response);
            return;
        }

        //request.getContextPath()取得项目名称，如/YkLis
        if ((req.getContextPath()+"/").equals(req.getRequestURI())
          ||(req.getContextPath()+"/index").equals(req.getRequestURI())
          ||(req.getContextPath()+"/querySqsydw").equals(req.getRequestURI())
          ||(req.getContextPath()+"/querySessionAccount").equals(req.getRequestURI())          
          ||(req.getContextPath()+"/goLogin").equals(req.getRequestURI())
          ||(req.getContextPath()+"/logout").equals(req.getRequestURI())
          ||(req.getContextPath()+"/login").equals(req.getRequestURI())
          ||(req.getContextPath()+"/html/siteMap.html").equals(req.getRequestURI())){
            chain.doFilter(request, response);
            return;
        }
                      
        //yklis.isLogin为true,表示已经成功登录的情况
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        HttpSession session = httpRequest.getSession(false);//参数默认值:true
        if(null!=session){
            
            Object o2 = session.getAttribute("yklis.isLogin");
            if(null != o2) {
                
                boolean b2 = (boolean) o2;
                        
                if(b2) {                
                    chain.doFilter(request, response);
                    return;
                }                
            }
        }
        
        //记录请求地址,以便登录成功后可以跳转到相应的页面
        Cookie cookie3 = new Cookie("yklis.request",req.getRequestURI());
        res.addCookie(cookie3);
        
        res.sendRedirect(req.getContextPath()+"/goLogin");            
    }

    @Override
    public void destroy() {

    }

}
