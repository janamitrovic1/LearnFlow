"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    
    const {data:session,status}:any = useSession();
  
  return (
    <div className="min-h-screen flex justify-between md:flex-row flex-col p-6">
        {/* Main Section */}
          
        <div className="">
            {/* Search and Filters */}
			<div className="flex justify-between items-center mt-4">
				<h1 className="text-2xl font-semibold text-text">My Learning</h1>

				<input type="text" placeholder="Search" className="border rounded p-2 w-1/3" />
				<select className="border rounded p-2">
				<option value="academy">Academy</option>
				<option value="type">Type</option>
				</select>
				<div className="flex space-x-2">
				<button className="p-2 bg-gray-200 rounded">Grid View</button>
				<button className="p-2 bg-gray-200 rounded">List View</button>
				</div>
			</div>
			
			{/* Private Courses */}
			<section className="mt-6">
				<h2 className="text-xl font-semibold text-gray-800">Private Courses</h2>
				<div className="grid grid-cols-3 gap-4 mt-4">
				<div className="bg-white p-4 rounded shadow">
					<div className="text-green-600 text-sm">INTERMEDIATE</div>
					<img src="/path/to/private-course-image.jpg" alt="Course" className="w-full h-32 object-cover mt-2" />
					<h3 className="text-lg font-semibold mt-2">Cybersecurity Essentials</h3>
					<p className="text-gray-600">Elektro-saobraćajna tehnička...</p>
					<p className="text-gray-600">Instructor-led</p>
					<p className="text-gray-600">Sep 18, 2024 - Oct 18, 2025</p>
				</div>
				{/* Add more private course cards similarly */}
				</div>
			</section>{/* Public Courses */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Public Courses</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-4 rounded shadow">
                <div className="text-green-600 text-sm">BEGINNER</div>
                <img src="/path/to/public-course-image.jpg" alt="Course" className="w-full h-32 object-cover mt-2" />
                <h3 className="text-lg font-semibold mt-2">Networking Basics</h3>
                <p className="text-gray-600">Technical College...</p>
                <p className="text-gray-600">Self-paced</p>
                <p className="text-gray-600">Available Anytime</p>
              </div>
              {/* Add more public course cards similarly */}
            </div>
          </section>
        </div>
          
          
          
        
        {/* Sidebar */}
        <aside className="w-1/4 bg-secondary-300 shadow p-4 ml-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Achievements</h2>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <img src="/path/to/badge.jpg" alt="Badge" className="h-8 w-8" />
              <span className="text-gray-700">IT Essentials Badge</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src="/path/to/certificate.jpg" alt="Certificate" className="h-8 w-8" />
              <span className="text-gray-700">IT Essentials Certificate</span>
            </div>
            {/* Add more achievements similarly */}
          </div>
        </aside>
        
      </div>
  )
}

export default Page