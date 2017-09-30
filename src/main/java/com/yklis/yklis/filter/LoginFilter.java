package com.yklis.yklis.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

public class LoginFilter implements Filter {
	
    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    //private transient Logger logger = Logger.getLogger(this.getClass());

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req= (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;  
          
        //静态资源文件
        if (req.getRequestURI().indexOf("/static/") >= 0) {
        	//logger.info("doFilter方法,请求URI /static/");
            chain.doFilter(request, response);
            return;
        }

        //request.getContextPath()取得项目名称，如/YkLis
        if ((req.getContextPath()+"/").equals(req.getRequestURI())) {
        	//logger.info("doFilter方法,请求URI /YkLis/");
            chain.doFilter(request, response);
            return;
        }
        
        if (req.getRequestURI().indexOf("index") >= 0) {
        	//logger.info("doFilter方法,请求URI index");
            chain.doFilter(request, response);
            return;
        }
        
        if (req.getRequestURI().indexOf("goLogin") >= 0) {
        	//logger.info("doFilter方法,请求URI goLogin");
            
            chain.doFilter(request, response);
            return;
        }
        
        if (req.getRequestURI().indexOf("login") >= 0) {
            //logger.info("doFilter方法,请求URI login");
            chain.doFilter(request, response);
            return;
        }
        
        //获取请求中的cookies
        String cookieAccount = null;
        Cookie[] cookies = req.getCookies();
        if(null!=cookies){
            for(Cookie cookie : cookies){
                if("yklis.account".equals(cookie.getName()))
                    cookieAccount = cookie.getValue();
            }
        }
        
        if((null!=cookieAccount)&&(!"".equals(cookieAccount))){
            
            //logger.info("doFilter方法,cookie中存在帐号信息");
            chain.doFilter(request, response);
            return;
            
        }
        
        Cookie cookie3 = new Cookie("yklis.request",req.getRequestURI());
        res.addCookie(cookie3);
        
        //logger.info("doFilter方法,拦截到的请求URI:"+req.getRequestURI());
        res.sendRedirect(req.getContextPath()+"/goLogin");            

    }

    @Override
    public void destroy() {

    }

}
