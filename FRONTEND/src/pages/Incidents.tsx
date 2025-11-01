import React, { useEffect } from "react";

const Incidents: React.FC = () => {
  useEffect(() => {
    document.title = "Incidents | NetBanking";
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-blue-700 mb-4">Incidents</h1>
      <p className="text-gray-700 leading-relaxed">
        The Incidents page is where you can display or track operational or
        customer-related incidents.
      </p>
      <div className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
        <p className="text-gray-600 italic">
          You can later integrate a table or chart to show incident reports and
          resolutions here.
        </p>
      </div>
    </div>
  );
};

export default Incidents;
