package org.gtjy.p2p.filters.gzip;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * 
 * @author wys
 *
 */
public class GzipHttpServletResponse extends HttpServletResponseWrapper {
	private ByteArrayOutputStream baos = new ByteArrayOutputStream() ;
    
    private PrintWriter pw ;
     
    public GzipHttpServletResponse(HttpServletResponse response) {
        super(response);        
    }
 
    @Override
    public ServletOutputStream getOutputStream() throws IOException {
         
        return new MyServletOutStream(baos) ;
    }   
     
    @Override
    public PrintWriter getWriter() throws IOException {
        pw = new PrintWriter(new OutputStreamWriter(baos, super.getCharacterEncoding())) ;
        return pw ;
    }
 
    public byte[] getOldBytes(){        
        if(pw != null){
            pw.close() ;
        }
        try {
            baos.flush() ;
        } catch (IOException e) {
             
            e.printStackTrace();
        }
        return baos.toByteArray() ;
    }

}
