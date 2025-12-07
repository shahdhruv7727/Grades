/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import StudentExport from "../components/Modals/Export";
import StudentImport from "../components/Modals/Import";
import AddStudent from "../components/Modals/AddStudent";

import { API } from "../API/API";
import { SendGETRequest } from "../services/SendGETRequest";
import {
  FaSearch,
  FaIcons,
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
  FaTimes,
} from "react-icons/fa";
import { MdGridView, MdViewList, MdFilterList } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl transform transition-all`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const StudentTable = () => {
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
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
  const [studentId, setStudentId] = useState("");

  // Modal states
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await SendGETRequest(API.Students);
        console.log("Fetched students:", response);

        // Validate response structure
        if (
          !response ||
          !response.data ||
          !Array.isArray(response.data.students)
        ) {
          console.error("Invalid response structure:", response);
          setError("Invalid data format received");
          return;
        }

        const transformed = response.data.students.map((student) => ({
          id: student._id,
          name: student.name,
          class: student.standard,
          board: student.board,
          school: student.school,
          email: student.parentEmail,
          phone: student.mobilePhone1,
          address: student.address,
          dateOfBirth: student.dateOfBirth,
          admissionDate: student.admissionDate,
          fees: student.fees,
          status: student.status,
          avatar:
            student.avatar ||
            `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face`,
        }));

        console.log("Transformed students:", transformed);
        setStudents(transformed);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setError(error.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // console.log("Students state:", students);

  // Handle student import
  const handleImportStudents = async (importedStudents) => {
    try {
      // Here you would typically send the imported students to your API
      // For now, we'll just add them to the local state
      const newStudents = importedStudents.map((student, index) => ({
        id: `temp_${Date.now()}_${index}`, // Temporary ID
        name: student.name,
        class: student.standard,
        board: student.board,
        school: student.school,
        email: student.email,
        phone: student.mobilePhone1,
        address: student.address,
        dateOfBirth: student.dateOfBirth,
        fees: student.fees || "₹0",
        status: student.status,
        avatar:
          student.avatar ||
          `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face`,
      }));

      setStudents((prev) => [...prev, ...newStudents]);

      // Close modal after successful import
      setTimeout(() => {
        setShowImportModal(false);
      }, 2000);

      // You would implement API call here:
      // await SendPOSTRequest(API.BulkImportStudents, { students: importedStudents });
    } catch (error) {
      console.error("Import failed:", error);
      throw new Error("Failed to import students");
    }
  };

  // Handle export callback
  const handleExportComplete = (exportedCount) => {
    console.log(`Successfully exported ${exportedCount} students`);
    const students = SendGETRequest(API.ExportStudent);
    console.log("Student Exported:-", students);
    setIsExporting(false);
    // Close modal after successful export
    setTimeout(() => {
      setShowExportModal(false);
    }, 1500);
  };

  const handleGetByID = async (id) => {
    try {
      // ✅ Correct → pass the id from the function argument
      const response = await SendGETRequest(API.StudentById(id));

      console.log(
        "Student with this given id was fetched successfully:",
        response
      );
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Error fetching student");
    }
  };

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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Error loading students
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

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
              <button
                onClick={() => setShowImportModal(true)}
                className="group relative w-max overflow-hidden bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-700 to-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2 h-[17px]">
                  <FaIcons className="w-4 h-4" />
                  Import
                </div>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="group relative w-max overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
              >
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

        {/* Students Table or Grid */}
        {filteredAndSortedStudents.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            No students found.
          </div>
        ) : viewMode === "table" ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedStudents.length ===
                          filteredAndSortedStudents.length &&
                        filteredAndSortedStudents.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name {getSortIcon("name")}
                  </th>
                  <th
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort("class")}
                  >
                    Class {getSortIcon("class")}
                  </th>
                  <th
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort("board")}
                  >
                    Board {getSortIcon("board")}
                  </th>
                  <th className="px-4 py-3">School</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Address</th>
                  <th
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort("fees")}
                  >
                    Fees {getSortIcon("fees")}
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAndSortedStudents.map((student) => (
                  <tr
                    key={students.id}
                    onClick={() => {
                      console.log("Clicked student ID:", student.id); // 👈 log here
                      handleGetByID(student.id);
                    }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                      <span className="font-medium text-gray-800">
                        {student.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">{student.class}</td>
                    <td className="px-4 py-3">{student.board}</td>
                    <td className="px-4 py-3">{student.school}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3">{student.phone}</td>
                    <td className="px-4 py-3">{student.address}</td>
                    <td className="px-4 py-3">{student.fees}</td>
                    <td className="px-4 py-3">
                      <span className={getStatusBadge(student.status)}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-1">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>

      {/* Import Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Students"
        size="lg"
      >
        <StudentImport onImport={handleImportStudents} />
      </Modal>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Students"
        size="md"
      >
        <StudentExport
          students={students}
          isExporting={isExporting}
          onExport={handleExportComplete}
        />
      </Modal>

      {/* Add Student Modal */}
      {openStudentForm && (
        <AddStudent
          isOpen={openStudentForm}
          onClose={() => setOpenStudentForm(false)}
          onStudentAdded={(newStudent) => {
            setStudents((prev) => [
              ...prev,
              {
                ...newStudent,
                id: `temp_${Date.now()}`,
                avatar:
                  newStudent.avatar ||
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
              },
            ]);
            setOpenStudentForm(false);
          }}
        />
      )}
    </div>
  );
};

export default StudentTable;
