import React, { useEffect } from "react";

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About | NetBanking";
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-blue-700 mb-4">About</h1>
      <p className="text-gray-700 leading-relaxed">
        This is the About section of the NetBanking application.
      </p>
      <p className="mt-3 text-gray-600">
        Built with <span className="font-medium text-blue-600">React</span> and{" "}
        <span className="font-medium text-teal-600">Tailwind CSS</span>.
      </p>
    </div>
  );
};

export default About;
