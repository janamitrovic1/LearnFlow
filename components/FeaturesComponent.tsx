import React from 'react';

const FeaturesComponent = () => {
  return (
    <section id="features" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">How do you want to study?</h2>
        <p className="text-lg text-gray-700 mb-12">
          Master whatever you're learning with Quizlet's interactive flashcards, practice tests, and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-[#4d4df7] mb-4  ">Learn</h3>
            <p className="text-gray-600 mb-6">Use Quizlet's study tools to learn efficiently.</p>
            <button className="bg-[#4d4df7] text-white px-4 py-2 rounded-lg font-medium">
              Get started
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-[#4d4df7] mb-4">Study Guides</h3>
            <p className="text-gray-600 mb-6">Access study guides to stay on top of topics.</p>
            <button className="bg-[#4d4df7] text-white px-4 py-2 rounded-lg font-medium">
              Explore now
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-[#4d4df7] mb-4">Flashcards</h3>
            <p className="text-gray-600 mb-6">Create and review flashcards for any subject.</p>
            <button className="bg-[#4d4df7] text-white px-4 py-2 rounded-lg font-medium">
              Try flashcards
            </button>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-[#4d4df7] mb-4">Practice Tests</h3>
            <p className="text-gray-600 mb-6">Take personalized practice tests to prepare.</p>
            <button className="bg-[#4d4df7] text-white px-4 py-2 rounded-lg font-medium">
              Start practicing
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Empower your students</h3>
          <p className="text-gray-600 mb-6">
            Make studying more engaging and efficient with Quizlet for teachers.
          </p>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium">
            See plans for teachers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComponent;
