 "use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form" 
import * as z from "zod"
import {signIn} from 'next-auth/react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
 

const formSchema = z.object({
  email: z.email('invaild email').nonempty('Email is Required') ,
  password: z.string().nonempty('Password is Required') 
})

type FormData = z.infer<typeof formSchema>

export default function LoginForm() {

  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams().get('url') 
  

  const form = useForm< FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  
const router = useRouter()
async  function onSubmit(data: FormData) { 
    setIsLoading(true)
    const response = await signIn('credentials' , {
      email:data.email,
      password:data.password , 
      redirect: true ,   // 3alashan ye reload w el navbar te3raf w da 3alashan mesta5dem el getServerSession() fel Navbar.tsx
      callbackUrl: searchParams ? searchParams : '/products'       // ywadeeh direct b3d el login lel products 
    }) 
    // dool malhomsh lazma fe 7alet eny 3amel callbackUrl w redirect be true la2n howa kda elly haywadeny bdon tada5ol mny m3 reload 3alashan ay te8yeer yesama3 fel app kolo
    // if(response?.ok){
    //   toast.success('Login Successfully') 
    //   router.push('/products')
    // }else{
    //   toast.error(response?.error! )
    // }
    setIsLoading(false)
      
  }

  return  <div className="w-full flex flex-col justify-center items-center">
    <Card className="w-full sm:max-w-md flex flex-col mt-5">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-extrabold">Login </CardTitle> 
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com" 
                    />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
              />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid} 
                    placeholder="Enter your Password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
             
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-5">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button disabled={isLoading} type="submit" form="form-rhf-demo">
            {isLoading && <Loader2 className="animate-spin"/>}
            Login
          </Button>
        </Field>
      </CardFooter>
          <p className="text-sm text-gray-500 text-center mt-5"> Forgot your password? <Link href={'/forgot-password'} className="text-blue-500 hover:underline">  Reset here  </Link> </p>
    </Card>
          <div className="text-md text-black text-center mt-5"> If you don't have account, please  <Link href={'/register'} className="text-blue-500 underline">  SignUp  </Link> Now </div>
   
  </div>
}

