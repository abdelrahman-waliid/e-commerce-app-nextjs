import { getWishlistItems } from '@/actions/wishlistActions'
import { authOptions } from '@/auth'
import Wishlist from '@/components/Wishlist/Wishlist' 
import { getServerSession } from 'next-auth' 

export default async function WishlistPage() {

    const session = await getServerSession(authOptions)
    const response = await  getWishlistItems()

  return  <>
        <Wishlist WishlistData={response.count==0 ? null : response} session={session} />   
        {/* law feeh data fel wishlist ab3athalo law mafesh ab3at null */}
  
  </>
}
