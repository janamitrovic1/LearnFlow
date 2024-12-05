
import FeaturesComponent from "@/components/FeaturesComponent";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-gray-700">
      {/* Hero sekcija */}
      	<div className="">
			<div className="flex flex-col items-center py-16 px-8 bg-primary-500">
				<h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
					How do you want to study?
				</h1>
				<p className="text-base md:text-lg text-gray-600 mb-8 text-center max-w-2xl">
					Master whatever you&apos;re learning with LearnFlow&apos;s interactive flashcards, practice tests, and study activities.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<Link href="/student/signup" className="px-6 hover:scale-110 transform transition-transform duration-500 py-3 bg-[#4d4df7] text-white rounded-lg shadow-md hover:bg-[#3b3bd1]">
						Sign up as a student
					</Link>
					<Link href="/teacher/signup" className="px-6 py-3 hover:scale-110 transform transition-transform duration-500 border border-[#4d4df7] text-[#4d4df7] rounded-lg shadow-md hover:bg-[#f3f4fa]">
						Sign up as a teacher
					</Link>
				</div>
			</div>
      	</div>

      {/* Kartice sa opcijama */}
      	<section className="py-16 px-8 bg-[#f7f9fc]">
			{/* <IntroductionComponent></IntroductionComponent> */}
			<h2 className="text-xl md:text-4xl text-center font-semibold mb-8">What is it?</h2>
			<div className="flex md:flex-row flex-col gap-8 max-w-6xl mx-auto">
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex-1 duration-500">
					<h3 className="md:text-xl text-lg font-medium text-gray-800 mb-4">Learn</h3>
					<p className="text-base md:text-lg text-gray-600">
						Create your own flashcards or choose from millions created by other students.
					</p>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex-1 duration-500">
					<h3 className="md:text-xl text-lg font-medium text-gray-800 mb-4">Study Guides</h3>
					<p className="text-base md:text-lg text-gray-600">
						Organize your study resources in one place for better retention.
					</p>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex-1 duration-500">
					<h3 className="md:text-xl text-lg font-medium text-gray-800 mb-4">Flashcards</h3>
					<p className="text-base md:text-lg text-gray-600">
						Learn with flashcards to remember concepts effectively.
					</p>
				</div>
			</div>
      	</section>
      	<FeaturesComponent />
     
    </div>
    
  );
}
