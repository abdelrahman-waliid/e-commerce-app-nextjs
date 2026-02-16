import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return  <>
  
    <section className='bg-white py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            {/* Main Heading */}
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6'>
                Welcome To ShopMart 
            </h1>
            {/* Slogan */}
            <p className='text-Lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto'>
                Discover the latest technology , fashion and lifetyle products.
                Quality guaranteed with fast shipping and excellent customer service.
            </p>
            {/* call to action buttons */}
            <div className=' flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <Link
                    href={"/products"}
                    className='bg-black text-white border-2 border-black px-8 py-3 rounded-md font-medium hover:bg-white hover:text-black transition-all duration-200 min-w-35'
                >
                    Shop Now 
                </Link>    
                <Link
                    href={"/categories"}
                    className='bg-white text-black border-2 border-black px-8 py-3 rounded-md font-medium hover:bg-black hover:text-white transition-all duration-200 min-w-35'
                >
                    Browse Categories  
                </Link>    
            </div>
        </div>
    </section>
  
  </>
}
