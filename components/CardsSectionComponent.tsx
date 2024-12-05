import React from 'react';

const CardsSectionComponent = () => {
  return (
    <section className="py-16 px-8 bg-[#f7f9fc]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Learn</h3>
          <p className="text-gray-600">
            Create your own flashcards or choose from millions created by other students.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Study Guides</h3>
          <p className="text-gray-600">
            Organize your study resources in one place for better retention.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Flashcards</h3>
          <p className="text-gray-600">
            Learn with flashcards to remember concepts effectively.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardsSectionComponent;
