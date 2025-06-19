import React from 'react'
import { Vortex } from "react-loader-spinner";

function Loader() {
  const studentAnalyticsFacts = [
      "🔍 Every year, nearly 90% of students don’t fully understand what they’re studying until it’s applied practically.",
      "📉 More than 60% of students forget 50% of what they learn within 24 hours, unless they revise or practice it.",
      "📊 Students who study with a goal in mind perform up to 35% better than those who study without a clear objective.",
      "⏳ On average, students waste over 20% of their study time on distractions like social media or multitasking.",
      "📈 Students who review their notes within 24 hours of a lecture retain up to 70% more information.",
      "📚 Active learning methods (like solving problems or teaching others) improve understanding by up to 75%.",
      "💡 Only 1 in 5 students regularly ask questions — yet those who do are 2x more likely to grasp complex concepts.",
      "🔁 Repetition spaced over time improves memory retention far better than cramming — up to 80% more effective.",
      "📖 Students who relate new information to real-life examples are 50% more likely to remember it.",
      "🧠 80% of students underestimate the power of consistent daily learning versus last-minute efforts.",
      "💬 Collaborative learners (study groups or peer teaching) perform 37% better in tests than solo learners.",
      "📅 Students who plan their week and set goals are 60% more efficient in completing assignments.",
      "🎯 Students who track their progress weekly are more likely to stay motivated and meet their academic targets.",
    ];
    setInterval(() => {
      const randomFact =
        studentAnalyticsFacts[
          Math.floor(Math.random() * studentAnalyticsFacts.length)
        ];
  
      document.getElementById("studentFact").innerText = randomFact;
    }, 2000);
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Vortex
          visible={true}
          height={80}
          width={80}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={[
            "red",
            "green",
            "blue",
            "yellow",
            "purple",
          ]}
        />
        <p id="studentFact"></p>
      </div>
    );
}

export default Loader
