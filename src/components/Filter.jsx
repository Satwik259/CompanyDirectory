import React from "react";
import { Search, Filter as FilterIcon } from "lucide-react";

const Filters = ({
  search,
  handleSearch,
  industry,
  handleIndustry,
  companies,
  sort,
  handleSort,
  pageSize,
  handlePageSize
}) => {
  const industries = [...new Set(companies.map((c) => c.industry))];

  return (
    <div className="w-full max-w-5xl mx-auto mb-6 bg-white shadow-md rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 border border-gray-100">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="relative w-full md:w-1/5">
        <FilterIcon className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <select
  value={industry}
  onChange={handleIndustry}
  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-700 cursor-pointer"
>
  <option value="">All Industries</option>
  {industries.map((ind, index) => (
    <option key={`${ind}-${index}`} value={ind}>
      {ind}
    </option>
  ))}
</select>

      </div>

      <div className="w-full md:w-1/5">
        <select
          value={sort}
          onChange={handleSort}
          className="px-3 py-2 w-full border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 cursor-pointer"
        >
          <option value="name-asc">Name (A → Z)</option>
          <option value="name-desc">Name (Z → A)</option>
          <option value="emp-asc">Employees (Low → High)</option>
          <option value="emp-desc">Employees (High → Low)</option>
        </select>
      </div>

      <div className="w-full md:w-1/6">
        <select
          value={pageSize}
          onChange={handlePageSize}
          className="px-3 py-2 w-full border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 cursor-pointer"
        >
          {[6, 9, 12, 18].map(n => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
