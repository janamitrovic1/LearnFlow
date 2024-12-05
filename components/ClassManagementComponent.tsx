import React from 'react';

const ClassManagementComponent = () => {
  return (
    <section id="class-management" className="py-16 bg-cover bg-center relative">
      {/* Sloj za sliku sa blur efektom */}
      <div className="absolute inset-0">
        <img
          src="cls.png"
          alt="Class Management Background"
          className="w-full h-full object-cover blur-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Sadržaj sekcije */}
      <div className="relative container mx-auto px-6 lg:px-12 text-white">
        {/* Naslov i opis */}
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Class Management Tools for Educators
        </h2>
        <p className="text-lg text-center mb-12">
          Simplify your teaching with powerful tools designed to help you manage classes efficiently.
        </p>

        {/* Kartice sa unapređenim dizajnom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white bg-opacity-90 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <span className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded-full">
                <i className="fas fa-chart-line"></i>
              </span>
              <h3 className="text-2xl font-semibold text-blue-700">Track Progress</h3>
            </div>
            <p className="text-gray-600">
              Monitor student progress in real-time and identify areas for improvement.
            </p>
          </div>
          <div className="p-6 bg-white bg-opacity-90 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <span className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full">
                <i className="fas fa-folder-open"></i>
              </span>
              <h3 className="text-2xl font-semibold text-purple-700">Organize Materials</h3>
            </div>
            <p className="text-gray-600">
              Easily manage and distribute study materials and assignments.
            </p>
          </div>
          <div className="p-6 bg-white bg-opacity-90 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <span className="w-10 h-10 bg-green-700 text-white flex items-center justify-center rounded-full">
                <i className="fas fa-users"></i>
              </span>
              <h3 className="text-2xl font-semibold text-green-700">Engage Students</h3>
            </div>
            <p className="text-gray-600">
              Use interactive tools to keep students engaged and motivated.
            </p>
          </div>
        </div>

        {/* Dugme sa modernim izgledom */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-blue-700 hover:shadow-xl transition-transform transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClassManagementComponent;
