import React from 'react';

const IntroductionComponent = () => {
  return (
    <section id="introduction" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What is it?</h2>
        <p className="text-center text-gray-600 mb-12">A platform designed to make teaching and learning easier.</p>
        <div className="flex justify-center gap-8">
          <img src="image1.png" alt="Benefit 1" className="w-1/2 h-auto object-cover rounded-lg" />
          <img src="image2.png" alt="Benefit 2" className="w-1/2 h-auto object-cover rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default IntroductionComponent;
