import React from 'react';

const AssessmentComponent = () => {
  return (
    <section id="assessment" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Naslov sa animacijom */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight relative">
            Assessments, Quizzes, Tests
            <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded-md animate-pulse"></span>
          </h2>
          <p className="text-lg text-gray-700">
            Transform your learning with comprehensive assessments tailored to every skill level.
          </p>
        </div>

       {/* Glavna slika sa dodatnim opisom */}
<div className="relative group mb-12">
  <div className="overflow-hidden rounded-lg">
    <img
      src="asm.jpg"
      alt="Assessment"
      className="w-full max-h-64 object-cover rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105"
    />
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-lg"></div>
  <div className="absolute bottom-4 left-6 text-white space-y-2">
    <h3 className="text-2xl font-semibold">Adaptive Learning Tools</h3>
    <p className="text-sm">
      Create customized quizzes, track performance, and improve your learning outcomes.
    </p>
  </div>
</div>


        {/* Kartice za dodatne funkcionalnosti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="icon bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
              🧠
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Smart Quizzes</h4>
            <p className="text-gray-600 text-sm">
              AI-powered quizzes that adapt to your skill level and improve over time.
            </p>
          </div>
          <div className="feature-card bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="icon bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
              📊
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Detailed Analytics</h4>
            <p className="text-gray-600 text-sm">
              Monitor your progress with real-time analytics and insights.
            </p>
          </div>
          <div className="feature-card bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="icon bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
              🎓
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Certification Ready</h4>
            <p className="text-gray-600 text-sm">
              Complete assessments to earn certifications and unlock new opportunities.
            </p>
          </div>
        </div>

        {/* Dugme za akciju */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:scale-105 transform transition-transform">
            Start Your Assessment Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default AssessmentComponent;
