package sapp_generator;

import java.util.concurrent.CountDownLatch;

/**
 * 
 * 
 * ThreadJunit 最大线程<br />
 * 
 * 2015年6月24日 下午6:55:25
 * @author：wys
 * @version 1.0.0
 *
 */
public class ThreadJunit {
    public static void main(String[] args) {
        for(int i=0;;i++) {
            System.out.println("i = " + i);  
            new Thread(new HoldThread()).start();  
        }
    }
}

class HoldThread extends Thread {  
    CountDownLatch cdl = new CountDownLatch(1);  
    public HoldThread() {  
        this.setDaemon(true);  
    }  
  
    public void run() {  
        try {  
            cdl.await();  
        } catch (InterruptedException e) {  
        }  
    }  
}  