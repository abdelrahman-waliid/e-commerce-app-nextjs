'use client' 
import { ShoppingCart, ShoppingCartIcon } from 'lucide-react' 
import { useEffect, useState } from 'react'

export default function CartIcon({serverCartNum , userId} : {serverCartNum : number , userId : string} ) {

    
    const [cartNum, setCartNum] = useState(serverCartNum)
    
    useEffect( ()=> {
        
        if(userId){
    
            localStorage.setItem('userId' , userId)
        }

        function handler(e : CustomEvent){
            setCartNum(e.detail)
        }

        addEventListener('cartUpdate' , handler as EventListener  )
    } , [] )

  return  <>
  
      
        <ShoppingCart className='size-6 text-inherit cursor-pointer'/>
        <span className='absolute top-0.5 start-3/6 text-xs size-4 bg-accent-foreground text-accent flex justify-center items-center rounded-full'>  
            {cartNum}
        </span>
     
    
  
  </>
}
