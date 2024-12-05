import React from 'react';

const FeaturesComponent = () => {
  return (
    <section id="features" className="py-12 bg-gray-100">
      	<div className="container mx-auto px-4 text-center">
			<h2 className="text-xl md:text-4xl text-center font-semibold text-gray-800 mb-6">You can do everything, <span>just like in your classroom.</span></h2>
			<p className="text-base md:text-lg text-gray-700 mb-12">
				Master whatever you're learning with LearnFlow's interactive flashcards, practice tests, and more.
			</p>
			<div className="flex lg:flex-row justify-between items-center flex-col gap-8">
				{/* Card 1 */}
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg flex-1 transition-shadow">
					<h3 className="md:text-xl text-lg font-medium text-[#4d4df7] mb-4  ">Learn</h3>
					<p className="text-gray-600 text-base md:text-lg mb-6">Use LearnFlow's study tools to learn efficiently.</p>
					<button className="bg-[#4d4df7] hover:scale-110 transform transition-transform duration-500 text-white px-4 py-2 rounded-lg font-normal">
						You can learn
					</button>
				</div>
				{/* Card 2 */}
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg flex-1 transition-shadow">
					<h3 className="md:text-xl text-lg font-medium text-[#4d4df7] mb-4">Study Guides</h3>
					<p className="text-base md:text-lg text-gray-600 mb-6">Access study guides to stay on top of topics.</p>
					<button className="bg-[#4d4df7] hover:scale-110 transform transition-transform duration-500 text-white px-4 py-2 rounded-lg font-normal">
						You can take quizzes
					</button>
				</div>
				{/* Card 3 */}
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg flex-1 transition-shadow">
					<h3 className="md:text-xl text-lg font-medium text-[#4d4df7] mb-4">Flashcards</h3>
					<p className="text-base md:text-lg text-gray-600 mb-6">Create and review flashcards for any subject.</p>
					<button className="bg-[#4d4df7] hover:scale-110 transform transition-transform duration-500 text-white px-4 py-2 rounded-lg font-normal">
						You can make flashcards
					</button>
				</div>
				{/* Card 4 */}
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg flex-1 transition-shadow">
					<h3 className="md:text-xl text-lg font-medium text-[#4d4df7] mb-4">Practice Tests</h3>
					<p className="text-base md:text-lg text-gray-600 mb-6">Take personalized practice tests to prepare.</p>
					<button className="bg-[#4d4df7] hover:scale-110 transform transition-transform duration-500 text-white px-4 py-2 rounded-lg font-normal">
						You can practice
					</button>
				</div>
			</div>
      	</div>
    </section>
  );
};

export default FeaturesComponent;
