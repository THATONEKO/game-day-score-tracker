import LoginForm from "./login-form"
export default function LoginPage(){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">login</h2>
          <LoginForm/>
        </div>
      </div>  
    )
}