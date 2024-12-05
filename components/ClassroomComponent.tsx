import React from 'react';

const ClassroomComponent = () => {
  return (
    <section id="classroom" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Naslov sa vizuelnim akcentom */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 relative inline-block">
            Everything you can do in a physical classroom, 
            <span className="text-blue-600"> you can do with our platform.</span>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-md"></span>
          </h2>
        </div>

        {/* Sekcija sa slikom i dinamičnim hover efektom */}
<div className="relative mb-12 group">
  <div className="overflow-hidden rounded-lg">
    <img
      src="cls.png"
      alt="Classroom"
      className="w-full max-h-64 object-cover rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105"
    />
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-lg"></div>
  <div className="absolute bottom-4 left-4 text-white">
    <h3 className="text-2xl font-semibold">Seamless Classroom Experience</h3>
    <p className="text-sm">
      Tools and features designed to replicate and elevate your teaching methods.
    </p>
  </div>
</div>


        {/* Opis platforme */}
        <p className="text-lg text-center text-gray-700 mb-12">
          Our platform empowers educators to create dynamic, engaging, and efficient learning environments, wherever they are.
        </p>

        {/* Kartice sa dodatnim funkcijama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="icon bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
              📚
            </div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Interactive Lessons</h3>
            <p className="text-gray-600">
              Create real-time, engaging lessons using dynamic and interactive tools.
            </p>
            <button className="mt-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              Explore More
            </button>
          </div>
          <div className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="icon bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
              🤝
            </div>
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">Collaboration Tools</h3>
            <p className="text-gray-600">
              Foster collaboration with real-time group activities and shared workspaces.
            </p>
            <button className="mt-4 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              Learn More
            </button>
          </div>
          <div className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="icon bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
              🛠️
            </div>
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Classroom Management</h3>
            <p className="text-gray-600">
              Manage attendance, assignments, and student progress with ease.
            </p>
            <button className="mt-4 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        {/* Dugme za akciju */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:scale-105 transform transition-transform">
            Discover More Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClassroomComponent;
