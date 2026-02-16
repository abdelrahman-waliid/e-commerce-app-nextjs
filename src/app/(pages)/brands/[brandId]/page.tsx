import { Params } from 'next/dist/server/request/params'; 
import {ProductsResponse } from '@/Interfaces/productInterface'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; 
import Link from 'next/link';
import Image from 'next/image';
import { StarHalf, StarIcon } from 'lucide-react';
import AddToCart from '@/components/AddToCart/AddToCart';
import { formatCurrency } from '@/Helpers/formatCurrency';
import { BrandsResponse } from '@/Interfaces/brandInterfaces';
import WishlistInitializer from '@/components/WishlistInitializer/WishlistInitializer';
import { WishListRes } from '@/Interfaces/wishlistInterfaces';
import { getWishlistItems } from '@/actions/wishlistActions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function BrandDetails({params} : {params:Params}) {
    const {brandId} = await params 
    const session = await getServerSession(authOptions)
    const productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
    const productsData:ProductsResponse = await productsResponse.json()  

    const brandResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
    const brandData:BrandsResponse = await brandResponse.json()
    
    const wishlistData : WishListRes = await getWishlistItems()

  const ids = wishlistData?.data?.map(item => item.id) // de el ids bta3t kol el products elly fe el wishlist

  return <>

  {productsData.results == 0 ?   <div className='container mx-auto px-4 py-8'>
     {brandData.data.map((brand)=> <div className="mb-8">
      <h1 className='text-3xl font-bold mb-2'> {brand.name} </h1>
      <p className='text-muted-foreground'>Products in this category</p>
    </div> )}
    <div className='text-center py-12'>
      <p className='text-muted-foreground text-lg'>No products found in this category.</p>
    </div>
  </div>   
  
  : 
     
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
  {/* edetha leha 3alsahan lama ye7sal update fehom ye7sal set lehom bel version el gdeda */}
    <WishlistInitializer ids={ids}/>
  </> 
}
 