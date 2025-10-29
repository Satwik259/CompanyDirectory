import React from "react";
import { MapPin, Briefcase, Users } from "lucide-react";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-3 text-blue-700 tracking-tight">
        {company.name}
      </h2>

      <div className="space-y-2 text-gray-700">
        <p className="flex items-center gap-2">
          <Briefcase size={18} className="text-blue-500" />
          <span className="text-gray-800 font-medium">{company.industry}</span>
        </p>

        <p className="flex items-center gap-2">
          <MapPin size={18} className="text-green-500" />
          <span>{company.location}</span>
        </p>

        <p className="flex items-center gap-2">
          <Users size={18} className="text-purple-500" />
          <span>{company.employees} employees</span>
        </p>
      </div>

      <button className="mt-5 w-full py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors duration-300">
        View Details
      </button>
    </div>
  );
};

export default CompanyCard;
