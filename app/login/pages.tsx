"use client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (role: "customer" | "seller") => {
    localStorage.setItem("role", role)
    router.push("/ecosmart")
  }

  return (
    <div>
      <button onClick={() => handleLogin("customer")}>Customer Demo</button>
      <button onClick={() => handleLogin("seller")}>Seller Demo</button>
      {/* ...your login form... */}
    </div>
  )
} 