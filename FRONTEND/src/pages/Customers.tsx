import React, { useEffect } from "react";

const Customers: React.FC = () => {
  useEffect(() => {
    document.title = "Customers | NetBanking";
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-blue-700 mb-4">Customers</h1>
      <p className="text-gray-700 leading-relaxed">
        This section will display information related to bank customers. You can
        add customer lists, search functionality, and detailed profiles here.
      </p>
    </div>
  );
};

export default Customers;
