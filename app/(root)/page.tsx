import Hero from "@/components/Hero";
export default function Home() {
	return (
  	<div>
    	<Hero></Hero>
		<section className="what-is-skilline py-16 px-6 md:px-20">
			<div className="text-center mb-12">
				<h2 className="title">What is <span className="highlight">Skilline?</span></h2>
				<p className="subtitle">
				Skilline is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes, and exams; monitor due dates; grade results and provide students with feedback all in one place.
				</p>
			</div>
			<div className="cards flex flex-col md:flex-row gap-6 justify-center">
				<div className="card">
				<div className="overlay">
					<h3 className="card-title">FOR INSTRUCTORS</h3>
					<button className="cta-button cta-button-outline">Start a className today</button>
				</div>
				</div>
				<div className="card">
				<div className="overlay">
					<h3 className="card-title">FOR STUDENTS</h3>
					<button className="cta-button cta-button-filled">Enter access code</button>
				</div>
				</div>
			</div>
		</section>

  	</div>
  	);
}
