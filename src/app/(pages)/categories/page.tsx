import { CategoriesResponse } from '@/Interfaces/categoriesInterface';  
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';

export default async function Categories() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const {data}:CategoriesResponse = await response.json() 
  
  return <> 

       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {data.map((category)=> <div key={category._id} className='p-2 h-full col-span-1 md:col-span-1 lg:col-span-1'>
              
              <Card className='overflow-hidden h-full flex flex-col'>
                <Link href={'/categories/' + category._id } className='h-full flex flex-col'>
                      <div className='h-48 w-full overflow-hidden'>
                        <Image src={category.image} alt={category.name} width={200} height={200}
                          className=" w-full h-full object-cover" /> 
                      </div> 
                      <CardContent className='flex-1 flex justify-center items-center'>   
                        <p className='pt-5 text-center font-extrabold'>  {category.slug}  </p> 
                      </CardContent>
                </Link> 
              </Card> 
          </div>)}
        </div>

  </>
}
