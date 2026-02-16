'use client'

import { addToWishlistAction } from '@/actions/addtowishlist.action'
import { useRouter } from 'next/navigation' 
import { Heart } from 'lucide-react'
import { AddToWishlistRes } from '@/Interfaces/addToWishlistInterface'
import toast from 'react-hot-toast' 
import { useWishlist } from '@/Context/WishlistContext'
import { deleteWishlistProductAction, getWishlistItems } from '@/actions/wishlistActions'
import { WishListRes } from '@/Interfaces/wishlistInterfaces'

export default function AddToWishlist({productId}:{productId:string}) {

     const { wishlistIds,  addToWishlist,  removeFromWishlist, } = useWishlist() 
     const isFav = wishlistIds?.includes(productId)  
     
     const router = useRouter()
     
    let updatedData : WishListRes | null = null 


    const toggle = async () => {
    if (isFav) {
          
                const response:AddToWishlistRes = await deleteWishlistProductAction(productId)
                if(response.status == 'success'){  
                    toast.success("Removed from Wishlist")
                    updatedData  = await getWishlistItems()
                    dispatchEvent(new CustomEvent('wishlistUpdate' , {detail:updatedData.count}))
                }
                 
            
        removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
      addToWishlist2(productId)
    }
  }

    async function addToWishlist2(productId:string) { 
        try{
            const data:AddToWishlistRes = await addToWishlistAction(productId)
            updatedData  = await getWishlistItems() 
            if(data== null){
                router.push('/login')
            }else{
                toast.success(data.message + '')
                dispatchEvent(new CustomEvent('wishlistUpdate' , {detail:updatedData.count}))
            }
        }catch(err){
            toast.error('' + err)
        }
    }

  return  <>

        <button onClick={toggle} className='cursor-pointer'>   
                 <Heart  className={isFav ?  "text-red-600 fill-red-600" : "text-gray-400 fill-gray-400"}  />   </button>
  
  </>
}
