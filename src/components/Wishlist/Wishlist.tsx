'use client'
import { formatCurrency } from '@/Helpers/formatCurrency'
import { WishListRes } from '@/Interfaces/wishlistInterfaces'
import { Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import  { useState } from 'react'
import { Button } from '../ui/button'
import AddToCart from '../AddToCart/AddToCart'
import { deleteWishlistProductAction, getWishlistItems } from '@/actions/wishlistActions'
import { AddToWishlistRes } from '@/Interfaces/addToWishlistInterface'
import toast from 'react-hot-toast'

export default function Wishlist({WishlistData , session}:{WishlistData:WishListRes|null , session : any}) {

     
    const [wishlist, setWishlist] = useState<WishListRes| null>(WishlistData || null)
    const [isLoading, setIsLoading] = useState<string | null>(null)

    async function deleteWishlistProduct(productId:string) {
        setIsLoading(productId)
        const response:AddToWishlistRes = await deleteWishlistProductAction(productId)
        if(response.status == 'success'){
            const updatedData:WishListRes = await getWishlistItems()
            setWishlist(updatedData)
            toast.success("Item Deleted Successfully")
            dispatchEvent(new CustomEvent('wishlistUpdate' , {detail:updatedData.count}))
        }
        
        setIsLoading(null)
    }


  return <>
        {wishlist ? <div className='container mx-auto px-4 py-6'>
                <h1 className='text-3xl font-bold tracking-tight'>Your Shopping Wishlist</h1>
                <p className='text-muted-foreground mt-1'>
                    {wishlist.count} Favourite items 
                </p>
        
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:items-start gap-6 mt-6'>
                    {/* Items Columns */}
                    <div className='lg:col-span-3 space-y-4'>
                        
                        {wishlist.data.map((product)=>
                            <div key={product._id} className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card relative'>
                            
                            {isLoading == product._id &&  <div className='absolute inset-0 bg-white/80 flex justify-center items-center'>
                                <Loader2 className='animate-spin'/>
                            </div>}
                            
                            
                            <img src={product.imageCover} alt={product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />
                            <div className='flex-1'>
                                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 '>
                                    <div className='min-w-0'>
                                        <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                                             {product.title}
                                        </h3>
                                        <p className='text-sm text-muted-foreground mt-1 '>
                                            {product.brand.name}    {product.category.name}
                                        </p>
                                    </div>
                                    <div className='text-right shrink-0'>
                                        <div className='font-semibold'>
                                            {formatCurrency(product.price)}
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-3 flex items-center justify-between flex-nowrap gap-5'>
                                     <AddToCart productId={product.id} session={session && session}/>
                                    <button aria-label='remove' className='text-destructive hover:underline text-sm cursor-pointer flex gap-1 items-center' onClick={()=>deleteWishlistProduct(product.id)}> 
                                         <Trash2 className='hover:animate-pulse'/>  </button> 
                                </div>
                            </div>
                        </div> 
                    )}
                        </div>
                    </div>
                </div>
                         
                    :
                    <div className='min-h-[60vh] flex justify-center items-center flex-col'>
                        <h2 className='text-2xl mb-3 '> There are no Favourite Items in your Wishlist</h2>
                        <Link href={'/products'}>
                            <Button> Browse Some Products</Button> 
                        </Link>
                    </div> 
     }
  
  </>
}
