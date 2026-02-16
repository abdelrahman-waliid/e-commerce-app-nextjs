"use client"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export default function Slider( {images , title} : {images:string[] , title:string} ) {
  return  <>
        <Carousel opts={{loop:true}} plugins={[ Autoplay({  delay: 2000, }), ]}>
                <CarouselContent>
                     {images.map((image , index) => <CarouselItem key={index}> 
                        <Image src={image} alt={title} width={1000} height={700} className='w-full'/>
                    </CarouselItem>
                 )} 
                </CarouselContent> 
            </Carousel>
  
  </>
}
