"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ForgotPassword() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Code sent to your email successfully")
    router.push("/forgot-password/verify-code")
  }

  return  <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md border p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
          />

          <Button type="submit" className="w-full bg-black text-white py-2 rounded cursor-pointer">
            Send Code
          </Button>
        </form>
      </div>
    </div>
  </>
  
}
