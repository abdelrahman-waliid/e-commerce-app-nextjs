import { authOptions } from '@/auth'
import AddToCart from '@/components/AddToCart/AddToCart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card' 
import { formatCurrency } from '@/Helpers/formatCurrency'
import { CategoriesResponse } from '@/Interfaces/categoriesInterface'
import { ProductsResponse } from '@/Interfaces/productInterface'
import { StarHalf, StarIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function CategoriesDetails({params} : {params:Params}) {

 const session = await getServerSession(authOptions)
 const {categoryId} = await params
 const categoryResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
 const categoryData:CategoriesResponse = await categoryResponse.json()
 
 const productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
 const productsData:ProductsResponse = await productsResponse.json()
 
  console.log(categoryData);
  
  return  <>

  {productsData.results == 0 ?   <div className='container mx-auto px-4 py-8'>
      
    <div className='text-center py-12'>
      <p className='text-muted-foreground text-lg'>No products found in this category.</p>
    </div>
  </div> :  

  <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {productsData?.data?.map((product)=> <div key={product.id} className='p-2'>
            
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
              <AddToCart productId={product.id} session={session}/>
            </Card> 
        </div>)}
      </div>
   
  }
  
  </>
}
