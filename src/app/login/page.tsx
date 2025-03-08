"use client"

import LoginForm from "./login-form"
import { useSearchParams } from "next/navigation"

export default function LoginPage(){
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Admin";

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">login as {role}</h2>
          <LoginForm defaultRole={role}/>
        </div>
      </div>  
    )
}