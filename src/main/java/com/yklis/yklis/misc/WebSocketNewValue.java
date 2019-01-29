package com.yklis.yklis.misc;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
//ServerEndpoint报错：原因是不能自动检测ServerEndpoint的包。解决方法：手动复制 import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;

/**
 * WebSocket
 * 新结果提示功能
 * @author liuyi
 *
 */
@ServerEndpoint("/websocket/{userId}")
public class WebSocketNewValue {
	
    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    private final Logger logger = Logger.getLogger(this.getClass());
    
    private static String userId;
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    
    private Map<String, Object> wsMap = new HashMap<>();
      
    //有连接时的触发函数
	@OnOpen
	public void onOpen(@PathParam("userId") String userId,Session session){

		this.session = session;
	    logger.info("新连接："+userId);
	    
	    wsMap.put(session.getQueryString(),this);
	    //sendMessage("张三");
	    	    	    
    	try {
			session.getBasicRemote().sendText("张三");
		} catch (IOException e) {
			
			logger.error("WebSocket sendText错误");
		}	    
	}
	
    //连接关闭时的调用方法
    @OnClose
    public void onClose(){
        logger.info("连接：{} 关闭"+this.userId);
    }	
    
    //收到消息时执行
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {    	
    }
    
    //连接错误时执行
    @OnError
    public void onError(Session session, Throwable error){
        logger.info("用户id为："+"this.userId"+"的连接发送错误");
        error.printStackTrace();
    }
    
    //没有用注解，根据需要添加的方法
    public void sendMessage(String message){
    	
    	try {
			this.session.getBasicRemote().sendText(message);
		} catch (IOException e) {
			
			logger.error("WebSocket sendText错误");
		}
    }
}
