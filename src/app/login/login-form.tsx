"use client";

import {useEffect, useState} from "react";

interface LoginFormProps  {
    defaultRole: string;
}

export default function LoginForm({defaultRole}: LoginFormProps){
    const [email, setEmail] =  useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        console.log("Loggin in as ${defaultRole} with:", {email, password});
    };

    return ( 
         <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    type="submit"
                    >
                        Submit as {defaultRole}
                    </button>
                </div>
            </form>
        
    )
    
}