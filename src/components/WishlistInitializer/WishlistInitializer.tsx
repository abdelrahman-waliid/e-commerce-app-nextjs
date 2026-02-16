'use client'

import { useWishlist } from '@/Context/WishlistContext'
import React, { useEffect } from 'react'

export default function WishlistInitializer({ids} : {ids:string[]}) {

    const {setInitialWishlist} = useWishlist()

    useEffect( () => { setInitialWishlist(ids) } , [ids]  ) // de component did update el function hateshta8al lama ye7sal update fel ids

  return null
}
