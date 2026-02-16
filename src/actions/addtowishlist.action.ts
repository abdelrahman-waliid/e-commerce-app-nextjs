'use server'

import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export async function addToWishlistAction(productId:string) {
    const session = await getServerSession(authOptions)
    if(session){

        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers:{
                token: session?.token as string ,
                'content-type' : 'application/json'
            },
            body:JSON.stringify({productId}),
            method: 'POST'
        })
        const data = await response.json()
        
        return data ;
    }else{
        return null ;
    }
}