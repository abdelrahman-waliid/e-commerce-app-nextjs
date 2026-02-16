'use server'

import { authOptions } from "@/auth"
import { AddToWishlistRes } from "@/Interfaces/addToWishlistInterface"
import { WishListRes } from "@/Interfaces/wishlistInterfaces"
import { getServerSession } from "next-auth"


export async function getWishlistItems() {
    const session = await getServerSession(authOptions)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/' , {
        headers:{
            token: session?.token as string
        } 
    })
    const data:WishListRes = await response.json()
    return data;

}
export async function deleteWishlistProductAction(productId : string) {
    const session = await getServerSession(authOptions)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/' + productId , {
        headers:{
            token: session?.token as string
        },
        method: 'DELETE'
    })
    const data:AddToWishlistRes = await response.json()
    return data;

}