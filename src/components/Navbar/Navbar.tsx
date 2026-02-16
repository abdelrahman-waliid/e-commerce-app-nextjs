import Link from 'next/link'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Heart, Menu, ShoppingCart, User2Icon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import Logout from '../Logout/Logout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth' 
import CartIcon from '../CartIcon/CartIcon'
import { CartRes } from '@/Interfaces/cartInterfaces'
import HeartIcon from '../HeartIcon/HeartIcon'
import { WishListRes } from '@/Interfaces/wishlistInterfaces'
import { getWishlistItems } from '@/actions/wishlistActions'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'

export default async function Navbar() {

    const session = await getServerSession(authOptions) // da feeh el session elly hia {user , token} law 3amel login w b null law msh 3amel login 
    let data :CartRes | null = null
    let updatedData : WishListRes | null = null
    if(session){
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
                headers : {
                    token : session?.token as string
                }
                 
            })
              data = await response.json() 
            
        updatedData = await getWishlistItems()
    }
    

    return <> 
        <nav className='bg-gray-200 py-3 fixed left-0 right-0 z-40 h-16'>
          <div className='container mx-auto font-semibold flex flex-row justify-between items-start md:items-center px-6 md:ps-0 '>
            <h2 className='text-2xl flex'>
                <div className='w-12 h-12 bg-black flex justify-center items-center me-3 rounded-xl '>
                    <span className='text-white font-bold text-4xl'>S</span>
                </div>
                <Link href={'/'} className='font-bold align-middle text-3xl'> $hopMart </Link>   
            </h2>


            <div className='flex items-center gap-4'>



                {/* Desktop  */}
                <div className='hidden md:flex'>
                <NavigationMenu>
                    <NavigationMenuList>
 
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/products">Products</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className=''>
                                <Link href="/brands">Brands</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className=''>
                                <Link href="/categories">Categories</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>   
                </div>

            {/* Mobile  */}
                <div className='flex md:hidden'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='rounded bg-transparent  hover:text-accent hover:bg-accent-foreground text-accent-foreground' > <Menu className='size-7' strokeWidth={3}/> </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup> 
                            <NavigationMenu>
                                    <NavigationMenuList className='flex flex-col gap-y-4'>
                
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild>
                                                <Link href="/products">Products</Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild className=''>
                                                <Link href="/brands">Brands</Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild className=''>
                                                <Link href="/categories">Categories</Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>

                                    </NavigationMenuList>
                                </NavigationMenu>
                            </DropdownMenuGroup> 
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>



            </div>


            <div>
                <NavigationMenu>
                    <NavigationMenuList>
 
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                {session &&   <Link href="/cart" className='relative'>  
                                                     {data && <CartIcon serverCartNum={data?.numOfCartItems } userId={data.data?.cartOwner} />}
                                               </Link> 
                                }
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                {session && 
                                    <Link href="/wishlist" className="relative">
                                           {updatedData && <HeartIcon serverWishlistNum={updatedData.count} />}
                                         </Link> 
                                }
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                  <Link href={'/'}> <User2Icon className='size-6 text-inherit'/> </Link>  
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>   
                                {session ? <> 
                                    <Link href={'/allorders'}>
                                        <DropdownMenuItem>MyOrders</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>
                                        <Logout/>
                                    </DropdownMenuItem>
                                </> : <>
                                    <Link href={'/login'}>
                                        <DropdownMenuItem>Login</DropdownMenuItem>
                                    </Link> 
                                    <Link href={'/register'}>
                                        <DropdownMenuItem>Register</DropdownMenuItem>
                                    </Link>
                                    
                                </> } 
                                </DropdownMenuGroup> 
                            </DropdownMenuContent>
                        </DropdownMenu>
                         
                    </NavigationMenuList>
                </NavigationMenu>   
            </div>

            </div>  

        </nav>
    </>
}
