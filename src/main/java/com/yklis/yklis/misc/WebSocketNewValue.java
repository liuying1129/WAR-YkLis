package com.yklis.yklis.misc;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

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
   * 每次请求都会产生新的实例（WebSocketNewValue）
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
    
    private String userId;
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    
    private static ConcurrentHashMap<String, WebSocketNewValue> wsMap = new ConcurrentHashMap<>();
      
    /**
              * 有连接时的触发函数
     * @param session.可选参数，session为与某个客户端的连接会话，需要通过它来给客户端发送数据
              * 使用@PathParam注解进行参数获取
     */
	@OnOpen
	public void onOpen(@PathParam("userId") String userId,Session session){

		this.session = session;
		this.userId = userId;
	    
	    wsMap.put(userId,this);
	    
		for (String key : wsMap.keySet()) {
			
			if (!userId.equals(key)) continue;
			
			try {
				wsMap.get(key).session.getBasicRemote().sendText("hello " + userId);
			} catch (IOException e) {
				logger.error("WebSocket sendText错误");
			}
		}
    	/*try {
			session.getBasicRemote().sendText("张三");
		} catch (IOException e) {
			
			logger.error("WebSocket sendText错误");
		}*/
	}
	
    //连接关闭时的调用方法
    @OnClose
    public void onClose(){
    	
        logger.info("连接：{} 关闭"+this.userId);
        wsMap.remove(userId);
    }	
    
    /**
              * 收到消息时执行
     * @param message.客户端发送过来的消息
     * @param session.可选参数
     * @throws IOException
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {    	
    }
    
    /**
              * 连接错误时执行
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error){
    	
        logger.error("session id["+session.getId()+"]连接错误");
        error.printStackTrace();
    }    
}
