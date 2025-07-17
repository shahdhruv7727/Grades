import React, { useEffect, useState } from "react";

function Loader() {
  const studentAnalyticsFacts = [
    "Every year, nearly 90% of students don’t fully understand what they’re studying until it’s applied practically.",
    "More than 60% of students forget 50% of what they learn within 24 hours, unless they revise or practice it.",
    "Students who study with a goal in mind perform up to 35% better than those who study without a clear objective.",
    "On average, students waste over 20% of their study time on distractions like social media or multitasking.",
    "Students who review their notes within 24 hours of a lecture retain up to 70% more information.",
    "Active learning methods (like solving problems or teaching others) improve understanding by up to 75%.",
    "Only 1 in 5 students regularly ask questions — yet those who do are 2x more likely to grasp complex concepts.",
    "Repetition spaced over time improves memory retention far better than cramming — up to 80% more effective.",
    "Students who relate new information to real-life examples are 50% more likely to remember it.",
    "80% of students underestimate the power of consistent daily learning versus last-minute efforts.",
    "Collaborative learners (study groups or peer teaching) perform 37% better in tests than solo learners.",
    "Students who plan their week and set goals are 60% more efficient in completing assignments.",
    "Students who track their progress weekly are more likely to stay motivated and meet their academic targets.",
  ];

  const [fact, setFact] = useState("");

  useEffect(() => {
    const updateFact = () => {
      const randomFact =
        studentAnalyticsFacts[Math.floor(Math.random() * studentAnalyticsFacts.length)];
      setFact(randomFact);
    };

    updateFact();
    const interval = setInterval(updateFact, 1500);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 overflow-hidden text-center px-4">
      {/* Background Blob Vector */}
      <svg
        className="absolute top-0 left-0 w-[600px] h-[600px] opacity-20 animate-spin-slow blur-xl"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#121749"
          d="M45.8,-47.6C60.2,-35.9,73.2,-18,71.5,-2.2C69.8,13.6,53.5,27.3,39.1,42.3C24.6,57.3,12.3,73.6,-0.5,74.1C-13.2,74.7,-26.4,59.4,-41.3,45.4C-56.1,31.3,-72.7,18.6,-75.6,3C-78.5,-12.5,-67.7,-30.9,-53.2,-43C-38.7,-55.1,-19.4,-60.8,-1.1,-59.6C17.1,-58.4,34.2,-50.3,45.8,-47.6Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Custom Spinner */}
      <div className="loader z-10 mb-6"></div>

      {/* Student Fact */}
      <p className="z-10 max-w-xl text-sm text-gray-700 animate-pulse">{fact}</p>

      {/* Spinner CSS */}
      <style>{`
        .loader {
          width: 64px;
          height: 64px;
          border: 8px solid #e0e0e0;
          border-top: 8px solid #121749;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Loader;
