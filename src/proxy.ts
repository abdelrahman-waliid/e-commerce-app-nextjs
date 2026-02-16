import { getToken } from "next-auth/jwt" 
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ['/cart' , '/wishlist']
const authRoutes = ['/login' , '/register' , '/forgot-password']

export default async function proxy(req: NextRequest){
    
    const token = await getToken({req}) // hna gebt el token mn el request bel function de 

//part1 => 3ayez yroo7 makan maynfa3sh yro7o mn 8eer login    
    if(protectedRoutes.includes(req.nextUrl.pathname)){ 
        if(token){
            return NextResponse.next()
        }else{
                const redirectUrl = new URL('/login' , process.env.BASE_URL) // da el url elly haywadeeh leeh law msh m3ah token ya3ny msh 3amel login fa haywadeeh 3ala login
                redirectUrl.searchParams.set('url' , req.nextUrl.pathname) // da lama ywadeeh lel login yb3at m3ah searchParams fel path 3alashan lama y3mel login ywadeeh 3ala el makan elly kan 3awez yro7o
          
            
           return NextResponse.redirect(redirectUrl) // haywadeeh lel login 
        }
    }
    if(authRoutes.includes(req.nextUrl.pathname)){ 
        if(token){
                const redirectUrl = new URL('/' , process.env.BASE_URL) // da el url elly haywadeeh leeh law msh m3ah token ya3ny msh 3amel login fa haywadeeh 3ala login 
          
          
            return NextResponse.redirect(redirectUrl) // haywadeeh lel login 
        }else{
            return NextResponse.next()
        }
    }

    return NextResponse.next()
}