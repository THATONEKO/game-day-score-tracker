"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useParams } from "next/navigation";
interface LoginFormProps {
  defaultRole: string;
}

export default function LoginForm({ defaultRole }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [baseurl, setBaseurl] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log(params)
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    console.log(defaultRole)
    try {
      const roleEndpoint = defaultRole.toLowerCase() === "admin" ? "login" : "login-secondary";

      const response = await fetch(`http://localhost:3001/api/auth/${roleEndpoint}`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ email, password }),
    });


      const data = await response.json();
      console.log(data)
      localStorage.setItem("adminId", data.adminId);

      if (!response.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // Save JWT token (you can also use cookies if you prefer)
      localStorage.setItem("token", data.token);

      // Redirect based on role
      switch (defaultRole.toLowerCase()) {
        case "admin":
          router.push("/dashboard/admin");
          break;
        case "secondary user":
          router.push("/dashboard/secondary");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = () => {
    switch (defaultRole.toLowerCase()) {
      case "admin":
        return "👑";
      case "secondary user":
        return "👤";
      default:
        return "🔐";
    }
  };

  const getRoleColor = () => {
    switch (defaultRole.toLowerCase()) {
      case "admin":
        return "from-purple-600 to-pink-600";
      case "secondary user":
        return "from-blue-600 to-cyan-600";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 px-6 py-8 sm:p-10 md:p-12 overflow-hidden">
          {/* Floating BG bubbles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-pink-400 to-red-500 rounded-full blur-xl animate-pulse delay-1000" />
          </div>

          {/* Header */}
          <div className="relative text-center z-10 mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full mb-4">
              <span className="text-2xl sm:text-3xl">{getRoleIcon()}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-white/70 text-sm sm:text-base mt-1">
              Sign in as <span className="text-white font-semibold">{defaultRole}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 z-10 relative">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm backdrop-blur-sm animate-shake">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-white/90 text-sm mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="email"
                  className="pl-10 pr-4 py-3 w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/90 text-sm mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 py-3 w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg bg-gradient-to-r ${getRoleColor()} text-white font-semibold shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center pt-2">
              <a href="#" className="text-xs text-white/70 hover:text-white">
                Forgot your password?
              </a>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center text-white/40 text-xs pt-6">
            Protected by advanced security measures
          </div>
        </div>
      </div>
    </div>
  );
}
