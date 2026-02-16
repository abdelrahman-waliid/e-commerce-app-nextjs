'use client' 
import { registerBody, signUpAction } from "@/actions/registerAction" 
import { zodResolver } from "@hookform/resolvers/zod" 
import { useForm } from "react-hook-form"
import { Field } from "../ui/field"
import { Input } from "../ui/input" 
import { useState } from "react"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react" 
import { registerSchema } from "@/Shema/RegisterShema"
 
 

export default function RegisterForm() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
   

    const {handleSubmit , register , formState} = useForm({
        defaultValues: {
            name: '' , 
            email: '' ,
            password: '' , 
            rePassword:'' , 
            phone: ''
        } , 
        resolver : zodResolver(registerSchema) ,
        mode:'all'
    }) 

    async function signUp(values:registerBody) {
      setIsLoading(true)
      const response  = await signUpAction(values) 
      
      console.log(response);
      if(response.statusMsg == 'fail'){
        toast.error(response.message + '') 
      }else{
        router.push('/login')
        toast.success('Registered Successfully')
      }
      
      setIsLoading(false)
 
        
    }

  return  <div className="min-h-screen flex justify-around items-center gap-x-10"> 
    <div className="min-w-sm bg-white py-10 px-6 shadow-2xl rounded-2xl border">
      <h2 className='text-3xl font-extrabold mb-4 text-center'>Register</h2>
      <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4">

         <Field> 
            <label className="text-sm font-bold" htmlFor="name-demo-api-key"> Name </label>
            <Input aria-invalid={Boolean(formState.errors.name?.message)} aria-errormessage={formState.errors.name?.message}  id="name-demo-api-key" type="text" placeholder="Enter Your Name" {...register('name')} />
            {formState.errors.name && <p className="text-red-500 text-sm"> {formState.errors.name.message} </p>}
            <label className="text-sm font-bold" htmlFor="email-demo-api-key"> Email </label>
            <Input aria-invalid={Boolean(formState.errors.email?.message)} aria-errormessage={formState.errors.email?.message} id="email-demo-api-key" type="email" placeholder="example@gmail.com" {...register('email')} />
            {formState.errors.email && <p className="text-red-500 text-sm"> {formState.errors.email.message} </p>}
            <label className="text-sm font-bold" htmlFor="password-demo-api-key"> Password </label>
            <Input aria-invalid={Boolean(formState.errors.password?.message)} aria-errormessage={formState.errors.password?.message} id="password-demo-api-key" type="password" placeholder="Enter Your Password" {...register('password')} />
            {formState.errors.password && <p className="text-red-500 text-sm"> {formState.errors.password.message} </p>}
            <label className="text-sm font-bold" htmlFor="repassword-demo-api-key"> rePassword </label>
            <Input aria-invalid={Boolean(formState.errors.rePassword?.message)} aria-errormessage={formState.errors.rePassword?.message} id="rePassword-demo-api-key" type="password" placeholder="Enter Your rePassword" {...register('rePassword')} />
            {formState.errors.rePassword && <p className="text-red-500 text-sm"> {formState.errors.rePassword.message} </p>}
            <label className="text-sm font-bold" htmlFor="phone-demo-api-key"> Phone </label>
            <Input aria-invalid={Boolean(formState.errors.phone?.message)} aria-errormessage={formState.errors.phone?.message} id="phone-demo-api-key" type="text" placeholder="Enter Your Phone Number" {...register('phone')} /> 
            {formState.errors.phone && <p className="text-red-500 text-sm"> {formState.errors.phone.message} </p>}
        </Field>

        <Button disabled={isLoading} type="submit" className="mt-5">  {isLoading && <Loader2 className="animate-spin"/>} SignUp </Button>
      </form>
    </div>
  </div>
  
}
