package org.gtjy.p2p.filters.gzip;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletOutputStream;

/**
 * 
 * @author wys
 *
 */
public class MyServletOutStream extends ServletOutputStream{
	private ByteArrayOutputStream baos ;
    
    public MyServletOutStream(ByteArrayOutputStream baos){
        this.baos = baos ;
    }
    @Override
    public void write(int b) throws IOException {
         
        baos.write(b) ;
    }
}
