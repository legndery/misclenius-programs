/* package codechef; // don't place package name! */

import java.util.*;
import java.lang.*;
import java.io.*;

/* Name of the class has to be "Main" only if the class is public. */
class Codechef
{
	public static void main (String[] args) throws java.lang.Exception
	{
	//	System.out.println(
		    roman(2014);
	}
	public static void roman (int n){
	   // List<String> list = new ArrayList<String>();
	    if(n>999)
	    {
	        for(int i = 0; i<n/1000; i++)
	            System.out.print("M");
	        n=n%1000;
	    }
	    if(n%500==0 && n>499){
	        System.out.print("D");
	        n=n-500;
	    } 
	    if(n>99)
	    {
	        for(int i = 0; i<n/100; i++)
	            System.out.print("C");
	        n=n%100;
	    }
	    if(n%50==0 && n>49){
	        System.out.print("L");
	        n=n-50;
	    }
	    if(n>=9)
	    {
	        if(n == 9){
	        System.out.print("IX");
	        n=n-9;}
	        else{
	        for(int i = n/10; i>0; i--)
	            System.out.print("X");
	        n=n%10;
	        }
	    }
	    if(n/5!=0){
	        System.out.print("V");
	        n=n-5;
	    }
	    for(int i=n; i>0; i--){
	        System.out.print("I");
	        if(i==4){
	            System.out.print("V");
	            break;
	        }
	    }
	   // return list;
	}
}
