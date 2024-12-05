
import { TeachersQuizesType } from "@/components/TeachersQuizes";
import TeachersQuizes from "@/components/TeachersQuizes";

export default async function AllQuizzes() {

    const res = await fetch(process.env.APP_API_URL + "/api/teacher/quiz", {
    	credentials: 'include'
    });
	const { data:quizes } : { data: TeachersQuizesType[] } = await res.json();

  	console.log(quizes);

  	return (
		<div className="mt-4 p-6">
			{quizes.length>0?quizes.map((quizItem, index) => (
				<TeachersQuizes
					key={index}
					props={quizItem}
				/>
			)):<p className=''>No Tests Found.</p>}
		</div>
  	)
}