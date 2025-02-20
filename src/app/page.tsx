export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-100 text-gray-900">
     <h1 className="text-4xl font-bold">Welcome to Machabeng game day score tracker</h1>
     <p className="mt-4 text-lg">Track score easily and stay updated!</p>
     <a href="/dashboard" className="mt-6 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Get Started</a>
    </main>
  );
}