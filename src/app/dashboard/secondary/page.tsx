"use client"

import Image from  "next/image";
import { useRouter } from "next/navigation";

const sport = [
  { name: "Basketball", path: "basketball", icon: "/sports-icons/basketball.png" },
  { name: "Soccer", path: "soccer", icon: "/sports-icons/soccer.png" },
  { name: "Racing", path: "racing", icon: "/sports-icons/racing.png" },
  { name: "Speed Walk", path: "speedwalk", icon: "/sports-icons/speedwalk.png" },
  { name: "Short Put", path: "shortput", icon: "/sports-icons/shortput.png" },
  { name: "Long Jump", path: "longjump", icon: "/sports-icons/longjump.png" },
]

export default function SecondaryDasboard() {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(`/dashboard/secodary/sports/${path}`);
    };

    return (
        <div className="p-6">
            <h1>Secondary User Dashboard</h1>

            <div className="space-y-6">
                {sport.map((sport, idx) =>
                    <div
                        key={sport.name}
                        className={`flex ${
                            idx % 2 === 0 ? "justify-start" : "justify-end"
                        }`}
                    >
                        <button
                            onClick={() => handleNavigate(sport.path)}
                            className="w-40 h-40 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform"
                        >
                            <Image
                                src={sport.icon}
                                alt={sport.name}
                                width={60}
                                height={60}
                                className="mb-3"
                            />
                            <span className="text-lg font-semibold text-gray-800 text-center">
                                {sport.name}
                            </span>

                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}