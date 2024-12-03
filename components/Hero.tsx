import React from "react";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="hero bg-primary rounded-b-[50px] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-20">
     {/*Left content */}
      	<div className="text-content text-center md:text-left">

			<h1 className="text-4xl md:text-5xl font-bold text-black-100 leading-snug">
				<span className="text-third">Studying</span> Online is now <br />
				much easier
			</h1>

			<p className="mt-4 text-text text-lg">
				Skilline is an interesting platform that will teach you in more an
				interactive way
			</p>

			<div className="mt-6 flex flex-col md:flex-row items-center gap-4">

				<button className="btn-join bg-third text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-third">
					Join for free
				</button>
				<div className="flex items-center gap-2">
					<Link href="/" className="play-btn flex items-center justify-center w-12 h-12 bg-white text-third rounded-full shadow-md hover:bg-gray-100">
						▶
					</Link>
					<Link href="/" className="text-gray-700 font-medium text-lg">
						Watch how it works
					</Link>
			</div>

			</div>

      	</div>
      {/* Right content */}
      <div className="image-content mt-8 md:mt-0">
        <img
          src="zena.png"
          alt="Smiling student holding books"
          className="w-full max-w-md md:max-w-lg rounded-br-[50px] rounded-bl-[50px] shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;