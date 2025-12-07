/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { FaPlus, FaDownload, FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";

const ClassesManagement = () => {
  const [view, setView] = useState("analysis"); // or "listing"
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("className");
  const [sortDirection, setSortDirection] = useState("asc");
  const [classes, setClasses] = useState([
    { id: 1, className: "10th A", teacher: "Mr Shah", students: 30, status: "Active" },
    { id: 2, className: "9th B", teacher: "Ms Mehta", students: 28, status: "Active" },
    { id: 3, className: "8th C", teacher: "Mr Patel", students: 25, status: "Inactive" },
  ]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === "asc" ? (
      <FaSortUp className="text-blue-500" />
    ) : (
      <FaSortDown className="text-blue-500" />
    );
  };

  const filteredClasses = useMemo(() => {
    let filtered = classes.filter(c =>
      c.className.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a,b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortDirection === "asc") return aVal > bVal ? 1 : -1;
      else return aVal < bVal ? 1 : -1;
    });

    return filtered;
  }, [classes, searchTerm, sortField, sortDirection]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Classes Management
            </h1>
            <p className="text-gray-600 mt-1">Manage classes, teachers, and students</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition">
              <FaDownload className="inline mr-2" />
              Export
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition">
              <FaPlus className="inline mr-2" />
              Add Class
            </button>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex w-full gap-3">
          <button
            onClick={() => setView("analysis")}
            className={`w-1/2 px-5 py-3 rounded-lg font-medium transition-all duration-300 border ${
              view === "analysis"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Analysis
          </button>
          <button
            onClick={() => setView("listing")}
            className={`w-1/2 px-5 py-3 rounded-lg font-medium transition-all duration-300 border ${
              view === "listing"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Listing
          </button>
        </div>

        {/* Conditional Content */}
        {view === "analysis" ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Put whatever analytics you have for classes here */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Class Overview</h2>
            <p>Here you might show number of active classes, total students, teacher ratio, etc.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search class..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort("className")} className="flex items-center gap-1">
                        Class {getSortIcon("className")}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort("teacher")} className="flex items-center gap-1">
                        Teacher {getSortIcon("teacher")}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort("students")} className="flex items-center gap-1">
                        Students {getSortIcon("students")}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredClasses.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">{c.className}</td>
                      <td className="px-6 py-4">{c.teacher}</td>
                      <td className="px-6 py-4">{c.students}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          c.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesManagement;
