import React from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ScrollEffect = () => {

  const navigate = useNavigate();

  const companyLogos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
  ];

  return (
    <div className="w-screen min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-6 px-6 bg-black text-white mb-5 ">
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center gap-3 w-full pt-12 md:pt-14 lg:pt-20">
        <div className="relative flex flex-col items-center justify-center gap-2 w-fit">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-9 md:leading-[60px] text-center">
            Learn Skills That Matter
          </h1>
          <h3 className="w-4/5 md:w-full text-sm md:text-base lg:text-xl text-gray-300 font-normal leading-6 md:leading-7 lg:leading-8 text-center">
            Gain real-world job ready skills for the future.
          </h3>
        </div>

        {/* CTA */}
        <button className="bg-white hover:bg-gray-600 text-black hover:text-white border-2 border-white font-semibold text-sm md:text-base px-4 py-3 md:px-6 md:py-3 lg:px-7 lg:py-3 rounded-lg flex items-center gap-2 mt-6 cursor-pointer" onClick={() => navigate("/allcourses")}>
          Get Started
          <span>
            <BiSearch className="w-6 h-6" />
          </span>
        </button>
      </header>

      {/* Scrolling Logos */}
      <div className="relative overflow-hidden w-full max-w-5xl mx-auto select-none">
        <style>
          {`
            .marquee-inner {
              animation: marqueeScroll linear infinite;
            }
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>

        {/* Gradient left */}
        <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />

        <div
          className="marquee-inner flex will-change-transform min-w-[200%]"
          style={{ animationDuration: "15s" }}
        >
          <div className="flex">
            {[...companyLogos, ...companyLogos].map((company, index) => (
              <img
                key={index}
                src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                alt={company}
                className="h-12 w-auto mx-6 object-contain"
                draggable={false}
              />
            ))}
          </div>
        </div>

        {/* Gradient right */}
        <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
      </div>
    </div>
  );
};

export default ScrollEffect;
