/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaPlus,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserGraduate,
  FaSchool,
} from "react-icons/fa";
import { MdGridView, MdViewList, MdFilterList } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import AddStudent from "../components/Modals/AddStudent";

const StudentTable = () => {
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterClass, setFilterClass] = useState("");
  const [filterBoard, setFilterBoard] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openStudentForm, setOpenStudentForm] = useState(false);

  // Sample student data
  const [students] = useState([
    {
      id: 1,
      name: "Aarav Patel",
      class: "10th",
      board: "CBSE",
      school: "Delhi Public School",
      email: "aarav.patel@email.com",
      phone: "+91 98765 43210",
      address: "Ahmedabad, Gujarat",
      dateOfBirth: "2008-03-15",
      fees: "₹15,000",
      status: "Active",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Priya Sharma",
      class: "9th",
      board: "ICSE",
      school: "Ryan International School",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      address: "Mumbai, Maharashtra",
      dateOfBirth: "2009-07-22",
      fees: "₹12,000",
      status: "Active",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Arjun Singh",
      class: "8th",
      board: "State Board",
      school: "Kendriya Vidyalaya",
      email: "arjun.singh@email.com",
      phone: "+91 76543 21098",
      address: "Pune, Maharashtra",
      dateOfBirth: "2010-11-08",
      fees: "₹8,000",
      status: "Inactive",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      class: "10th",
      board: "CBSE",
      school: "DPS International",
      email: "sneha.gupta@email.com",
      phone: "+91 65432 10987",
      address: "Bangalore, Karnataka",
      dateOfBirth: "2008-05-12",
      fees: "₹18,000",
      status: "Active",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      class: "7th",
      board: "IB",
      school: "International School",
      email: "vikram.mehta@email.com",
      phone: "+91 54321 09876",
      address: "Chennai, Tamil Nadu",
      dateOfBirth: "2011-09-30",
      fees: "₹25,000",
      status: "Active",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Ananya Desai",
      class: "9th",
      board: "CBSE",
      school: "Zydus School",
      email: "ananya.desai@email.com",
      phone: "+91 43210 98765",
      address: "Ahmedabad, Gujarat",
      dateOfBirth: "2009-01-18",
      fees: "₹14,000",
      status: "Active",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
  ]);

  // Filter and sort students
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
      <FaSortUp className="text-blue-500" />
    ) : (
      <FaSortDown className="text-blue-500" />
    );
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    if (status === "Active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  const ActionButton = ({ icon: Icon, color, onClick, tooltip }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg ${color} transition-all duration-200 hover:scale-110 group relative`}
      title={tooltip}
    >
      <Icon className="w-4 h-4" />
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {tooltip}
      </span>
    </button>
  );

  const StudentCard = ({ student }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  student.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{student.name}</h3>
              <p className="text-sm text-gray-500">
                {student.class} • {student.board}
              </p>
            </div>
          </div>
          <div className={getStatusBadge(student.status)}>{student.status}</div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaSchool className="text-blue-500" />
            {student.school}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaEnvelope className="text-green-500" />
            {student.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaPhone className="text-purple-500" />
            {student.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-red-500" />
            {student.address}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-lg font-semibold text-blue-600">
            {student.fees} Fee
          </div>
          <div className="flex gap-1">
            <ActionButton
              icon={FaEye}
              color="bg-blue-100 text-blue-600 hover:bg-blue-200"
              onClick={() => console.log("View", student.id)}
              tooltip="View Details"
            />
            <ActionButton
              icon={FaEdit}
              color="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              onClick={() => console.log("Edit", student.id)}
              tooltip="Edit Student"
            />
            <ActionButton
              icon={FaTrash}
              color="bg-red-100 text-red-600 hover:bg-red-200"
              onClick={() => console.log("Delete", student.id)}
              tooltip="Delete Student"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {openStudentForm && (
          <AddStudent isOpen={openStudentForm} setIsOpen={setOpenStudentForm} />
        )}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Students Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all your students
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="group relative w-max overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2 h-[17px]">
                  <FaDownload className="w-4 h-4" />
                   Export
                </div>
              </button>
              <button
                className="group relative w-max overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
                onClick={() => setOpenStudentForm((prev) => !prev)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2 h-[17px]">
                  <FaPlus className="text-sm" />
                  Add Student
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Classes</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>

              <select
                value={filterBoard}
                onChange={(e) => setFilterBoard(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Boards</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="IB">IB</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <MdViewList className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <MdGridView className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
                <FaUserGraduate className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Students</p>
                  <p className="text-2xl font-bold">
                    {students.filter((s) => s.status === "Active").length}
                  </p>
                </div>
                <FaGraduationCap className="w-8 h-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Classes</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <FaSchool className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Filtered Results</p>
                  <p className="text-2xl font-bold">
                    {filteredAndSortedStudents.length}
                  </p>
                </div>
                <MdFilterList className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === "table" && filteredAndSortedStudents.length ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedStudents.length ===
                          filteredAndSortedStudents.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-1 hover:text-gray-700"
                      >
                        Student {getSortIcon("name")}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("class")}
                        className="flex items-center gap-1 hover:text-gray-700"
                      >
                        Class {getSortIcon("class")}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("fees")}
                        className="flex items-center gap-1 hover:text-gray-700"
                      >
                        Fees {getSortIcon("fees")}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                            <div className="text-sm text-gray-500">
                              {student.school}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.class}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.board}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.fees}
                        </div>
                        <div className="text-sm text-gray-500">Monthly</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(student.status)}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1">
                          <ActionButton
                            icon={FaEye}
                            color="bg-blue-100 text-blue-600 hover:bg-blue-200"
                            onClick={() => console.log("View", student.id)}
                            tooltip="View Details"
                          />
                          <ActionButton
                            icon={FaEdit}
                            color="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            onClick={() => console.log("Edit", student.id)}
                            tooltip="Edit Student"
                          />
                          <ActionButton
                            icon={FaTrash}
                            color="bg-red-100 text-red-600 hover:bg-red-200"
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedStudents.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaUserGraduate className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No students found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
              <FaPlus className="w-4 h-4 mr-2 inline" />
              Add Your First Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTable;
