'use client'
import { checkOutCardAction, checkOutCashAction } from "@/actions/addtocart.action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShippingAddress } from "@/Interfaces/cartInterfaces"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

export default function CheckOutSession( {cartId} : {cartId : string | undefined } ) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card') 
    const city = useRef<null | HTMLInputElement>(null)
    const details = useRef<null | HTMLInputElement>(null)
    const phone = useRef<null | HTMLInputElement>(null)

    async function checkOut(){
        setIsLoading(true)
        const shippingAddress : ShippingAddress = {
            city : city.current?.value as string,
            details : details.current?.value as string,
            phone : phone.current?.value as string
        }

        if(cartId){

          
          try{
            if(paymentMethod == 'card'){
              
              const response = await checkOutCardAction(cartId  , shippingAddress) 
              
              if(response.status == "success"){
                location.href = response.session.url
              }
              
            }else{
              const response = await checkOutCashAction(cartId , shippingAddress)
              if(response.status == 'success'){
                toast.success('Order placed successfully')
                router.push('/allorders')
              }
            }
            
          }catch(err){
            console.log(err); 
          }
          
          setIsLoading(false)
        }
      }

  return  <> 
    <Dialog> 
        <DialogTrigger asChild>
          <button className='w-full mt-3 h-11 rounded-xl border
           hover:bg-accent hover:text-accent-foreground transition-colors duration-500 bg-accent-foreground text-accent cursor-pointer'> 
            CheckOut 
        </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Please , add your shipping address in details 
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="city ">City</Label>
              <Input ref={city} id="city " name="city" defaultValue="Cairo" />
            </Field> 
            <Field>
              <Label htmlFor="details ">details</Label>
              <Input ref={details} id="details " name="details" defaultValue="Maadi" />
            </Field> 
            <Field>
              <Label htmlFor="phone ">phone</Label>
              <Input ref={phone} id="phone " name="phone" defaultValue="01102827826" />
            </Field> 
          </FieldGroup>
          <div className="mt-3 space-y-2">
              <Label>Payment Method</Label>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="card"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <Label htmlFor="card">Card</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="cash"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <Label htmlFor="cash">Cash</Label>
              </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} onClick={ checkOut } type="submit">
                {isLoading && <Loader2 className="animate-spin"/>}
                {paymentMethod === 'card' ? 'Pay with Card' : 'Confirm Cash Order'}
            </Button>
          </DialogFooter>
        </DialogContent> 
    </Dialog>

  </>
}
