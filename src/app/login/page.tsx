"use client"

import LoginForm from "./login-form"
import { useSearchParams } from "next/navigation"

export default function LoginPage(){
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Admin";

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
          <LoginForm defaultRole={role}/>
        </div>
     
    )
}