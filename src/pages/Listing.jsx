/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { MdKeyboardArrowDown, MdGridView, MdViewList, MdFilterList } from "react-icons/md";
// import { API } from "../API/API";
import { SendGETRequest } from "../services/SendGETRequest";
import axios from "axios";
import {
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaSchool,
} from "react-icons/fa";
import AddStudent from "../components/Modals/AddStudent";
import { FaFileExport, FaFileImport } from "react-icons/fa6";

const StudentTable = () => {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterClass, setFilterClass] = useState("");
  const [filterBoard, setFilterBoard] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openStudentForm, setOpenStudentForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- UI/UX & Brand Color ---
  const brand = "#2F7FFF";
  const brandLight = "#E6F0FF";
  const brandDark = "#1C5FCC";

  // --- Data logic (unchanged) ---
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.school.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = filterClass === "" || student.class === filterClass;
      const matchesBoard = filterBoard === "" || student.board === filterBoard;
      return matchesSearch && matchesClass && matchesBoard;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      if (sortField === "fees") {
        aValue = parseInt(aValue.replace(/[₹,]/g, ""));
        bValue = parseInt(bValue.replace(/[₹,]/g, ""));
      }
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    students,
    searchTerm,
    sortField,
    sortDirection,
    filterClass,
    filterBoard,
  ]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredAndSortedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(
        filteredAndSortedStudents.map((student) => student.id)
      );
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === "asc" ? (
      <FaSortUp style={{ color: brand }} />
    ) : (
      <FaSortDown style={{ color: brand }} />
    );
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    if (status === "Active") {
      return `${baseClasses} bg-green-50 text-green-700 border border-green-200`;
    } else {
      return `${baseClasses} bg-red-50 text-red-700 border border-red-200`;
    }
  };

  const ActionButton = ({ icon: Icon, color, onClick, tooltip }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg ${color} transition-all duration-200 hover:scale-105 group relative`}
      title={tooltip}
      style={{ outline: "none" }}
    >
      <Icon className="w-4 h-4" />
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        {tooltip}
      </span>
    </button>
  );

  // --- Mobile Optimized List ---
  const MobileList = ({ items }) => (
    <div className="block md:hidden bg-white rounded-xl shadow-md">
      {items.map((student, i) => (
        <div
          key={student.id}
          className="p-3 flex items-center justify-between gap-2"
          style={{
            borderBottom: i === items.length - 1 ? "none" : `1px solid ${brandLight}`,
          }}
        >
          {/* Avatar and status dot */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  student.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </div>
          </div>
          {/* Main info */}
          <div className="flex-1 min-w-0 ml-2">
            <div className="text-xs font-semibold text-gray-900 truncate">
              {student.name}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 truncate">
              <FaSchool className="inline mr-1 text-blue-400" />
              {student.class}, {student.board}
            </div>
          </div>
          {/* Fees */}
          <div className="flex flex-col items-end mr-2">
            <span className="text-xs font-bold" style={{ color: brand }}>
              {student.fees}
            </span>
            <span className="text-[10px] text-gray-400">Monthly</span>
          </div>
          {/* Actions */}
          <div className="flex gap-1">
            <button
              onClick={() => console.log("View", student.id)}
              className="p-1 rounded bg-blue-50 text-blue-700"
              aria-label="view"
            >
              <FaEye className="w-3 h-3" />
            </button>
            <button
              onClick={() => console.log("Edit", student.id)}
              className="p-1 rounded bg-yellow-50 text-yellow-700"
              aria-label="edit"
            >
              <FaEdit className="w-3 h-3" />
            </button>
            <button
              onClick={() => console.log("Delete", student.id)}
              className="p-1 rounded bg-red-50 text-red-700"
              aria-label="delete"
            >
              <FaTrash className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // --- Loading & Error States ---
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Students
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3"
            style={{
              background: brand,
              color: "#fff",
              borderRadius: "0.5rem",
              fontWeight: 600,
              transition: "background 0.2s",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
     
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {openStudentForm && (
          <AddStudent isOpen={openStudentForm} setIsOpen={setOpenStudentForm} />
        )}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  color: brand,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                }}
              >
                Students Management
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage and track all your students
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg shadow transition font-medium"
                style={{
                  background: "#FFF7E6",
                  color: "#B26A00",
                  border: "1px solid #FFE0B2",
                }}
              >
                <FaFileImport className="w-4 h-4" />
                Import
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg shadow transition font-medium"
                style={{
                  background: "#E6F9F0",
                  color: "#00875A",
                  border: "1px solid #B2F2DF",
                }}
              >
                <FaFileExport className="w-4 h-4" />
                Export
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg shadow transition font-medium"
                style={{
                  background: brand,
                  color: "#fff",
                  border: "none",
                }}
                onClick={() => setOpenStudentForm((prev) => !prev)}
              >
                <FaPlus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: brand }}
              />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 font-medium text-base tracking-tight placeholder-gray-400"
                style={{
                  borderColor: brandLight,
                  boxShadow: "none",
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                }}
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="appearance-none px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-medium text-base tracking-tight pr-8"
                  style={{
                    borderColor: brandLight,
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <option value="">All Classes</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MdKeyboardArrowDown className="w-5 h-5" />
                </span>
              </div>
              <div className="relative">
                <select
                  value={filterBoard}
                  onChange={(e) => setFilterBoard(e.target.value)}
                  className="appearance-none px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 font-medium text-base tracking-tight pr-8"
                  style={{
                    borderColor: brandLight,
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <option value="">All Boards</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                  <option value="IB">IB</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MdKeyboardArrowDown className="w-5 h-5" />
                </span>
              </div>
              {/* View Mode Toggle */}
              <div className="flex rounded-lg p-1" style={{ background: brandLight }}>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={
                    viewMode === "table"
                      ? { color: brand, border: `1px solid ${brand}` }
                      : {}
                  }
                  aria-label="Table View"
                >
                  <MdViewList className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={
                    viewMode === "grid"
                      ? { color: brand, border: `1px solid ${brand}` }
                      : {}
                  }
                  aria-label="Grid View"
                >
                  <MdGridView className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
            <div
              className="p-3 rounded-lg flex flex-col items-center justify-center"
              style={{
                background: brand,
                color: "#fff",
                minWidth: 0,
              }}
            >
              <FaUserGraduate className="w-7 h-7 mb-1" />
              <p className="text-[11px] opacity-80 font-medium">Total</p>
              <p className="text-base font-bold">{students.length}</p>
            </div>
            <div
              className="p-3 rounded-lg flex flex-col items-center justify-center"
              style={{
                background: "#E6F9F0",
                color: "#00875A",
                minWidth: 0,
              }}
            >
              <FaGraduationCap className="w-7 h-7 mb-1" />
              <p className="text-[11px] opacity-80 font-medium">Active</p>
              <p className="text-base font-bold">
                {students.filter((s) => s.status === "Active").length}
              </p>
            </div>
            <div
              className="p-3 rounded-lg flex flex-col items-center justify-center"
              style={{
                background: "#F3F0FF",
                color: "#6C47FF",
                minWidth: 0,
              }}
            >
              <FaSchool className="w-7 h-7 mb-1" />
              <p className="text-[11px] opacity-80 font-medium">Classes</p>
              <p className="text-base font-bold">4</p>
            </div>
            <div
              className="p-3 rounded-lg flex flex-col items-center justify-center"
              style={{
                background: "#FFF7E6",
                color: "#B26A00",
                minWidth: 0,
              }}
            >
              <MdFilterList className="w-7 h-7 mb-1" />
              <p className="text-[11px] opacity-80 font-medium">Filtered</p>
              <p className="text-base font-bold">
                {filteredAndSortedStudents.length}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {/* Desktop/Tablets: Table/Grid */}
          <div className="hidden md:block">
            {viewMode === "table" && filteredAndSortedStudents.length > 0 ? (
              <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead style={{ background: brandLight }}>
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedStudents.length ===
                            filteredAndSortedStudents.length
                          }
                          onChange={handleSelectAll}
                          className="rounded border-gray-300"
                          style={{ accentColor: brand }}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("name")}
                          className="flex items-center gap-1 hover:text-gray-700"
                        >
                          Student {getSortIcon("name")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("class")}
                          className="flex items-center gap-1 hover:text-gray-700"
                        >
                          Class {getSortIcon("class")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("fees")}
                          className="flex items-center gap-1 hover:text-gray-700"
                        >
                          Fees {getSortIcon("fees")}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredAndSortedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-[#F4F9FF] transition-colors duration-150"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                            className="rounded border-gray-300"
                            style={{ accentColor: brand }}
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {student.school}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.class}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.board}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-xs text-gray-900">
                            {student.email}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.phone}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium" style={{ color: brand }}>
                            {student.fees}
                          </div>
                          <div className="text-xs text-gray-500">Monthly</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={getStatusBadge(student.status)}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex gap-1">
                            <ActionButton
                              icon={FaEye}
                              color="bg-blue-50 text-blue-700 hover:bg-blue-100"
                              onClick={() => console.log("View", student.id)}
                              tooltip="View Details"
                            />
                            <ActionButton
                              icon={FaEdit}
                              color="bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                              onClick={() => console.log("Edit", student.id)}
                              tooltip="Edit Student"
                            />
                            <ActionButton
                              icon={FaTrash}
                              color="bg-red-50 text-red-700 hover:bg-red-100"
                              onClick={() => console.log("Delete", student.id)}
                              tooltip="Delete Student"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : viewMode === "grid" && filteredAndSortedStudents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <FaUserGraduate
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: brand + "33" }}
                />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No students found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => setOpenStudentForm(true)}
                  className="px-6 py-3 rounded-lg shadow transition-all duration-200"
                  style={{
                    background: brand,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  <FaPlus className="w-4 h-4 mr-2 inline" />
                  Add Your First Student
                </button>
              </div>
            )}
          </div>
          {/* Mobile: Compact List */}
          <MobileList items={filteredAndSortedStudents} />
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
