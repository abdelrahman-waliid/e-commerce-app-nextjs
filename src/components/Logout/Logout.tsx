'use client'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout() {


   const UserId = localStorage.getItem('userId')

  return  <>
        <DropdownMenuItem onClick={()=> { signOut({  callbackUrl: '/'  }) 
                                UserId && localStorage.removeItem('userId')
                                }}>Logout</DropdownMenuItem>
  
  </>
}
