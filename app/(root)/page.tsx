import Hero from "@/components/Hero";
export default function Home() {
	return (
  	<div>
    	<Hero></Hero>
		<div className="px-16">
			<section className="what-is-skilline py-16 px-6 md:px-20">
				<div className="text-center mb-12">
					<h2 className="title">What is <span className="highlight">Skilline?</span></h2>
					<p className="subtitle">
					Skilline is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes, and exams; monitor due dates; grade results and provide students with feedback all in one place.
					</p>
				</div>
				<div className="cards flex flex-col md:flex-row gap-6 justify-center">
					<div className="card card-1">
						<div className="overlay">
							<h3 className="card-title">FOR INSTRUCTORS</h3>
							<button className="cta-button cta-button-outline">Start a className today</button>
						</div>
					</div>
					<div className="card card-2">
						<div className="overlay">
							<h3 className="card-title">FOR STUDENTS</h3>
							<button className="cta-button cta-button-filled">Enter access code</button>
						</div>
					</div>
				</div>
			</section>
			<div className="text-center my-12">
				<h2 className="text-4xl text-text font-bold mb-4"><span className="text-[#B2B3CF]">All-In-One</span> Cloud Software.</h2>
				<p className="text-lg text-gray-500 mb-8">
					Skilline is one powerful online software suite that combines all the tools needed to run a successful school or office.
				</p>

				{/* Flexbox container za 3 kartice */}
				<div className="flex flex-wrap justify-center gap-6 px-4">
					<div className="feature-card">
					<div className="feature-icon">
						<i className="fas fa-file-invoice">
							<img src="doc.svg" alt="" width={20} />
						</i>
					</div>
					<h3 className="text-xl text-[#2F327D] font-semibold mb-2">Online Billing, Invoicing, & Contracts</h3>
					<p className="text-sm text-gray-600">
						Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts.
					</p>
					</div>
					<div className="feature-card">
					<div className="feature-icon">
						<i className="fas fa-calendar-check">
							<img src="cal.svg" alt="" width={20} />
						</i>
					</div>
					<h3 className="text-xl text-[#2F327D] font-semibold mb-2">Easy Scheduling & Attendance Tracking</h3>
					<p className="text-sm text-gray-600">
						Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance.
					</p>
					</div>
					<div className="feature-card">
					<div className="feature-icon">
						<i className="fas fa-users">
							<img src="group.svg" alt="" width={20} />
						</i>
					</div>
					<h3 className="text-xl text-[#2F327D] font-semibold mb-2">Customer Tracking</h3>
					<p className="text-sm text-gray-600">
						Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization.
					</p>
					</div>
				</div>

				<div className="mt-12 text-center ">
					<h3 className="text-3xl text-text font-medium mb-6">
					Everything you can do in a physical classroom, <span className="text-[#B2B3CF]">you can do with Skilline</span>
					</h3>
					<p className="text-lg font-normal text-gray-500 mb-6">
					Skilline’s school management software helps traditional and online schools manage scheduling, attendance, payments, and virtual classrooms all in one secure cloud-based system.
					</p>
					<button className="feature-button">Learn more</button>
				</div>
			</div>
			{/* <section className="assessments-section py-16 px-6 md:px-20 bg-white">
				<div className="grid md:grid-cols-2 gap-8 items-center">
					<div className="question-card bg-white shadow-lg rounded-lg p-6 relative">
					<div className="question-header flex justify-between items-center mb-4">
						<span className="question-badge bg-purple-100 text-purple-600 text-sm px-4 py-1 rounded-full">
						Question 1
						</span>
						<div className="status-icons flex gap-2">
						<span className="icon bg-red-100 text-red-600 p-2 rounded-full">&#10006;</span>
						<span className="icon bg-green-100 text-green-600 p-2 rounded-full">&#10004;</span>
						</div>
					</div>
					<h3 className="question-text text-lg font-semibold text-gray-800 mb-4">
						True or false? This play takes place in Italy
					</h3>
					<div className="image-container rounded-lg overflow-hidden mb-4">
						<img
						src="/path-to-image.jpg"
						alt="Italy"
						className="w-full h-40 object-cover"
						/>
					</div>
					<div className="answer-feedback flex items-center bg-green-100 text-green-600 p-4 rounded-lg">
						<span className="icon text-lg mr-2">&#9993;</span>
						<p className="text-sm">Your answer was sent successfully</p>
					</div>
					</div>``

					<div className="description">
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						Assessments, <span className="text-purple-600">Quizzes</span>, Tests
					</h2>
					<p className="text-gray-600 text-base">
						Easily launch live assignments, quizzes, and tests. Student results are
						automatically entered in the online gradebook.
					</p>
					</div>
				</div>
			</section> */}
		</div>
  	</div>
  	);
}
