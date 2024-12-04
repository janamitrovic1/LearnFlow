// "use client"
import StudentClasses,{ StudentClassesType } from '@/components/StudentClasses'
import StudentQuizes, { StudentQuizesType } from '@/components/StudentQuizes';
import { PlusCircle } from 'lucide-react';
// import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link';
const Page = async () => {
    
	const res = await fetch(`${process.env.APP_API_URL}/api/student/class`, {
        credentials: "include",
    });
    const { data: classes }: { data: StudentClassesType[] } = await res.json();

	console.log(classes);


	const res2 = await fetch(`${process.env.APP_API_URL}/api/student/quiz`, {
        credentials: "include",
    });
    const { data: quizes }: { data: StudentQuizesType[] } = await res2.json();

	console.log(quizes);


	const privateQuizes = quizes.filter((quizItem) => quizItem.quiz.isPrivate);
	const publicQuizes = quizes.filter((quizItem) => !quizItem.quiz.isPrivate);

  	return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      	<main className="mt-6 w-full flex">
			{/* Class Sections */}
			<div className="w-full">
				<div className="flex flex-row gap-5 items-center">
					<h1 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text"><Link href="/student/class">Your Classes</Link></h1>
					<Link href="student/class/join" className=" ">
						<PlusCircle stroke="green"></PlusCircle>
					</Link>
				</div>
					
				
				<div className="flex flex-wrap gap-4 mt-4">
					{classes.length>0?classes.map((classItem, index) => (
						<StudentClasses 
						key={index} 
						props={classItem} 
						/>
					)):<p className=''>No Classes Found</p>}
				</div>
			
			{/* Test Section */}
			<section className="mt-6">
				<h2 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text"><Link href="/student/quiz/private">Your Private Quizzes</Link></h2>
				<div className="mt-4">
					{privateQuizes.length>0?privateQuizes.map((quizItem, index) => (
						<StudentQuizes
							key={index}
							props={quizItem}
						/>
					)):<p className=''>No Tests Found.</p>}
				</div>
			</section>
			{/* Quiz Section */}
			<section className="mt-6">
				<h2 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text"><Link href="/student/quiz/public">Your Public Quizzes</Link></h2>
				<div className="mt-4">
					{publicQuizes.length>0?publicQuizes.map((quizItem, index) => (
						<StudentQuizes
							key={index}
							props={quizItem}
						/>
					)):<p className=''>No Quizes Found.</p>}
				</div>
			</section>
			</div>
      	</main>
    </div>
  )
}

export default Page