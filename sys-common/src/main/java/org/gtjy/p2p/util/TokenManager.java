package org.gtjy.p2p.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 生成口令牌
 * @author wys
 *
 */
public class TokenManager {
	
	private long previous;  
	
	private static final TokenManager instance = new TokenManager();
	
	protected TokenManager(){}
	
	public static TokenManager getInstance() {
		return instance;
	}
	/**
	 * 生成口令牌
	 * @param msg
	 * @param timeChange 是否使用时间戳
	 * @return
	 */
	public synchronized String generateToken(String msg, boolean timeChange) {  
        try {  
  
            long current = System.currentTimeMillis();  
            if (current == previous)                current++;   
            previous = current;   
            MessageDigest md = MessageDigest.getInstance("MD5");  
            md.update(msg.getBytes());  
            if (timeChange) {  
                // byte now[] = (current+"").toString().getBytes();  
                byte now[] = (new Long(current)).toString().getBytes();  
                md.update(now);  
            }  
            return toHex(md.digest());  
        } catch (NoSuchAlgorithmException e) {  
            return null;  
        }  
    }  
	
	/**
	 * 混淆加密
	 * @param buffer
	 * @return
	 */
    private String toHex(byte buffer[]) {  
        StringBuffer sb = new StringBuffer(buffer.length * 2);  
        for (int i = 0; i < buffer.length; i++) {  
            sb.append(Character.forDigit((buffer[i] & 240) >> 4, 16));  
            sb.append(Character.forDigit(buffer[i] & 15, 16));  
        }  
  
        return sb.toString();  
    }  
}
