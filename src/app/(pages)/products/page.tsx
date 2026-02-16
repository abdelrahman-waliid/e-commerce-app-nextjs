import { ProductsResponse } from '@/Interfaces/productInterface'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { HeartIcon, ShoppingCartIcon, StarHalf, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AddToCart from '@/components/AddToCart/AddToCart'
import { formatCurrency } from '@/Helpers/formatCurrency'
import { WishListRes } from '@/Interfaces/wishlistInterfaces'
import { getWishlistItems } from '@/actions/wishlistActions'
import WishlistInitializer from '@/components/WishlistInitializer/WishlistInitializer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export default async function Products() {
  const session = await getServerSession(authOptions)
  const response = await fetch(`${process.env.API_URL}/products`)
  const {data} : ProductsResponse = await response.json() 
  const wishlistData : WishListRes = await getWishlistItems()

  const ids = wishlistData?.data?.map(item => item.id) // de el ids bta3t kol el products elly fe el wishlist 
  
  return <>
    {/* <h2 className='text-center text-2xl font-semibold'>Products</h2> */}
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {data?.map((product)=> <div key={product.id} className='p-2 col-span-1 md:col-span-1 lg:col-span-1'>
          
          <Card className='overflow-hidden pt-0'>
            <Link href={'/products/' + product.id }>
                  <div className='-mt-6 -mx-6 -m-1'>
                    <Image src={product.imageCover} alt={product.title} width={200} height={150}
                      className=" w-full object-cover" /> 
                  </div>  
                  <CardHeader>
                    <CardDescription className='mt-1'> {product.brand.name} </CardDescription>
                    <CardTitle className='line-clamp-1'> {product.title} </CardTitle>
                    <CardDescription> {product.category.name}   </CardDescription> 
                  </CardHeader>
                  <CardContent>
                    <div  className='flex justify-between gap-2'>
                      <div className='flex'>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarHalf className='text-amber-500 fill-amber-500'/>
                      </div>
                      <p> {product.ratingsAverage} </p>
                    </div> 
                    <p className='pt-5 text-center font-extrabold'> {formatCurrency(product.price)}  </p> 
                  </CardContent>
            </Link>
            {product && <AddToCart productId={product.id} session={session} />}
          </Card> 
      </div>)}
    </div>
    {/* edetha leha 3alsahan lama ye7sal update fehom ye7sal set lehom bel version el gdeda */}
    <WishlistInitializer ids={ids}/> 
  </>
}
