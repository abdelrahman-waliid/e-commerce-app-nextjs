"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function VerifyCode() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault() 
    toast.success("True Code")
    router.push("/forgot-password/reset-password") 
  }

  return <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md border p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify Reset Code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            className="w-full border p-2 rounded"
          />

          <Button type="submit" className="w-full bg-black text-white py-2 rounded">
            Verify Code
          </Button>
        </form>
      </div>
    </div>
  </>
  
}
