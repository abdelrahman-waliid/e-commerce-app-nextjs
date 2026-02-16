'use client'
import { UserOrders } from '@/Interfaces/userOrdersInterface'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AllOrders() {

    const [orders, setOrders] = useState<UserOrders>([]) 
    const [empty, setEmpty] = useState(false)

    async function getUserOrders() {
         
        const userId = localStorage.getItem("userId") 
        

        if(!userId) return

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/`+ userId)
        const data : UserOrders = await response.json() 
        
        setOrders(data) 
        setEmpty(data.length == 0)
    }

    useEffect( ()=> {
        getUserOrders()
        
    } , [] )

  return  <>

    {empty ?  <div className="flex flex-col items-center justify-center py-24 text-center">
      
      <div className="border border-black/20 rounded-lg p-10 max-w-md bg-white shadow-sm">
        
        <h2 className="text-xl font-semibold mb-3">
          No Orders Yet
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          You haven't placed any orders yet.
          Start shopping to create your first order.
        </p>

        <Link
          href={'/products'}
          className="inline-block border border-black px-6 py-2 rounded-md hover:bg-black hover:text-white transition"
        >
          Start Shopping
        </Link>

      </div>

    </div>     
    : 
     <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h2 className="text-2xl font-extrabold border-b pb-3">
        All Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-black/20 rounded-lg p-6 bg-white shadow-sm mb-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-extrabold">
               Order <span className='font-semibold'> #{order.id} </span>
            </h3>

            <span className="text-sm font-extrabold border px-3 py-1 rounded-full border-black">
              {order.paymentMethodType}
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            {new Date(order.createdAt).toDateString()}
          </p>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p>
                <span className=" text-sm font-bold">Items:</span>{" "}
                {order.cartItems.length}
              </p>

              <p>
                <span className=" text-sm font-bold">Total:</span>{" "}
                {order.totalOrderPrice} EGP
              </p>

              <p>
                <span className=" text-sm font-bold">Payment:</span>{" "}
                {order.isPaid ? "Paid" : "Not Paid"}
              </p>

              <p>
                <span className=" text-sm font-bold">Delivery:</span>{" "}
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold">Shipping Address:</p>
              <p>{order.shippingAddress.city}</p>
              <p>{order.shippingAddress.details}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Cart Items (optional preview) */}
          <div className="mt-6 border-t pt-4">
            <p className="text-lg font-bold mb-2">Products:</p>

            <ul className="space-y-2 text-sm">
              {order.cartItems.slice(0, 3).map((item: any, index: number) => (
                <li key={index} className="flex justify-between">
                  <span>{item.product?.title}</span>
                  <span>x{item.count}</span>
                </li>
              ))}
            </ul>

            {order.cartItems.length > 3 && (
              <p className="text-xs text-gray-500 mt-2">
                + {order.cartItems.length - 3} more items
              </p>
            )}
          </div>
        </div>
      ))}
    </div> 
 
     } 

  </>
}
