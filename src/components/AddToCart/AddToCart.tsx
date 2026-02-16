'use client'
import { useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Loader2, ShoppingCartIcon } from 'lucide-react'
import { CartRes } from '@/Interfaces/cartInterfaces';
import toast from 'react-hot-toast'
import { addToCartAction } from '@/actions/addtocart.action'
import { usePathname, useRouter } from 'next/navigation'
import AddToWishlist from '../AddToWishlist/AddToWishlist'

export default function AddToCart({productId , session} : {productId? : string , session : any}   ) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const pathName = usePathname()

    async function addToCart(productId? : string) {

      if(!productId) return
      setIsLoading(true)  
      try{
          
           const data : CartRes = await addToCartAction(productId) 
        if(data == null){
            router.push('/login')
        }else{
          toast.success(data.message + '')
          dispatchEvent(new CustomEvent('cartUpdate' , {detail : data.numOfCartItems}))
        }
    }catch(err){ 
        toast.error('' + err)
    } 
    setIsLoading(false)  
        
    }


  return  <>
        <CardFooter className='gap-3'>
              <Button onClick={()=> addToCart(productId)} disabled={isLoading} className='grow gap-2'>   
                {isLoading ? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/>}      Add To Cart </Button>
              {pathName !== '/wishlist' && session && productId && (
  <AddToWishlist productId={productId} />
)} 
            </CardFooter>
  
  </>
}
