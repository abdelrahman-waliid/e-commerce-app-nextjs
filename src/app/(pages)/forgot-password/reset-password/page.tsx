"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ResetPassword() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Password is Changed Successfully")
    router.push("/login")
  }

  return <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md border p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
          />

          <Button type="submit" className="w-full bg-black text-white py-2 rounded">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  </>
}
