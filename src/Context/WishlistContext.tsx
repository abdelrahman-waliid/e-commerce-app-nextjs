'use client'

import { WishlistContextType } from "@/Interfaces/wishListContextInterface"
import { createContext, useContext, useState } from "react"

const WishlistContext =  createContext<WishlistContextType | null>(null) // da ma5zan ana 3mlto w delwa2ty fadyy

export function WishlistProvider( {children} : {children : React.ReactNode} ){   // da component gayelo el app bta3y kolo as children

    const [wishlistIds, setWishlistIds] = useState<string[]>([]) // de set state feha kol ids bta3t el products elly mawgoda fel wishlist

    const addToWishlist = (id:string) => {
        setWishlistIds(prev => prev.includes(id) ? prev : [...prev , id])   // prev => de ya3ny a7das nos5a mn el useState de fe wa2t el run 
        // [ ...prev , id ] ya3ny yraga3 elly mawgood 7alian fel state  w fel a5er y7ot el id el gded elly etdaf 3alehom
    }

    const removeFromWishlist = (id:string) => {
        setWishlistIds(prev => prev.filter(item => item!== id))
        // filter de bt3ady 3ala kol el items w traga3 kol el items elly msh btsawy el id da
    }

    const setInitialWishlist = (ids:string[]) => {
        setWishlistIds(ids)
    }

    return (
        <WishlistContext.Provider value={{wishlistIds , addToWishlist , removeFromWishlist , setInitialWishlist}}>
                {children}   
        </WishlistContext.Provider>
        // kda ana madet el app bta3y bel values de ya3ny ay component y2dar yesta5demhom 3adi w ay ta8yeer fel state hatsama3 3nd kolo
    )
}

// da custom hook 3alashan bdal ma akteb fe kol mara basta5dem feeh el context da kol da ba call bs el useWishlist w 5alas 
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider")  // 3lashan adman en law rag3a be null maydrabsh yetala3 el error da 
  }
  return context
}