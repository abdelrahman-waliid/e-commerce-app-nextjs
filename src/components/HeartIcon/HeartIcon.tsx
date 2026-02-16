"use client"
import { getWishlistItems } from '@/actions/wishlistActions'
import { WishListRes } from '@/Interfaces/wishlistInterfaces'
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default   function HeartIcon( {serverWishlistNum} : {serverWishlistNum : number} ) {

        const [wishlistNum, setWishlistNum] = useState(serverWishlistNum)

    useEffect( ()=>{

        function handler(e:CustomEvent){
            setWishlistNum(e.detail)
        }

        addEventListener('wishlistUpdate' , handler as EventListener)
    } , [] )


  return  <>
  
    <Heart className='size-6 text-inherit cursor-pointer'/> 
    <span className='absolute top-0.5 start-3/6 text-xs size-4 bg-accent-foreground text-accent flex justify-center items-center rounded-full'>  
        {wishlistNum}
    </span>

  </>
}
