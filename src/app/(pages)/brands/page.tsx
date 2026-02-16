import { BrandsResponse } from '@/Interfaces/brandInterfaces'; 
import Image from 'next/image';
import React from 'react' 
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function Brands() {

  const response = await fetch(`${process.env.API_URL}/brands`)
  const {data} : BrandsResponse  = await response.json() 
  

  return <>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {data.map((brand)=> <div key={brand._id} className='p-2 col-span-1 md:col-span-1 lg:col-span-1'>
              
              <Card className='overflow-hidden pt-0'>
                <Link href={'/brands/' + brand._id}>
                      <div className='-mt-6 -mx-6 -m-1'>
                        <Image src={brand.image} alt={brand.name} width={200} height={200}
                          className=" w-full object-cover" /> 
                      </div> 
                      <CardContent>   
                        <p className='pt-5 text-center font-extrabold'>  {brand.slug}  </p> 
                      </CardContent>
                </Link> 
              </Card> 
          </div>)}
        </div>
  </>
}
