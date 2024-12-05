import React from 'react';

const ToolsComponent = () => {
  return (
    <section id="tools" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Naslov sa dekorativnim elementom */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 relative inline-block">
            Tools for Teachers and Learners
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600"></span>
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            Unleash the power of advanced tools to enhance teaching and learning experiences.
          </p>
        </div>

        {/* Glavni deo sa slikom i sadržajem */}
        <div className="relative mb-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div className="lg:pr-10">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Tailored Features for Every Need
            </h3>
            <p className="text-gray-600 mb-6">
              Whether you're a teacher planning lessons or a student managing study materials,
              our platform offers a wide range of tools to fit your unique requirements.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-4">
                  ✓
                </span>
                <p className="text-gray-600">
                  Effortless lesson creation and organization.
                </p>
              </li>
              <li className="flex items-center">
                <span className="bg-purple-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-4">
                  ✓
                </span>
                <p className="text-gray-600">
                  Seamless collaboration for students and teachers.
                </p>
              </li>
              <li className="flex items-center">
                <span className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-4">
                  ✓
                </span>
                <p className="text-gray-600">
                  Smart tracking of performance and progress.
                </p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="tool.jpg"
              alt="Tools"
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 rounded-lg opacity-30"></div>
          </div>
        </div>

        {/* Sekcija sa dodatnim informacijama */}
        <div className="bg-gray-100 py-12 px-6 rounded-lg shadow-inner">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Tools?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-blue-600 text-white w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                📚
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Comprehensive
              </h4>
              <p className="text-gray-600">
                Access all essential tools in one platform, tailored to your needs.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-purple-600 text-white w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                🚀
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Easy to Use
              </h4>
              <p className="text-gray-600">
                Intuitive design ensures a seamless experience for all users.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-green-600 text-white w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                🔒
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Secure
              </h4>
              <p className="text-gray-600">
                Your data and progress are safe with our advanced security measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsComponent;
