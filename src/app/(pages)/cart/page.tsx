import { authOptions } from '@/auth'
import Cart from '@/components/Cart/Cart'
import { CartRes } from '@/Interfaces/cartInterfaces'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function CartPage() {

    const session = await getServerSession(authOptions)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
        headers : {
            token : session?.token as string
        }
         
    })
    const data:CartRes = await response.json() 
    

  return  <>
      <Cart cartData={data.numOfCartItems == 0 ? null : data}/>   
      {/* da 3alashan lama agy a3red hnak y3dy mn el condition be salam l2n fe 7alet el error msh bytb3et null byetb3et object fa ana fahemto mn el awel */}
  </>
}
