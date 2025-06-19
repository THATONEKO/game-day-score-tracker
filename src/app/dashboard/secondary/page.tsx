"use client"

import { useRouter } from "next/navigation";

export default function SecondaryDashboard() {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push('/dashboard/secondary/sports/${path}');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Secodary User Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                    onClick={() => handleNavigate("basketball")}
                    className="text-black p-4 bg-white rounded shadow hover:bg-blue-100"              
                >
                    Record Basketball Scores
                </button>

                <button
                    onClick={() => handleNavigate("soccer")}
                    className="text-black p-4 bg-white rounded shadow hover:bg-purple-100"
                >
                    Record Soccer Scores
                </button>
                <button
                    onClick={() => handleNavigate("racing")}
                    className="text-black p-4 bg-white rounded shadow hover:bg-purple-100"
                >
                    Record Springting Scores
                </button>
                <button
                    onClick={() => handleNavigate("speedwalk")}
                    className="text-black p-4 bg-white rounded shadow hover:bg-purple-100"
                >
                    Record Speed Walk
                </button>
                <button 
                    onClick={() => handleNavigate("shortput")}
                    className="text-black p-4 bg-white rounded shadow hover:bg-purple-100"
                >
                    Record Short Put
                </button>
                <button
                    onClick={() => handleNavigate("longjump")}
                    className="text-black p-4 bg-white rounded shadow hover:bg-red-100"
                >
                    Record Long jump
                </button>
            </div>

        </div>
    )
}