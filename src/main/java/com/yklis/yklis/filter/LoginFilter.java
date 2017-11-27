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
import javax.servlet.http.HttpSession;

/**
 * 未登录的情况下，强制进入登录页面
 * @author ying07.liu
 *
 */
public class LoginFilter implements Filter {	

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
          ||(req.getContextPath()+"/login").equals(req.getRequestURI())) {
            chain.doFilter(request, response);
            return;
        }
                   
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        HttpSession session = httpRequest.getSession(false);//参数默认值:true
        if(null!=session){
            chain.doFilter(request, response);
            return;            
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
