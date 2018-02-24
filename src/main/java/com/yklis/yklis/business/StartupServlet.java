package com.yklis.yklis.business;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

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
        
        logger.info("aaaaa:"+config.getServletContext().getInitParameter("webAppRootKey"));
        logger.info("bbbbb:"+System.getProperty("webapp.root"));
        //config.getServletContext().getInitParameter("webAppRootKey");
        //System.getProperty("webapp.root");
        
        int width = 100;
        int height = 100;
        String contents = "abc";
        Map<EncodeHintType, Object> encodeHints = new HashMap<EncodeHintType, Object>();
        encodeHints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        BitMatrix bitMatrix = null;
        try {
            bitMatrix = new MultiFormatWriter().encode(contents, BarcodeFormat.QR_CODE, width, height, encodeHints);
        } catch (WriterException e) {
            logger.error("MultiFormatWriter.encode失败:"+e.toString());
        }
        Path path = FileSystems.getDefault().getPath("");
        try {
            MatrixToImageWriter.writeToPath(bitMatrix, "png", path);
        } catch (IOException e) {
            logger.error("MatrixToImageWriter.writeToPath失败:"+e.toString());
        }
    }
    
    @Override
    public void destroy() {
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
