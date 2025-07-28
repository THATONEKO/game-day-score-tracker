"use client"

import { useRouter} from "next/navigation"
import { motion } from "framer-motion";
import { useRef, useState } from "react";


export default function Home() {
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const [showCards, setShowCards] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    cardSectionRef.current?.scrollIntoView({behavior: "smooth"});
    setShowCards(true);
  }

  const handleCardClick = (role: string) => {
    if (role === "Primary Users") {
      router.push("/dashboard/primary");
    } else {
      router.push(`/login?role=${role}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-100 text-gray-900 p-2">
      <section className="flex flex-col items-center justify-center h-screen text-gray-900 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Welcome to Machabeng game day score tracker</h1>
        <p className="mt-4 text-lg">Track score easily and stay updated!</p>

      
        <button 
          onClick={handleScroll}
          className="bg-blue-500 mt-3 text-white px-6 py-3 rounded-md hover:bg-blue-600 mb-12">
          Get Started
        </button>

      <div ref={cardSectionRef} className="flex flex-col items-center w-full mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {["Admin", "Secondary User", "Primary Users"].map((role, index) => (
            <motion.div 
              key={role}
              className="flex justify-center"
              initial={{ y: 100, opacity: 0}}
              animate={showCards ? { y: 0, opacity: 1} : {}}
              transition={{
                duration : 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <Card title={role} onClick={() => handleCardClick(role)}/>
            </motion.div>
          ))}
        </div>
      </div>

      
        
      
      </section>
    </main>
  );
}

type CardProps = {
  title: string
  onClick: () => void;
};
const Card = ({title, onClick}: CardProps) => (
  <button
    onClick={onClick} 
    className="bg-white shadow-lg rounded-lg p-4 text-center w-60"
    >
    <h2 className="text-lg font-semibold">{title}</h2>

  </button>
)