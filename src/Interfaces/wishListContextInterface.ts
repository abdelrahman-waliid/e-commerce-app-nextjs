 

export interface WishlistContextType {
  wishlistIds: string[]
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  setInitialWishlist: (ids: string[]) => void
}

 