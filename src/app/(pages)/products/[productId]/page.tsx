import { authOptions } from '@/auth'
import AddToCart from '@/components/AddToCart/AddToCart'
import Slider from '@/components/Slider/Slider'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/Helpers/formatCurrency'
import { Product } from '@/Interfaces/productInterface'
import { HeartIcon, ShoppingCartIcon, StarHalf, StarIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image'
import React from 'react'
 

export default async function ProductDetails({params} : {params:Params}) {
    const {productId} = await params 
    const response = await fetch(`${process.env.API_URL}/products/` + productId) 
    const {data : product} :  {data : Product} = await response.json() // el data elly mobashra b3d el destruct sametha product s msh akter w el data kolha object gowaha haga esmha data mn noo3 product (3alashan afham bos fe el interface elly ma3mol) 
    const session = await getServerSession(authOptions)
    
  return  <> 
    <Card className='grid grid-cols-1 md:grid-cols-3 items-center'>
        <div className='col-span-1'>
             <Slider images={product.images} title={product.title}/>
        </div>
        <div className='col-span-2 p-4 space-y-7'> 

                <CardHeader>
                    <CardDescription className='mt-1'> {product.brand.name} </CardDescription>
                    <CardTitle> {product.title} </CardTitle> 
                    <CardAction> {product.category.name}   </CardAction> 
                    <CardDescription> {product.description}   </CardDescription> 
                </CardHeader>
                <CardContent>
                    <div  className='flex gap-2'>
                        <div className='flex'>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarIcon className='text-amber-500 fill-amber-500'/>
                        <StarHalf className='text-amber-500 fill-amber-500'/>
                        </div>
                        <p> {product.ratingsAverage} </p>
                    </div> 
                    <p className='pt-5 font-extrabold'> {formatCurrency(product.price)}  </p> 
                </CardContent>
                <AddToCart productId={product.id} session={session}/>

        </div>

    </Card>
  </>
}
