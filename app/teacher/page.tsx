import React from "react";
import { TeachersClassesType } from "@/components/TeachersClasses";
import TeachersClasses from "@/components/TeachersClasses";
import TeachersQuizes from "@/components/TeachersQuizes";
import { TeachersQuizesType } from "@/components/TeachersQuizes";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
const Page = async () => {
  
    const res = await fetch(`${process.env.APP_API_URL}/api/teacher/class`, {
    	credentials: "include",
  	});
	const { data: classes }: { data: TeachersClassesType[] }= await res.json();

	console.log(classes);


	const res2 = await fetch(`${process.env.APP_API_URL}/api/teacher/quiz`, {
    	credentials: "include",
	});
	const { data: quizes }: { data: TeachersQuizesType[] }= await res2.json();

	console.log(quizes);

	
	// const privateQuizes = quizes.filter((quizItem) => quizItem.quiz.isPrivate);
	// const publicQuizes = quizes.filter((quizItem) => !quizItem.quiz.isPrivate);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      	<main className="mt-6 w-full flex">
			{/* Class Sections */}
			<div className="w-full">
				<div className="flex flex-row gap-5 items-center">
					<h1 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text"><Link href="/teacher/class">Your Classes</Link></h1>
					<Link href="teacher/class/create" className=" ">
						<PlusCircle stroke="green"></PlusCircle>
					</Link>
				</div>
				<div className="flex flex-wrap gap-4 mt-4">
					{classes.length>0?classes.map((classItem, index) => (
						<TeachersClasses 
						key={index} 
						props={classItem} 
						/>
					)):<p className=''>No Classes Found</p>}
				</div>
			
			{/* Test Section */}
			<section className="mt-6">
				<div className="flex flex-row gap-5 items-center">
					<h1 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text"><Link href="/teacher/quiz/">Your Quizzes</Link></h1>
					<Link href="teacher/quiz/create" className=" ">
						<PlusCircle stroke="green"></PlusCircle>
					</Link>
				</div>
				<div className="mt-4">
					{quizes.length>0?quizes.map((quizItem, index) => (
						<TeachersQuizes
							key={index}
							props={quizItem}
						/>
					)):<p className=''>No Tests Found.</p>}
				</div>
			</section>
			</div>
      	</main>
    </div>
  );
};

export default Page;
