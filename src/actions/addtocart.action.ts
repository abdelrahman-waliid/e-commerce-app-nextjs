"use server"

import { authOptions } from "@/auth";
import { ShippingAddress } from "@/Interfaces/cartInterfaces";
import { getServerSession } from "next-auth";

export async function checkOutCashAction(cartId : string , shippingAddress : ShippingAddress) {

    const session = await getServerSession(authOptions)
    if(session){

        const response = await fetch( 'https://ecommerce.routemisr.com/api/v1/orders/'+ cartId, {
            headers:{
                token:session?.token as string  , // as string 3alashan asaket el typescript la2en mayenfa3sh ykon token be undefined hia hia law 3mlt + '' 
                'content-type' : "application/json"
            }, 
            method : 'POST' ,
            body : JSON.stringify({shippingAddress})
        });
        const data  = await response.json()
        
        return data ;   
    }else{
        return null ;
    }
}
export async function checkOutCardAction(cartId : string , shippingAddress : ShippingAddress) {

    const session = await getServerSession(authOptions)
    if(session){

        const response = await fetch( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            headers:{
                token:session?.token as string  , // as string 3alashan asaket el typescript la2en mayenfa3sh ykon token be undefined hia hia law 3mlt + '' 
                'content-type' : "application/json"
            }, 
            method : 'POST' ,
            body : JSON.stringify({shippingAddress})
        });
        const data  = await response.json()
        
        return data ;   
    }else{
        return null ;
    }
}
export async function addToCartAction(productId : string) {

    const session = await getServerSession(authOptions)
    if(session){

        const response = await fetch(`${process.env.API_URL}/cart` , {
            headers:{
                token:session?.token as string  , // as string 3alashan asaket el typescript la2en mayenfa3sh ykon token be undefined hia hia law 3mlt + '' 
                'content-type' : "application/json"
            }, 
            method : 'POST' ,
            body : JSON.stringify({productId})
        });
        const data  = await response.json()
        
        return data ;   
    }else{
        return null ;
    }
}