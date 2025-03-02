"use client";



import { useRef } from "react";


export default function Home() {
  const cardSectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    cardSectionRef.current?.scrollIntoView({behavior: "smooth"})
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-100 text-gray-900">
      <section className="flex flex-col items-center justify-center h-screen text-gray-900">
        <h1 className="text-4xl font-bold">Welcome to Machabeng game day score tracker</h1>
        <p className="mt-4 text-lg">Track score easily and stay updated!</p>

      
        <button 
          onClick={handleScroll}
          className="bg-blue-500 mt-3 text-white px-6 py-3 rounded-md hover:bg-blue-600 mb-12">
          Get Started
        </button>

      <div ref={cardSectionRef} className="flex flex-col items-center space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card title="Admin"/>
          <Card title="Secondary User"/>
          <Card title="Primary User"/>
        </div>
      </div>

      
        
      
      </section>
    </main>
  );
}

type CardProps = {title: string};
const Card = ({title}: CardProps) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center">
    <h2 className="text-2xl font-semibold">{title}</h2>

  </div>
)