import React from 'react'

export default function Loading() {
  return <>
    <div className='min-h-[80vh] flex items-center justify-center bg-white'>
        <div className='text-center'>
            {/* TechMart logo */}
            <div className='flex items-center justify-center mb-8'>
                <div className='w-12 h-12 bg-black flex items-center justify-center mr-3'>
                    <span className='text-white font-bold text-2xl'>S</span>
                </div>
                <span className='text-3xl font-bold text-black'> ShopMart </span>
            </div>
            {/* Spinner */}
            <div className='relative flex justify-center items-center'>
                <div className='w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin'></div>
                <div className='absolute w-12 h-12 border-4 border-gray-100 border-b-gray-400 rounded-full animate-spin'></div>
            </div>
        </div>
    </div>

  </>
}
