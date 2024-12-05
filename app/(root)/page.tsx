import Hero from "@/components/Hero";
//import IntroductionComponent from "@/components/IntroductionComponent";
import FeaturesComponent from "@/components/FeaturesComponent";
import ClassroomComponent from "@/components/ClassroomComponent";
import UserInterfaceComponent from "@/components/UserInterfaceComponent";
import ToolsComponent from "@/components/ToolsComponent";
import AssessmentComponent from "@/components/AssessmentComponent";
import ClassManagementComponent from "@/components/ClassManagementComponent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-gray-700">
      {/* Hero sekcija */}
      <div>
        <div className="flex flex-col items-center py-16 px-8 bg-gradient-to-b from-[#f7f9fc] to-[#eef1f7]">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
            How do you want to study?
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
            Master whatever you're learning with Quizlet's interactive flashcards, practice tests, and study activities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-[#4d4df7] text-white rounded-lg shadow-md hover:bg-[#3b3bd1]">
              Sign up for free
            </button>
            <button className="px-6 py-3 border border-[#4d4df7] text-[#4d4df7] rounded-lg shadow-md hover:bg-[#f3f4fa]">
              I'm a teacher
            </button>
          </div>
        </div>
      </div>

      {/* Kartice sa opcijama */}
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

      {/* Introduction Component */}
      {/* <IntroductionComponent /> */}
      {/* <CardsSectionComponent /> */}
      {/* Features Component */}
      <FeaturesComponent />
     
      {/* Classroom Component */}
      <ClassroomComponent />

      {/* User Interface Component */}
      <UserInterfaceComponent />

      {/* Tools Component */}
      <ToolsComponent />

      {/* Assessment Component */}
      <AssessmentComponent />

      {/* Class Management Component */}
      <ClassManagementComponent />

    
    </div>
    
  );
}
