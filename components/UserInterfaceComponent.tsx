import React from 'react';

const UserInterfaceComponent = () => {
  return (
    <section id="user-interface" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Naslov sa dekorativnim elementom */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 relative inline-block">
            A User Interface Designed for the Classroom
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600"></span>
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            Empowering educators and students with an intuitive, dynamic interface.
          </p>
        </div>

        {/* Sekcija sa profilima i informacijama */}
        <div className="flex flex-wrap justify-center items-center gap-12 mb-12">
          <div className="profile text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <img
              src="tch.jpg"
              alt="Teacher"
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-blue-600 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Teacher Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Organize lessons, manage students, and track progress with ease.
            </p>
            <button className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
          <div className="profile text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <img
              src="std.jpg"
              alt="Student"
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-purple-600 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Student Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Access assignments, interact with peers, and monitor achievements.
            </p>
            <button className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
              Explore Features
            </button>
          </div>
        </div>

        {/* Sekcija sa interaktivnim opisima */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Why Our Interface Stands Out
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="icon w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                📈
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Performance Insights</h4>
              <p className="text-gray-600 text-sm">
                Get detailed analytics to help improve learning outcomes.
              </p>
            </div>
            <div className="feature text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="icon w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                👩‍🏫
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Easy Communication</h4>
              <p className="text-gray-600 text-sm">
                Seamless interaction between teachers and students.
              </p>
            </div>
            <div className="feature text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="icon w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                🎓
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Student-Centered Design</h4>
              <p className="text-gray-600 text-sm">
                A personalized experience to boost engagement and productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInterfaceComponent;
