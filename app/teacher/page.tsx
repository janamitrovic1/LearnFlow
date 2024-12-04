"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    
    const {data:session,status}:any = useSession();
  
  return (
    
	<div className="bg-gray-100 min-h-screen p-6">
	
	{/* Main Section */}
	<main className="mt-6 flex">
	  {/* Class Sections */}
	  <div className="w-3/4">
		<h1 className="text-2xl font-semibold text-gray-800">Classes</h1>
		<div className="grid grid-cols-3 gap-4 mt-4">
		  <div className="bg-white p-4 rounded shadow">
			<img src="/path/to/class-icon.jpg" alt="Class Icon" className="h-10 w-10 rounded" />
			<h2 className="text-lg font-semibold mt-2">Class 1</h2>
			<p className="text-gray-600">20 students</p>
		  </div>
		  {/* Add more class cards similarly */}
		</div>
		
		{/* Quiz History */}
		<section className="mt-6">
		  <h2 className="text-xl font-semibold text-gray-800">Quiz History</h2>
		  <div className="mt-4">
			<div className="bg-white p-4 rounded shadow">
			  <h3 className="text-lg font-semibold">Quiz 1</h3>
			  <p className="text-gray-600">Assigned on Jan 15, 2024</p>
			</div>
			{/* Add more quiz history cards similarly */}
		  </div>
		</section>
	  </div>
	  
	  {/* Add Quiz Section */}
	  <aside className="w-1/4 bg-white shadow p-4 ml-4">
		<h2 className="text-xl font-semibold text-gray-800">Add New Quiz</h2>
		<button className="mt-4 bg-blue-500 text-white p-2 rounded">Create Quiz</button>
	  </aside>
	</main>
  </div>
    );
  };

export default Page