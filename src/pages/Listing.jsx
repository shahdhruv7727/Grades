/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { MdKeyboardArrowDown, MdGridView, MdViewList, MdFilterList } from "react-icons/md";
import { FaFileExport, FaFileImport } from "react-icons/fa6";
import StudentImport from "../components/Modals/Import";
import StudentExport from "../components/Modals/Export";
import AddStudent from "../components/Modals/AddStudent";

import { API } from "../API/API";
import { SendGETRequest } from "../services/SendGETRequest";
import axios from "axios";
import {
  FaEdit,
  FaEnvelope,
  FaEye,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaPlus,
  FaSchool,
  FaSearch,
  FaIcons,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaTrash,
  FaUserGraduate,
  FaTimes,
  FaDownload,
} from "react-icons/fa";

const brand = "#3B82F6";
const brandLight = "#DBEAFE";

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
  const [studentId, setStudentId] = useState("");

  // Modal states
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const addModalWasOpen = useRef(false);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await SendGETRequest(API.Students);
      if (!response || !response.data || !Array.isArray(response.data.students)) {
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

      setStudents(transformed);
    } catch (err) {
      setError(err.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (!openStudentForm && addModalWasOpen.current) {
      fetchStudents();
    }
    addModalWasOpen.current = openStudentForm;
  }, [openStudentForm, fetchStudents]);

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

  const handleEditSave = (updatedStudent) => {
    setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
  };

  const handleDeleteConfirm = async () => {
    if (!deleteStudent) return;
    setDeleteLoading(true);
    try {
      await axios.delete(API.deleteStudent(deleteStudent.id));
      setStudents((prev) => prev.filter((s) => s.id !== deleteStudent.id));
      setDeleteStudent(null);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to delete student");
    } finally {
      setDeleteLoading(false);
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
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
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
              onClick={() => setViewStudent(student)}
              className="p-1 rounded bg-blue-50 text-blue-700"
              aria-label="view"
            >
              <FaEye className="w-3 h-3" />
            </button>
            <button
              onClick={() => setEditStudent(student)}
              className="p-1 rounded bg-yellow-50 text-yellow-700"
              aria-label="edit"
            >
              <FaEdit className="w-3 h-3" />
            </button>
            <button
              onClick={() => setDeleteStudent(student)}
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

  const StudentCard = ({ student }) => (
    <div className="bg-white rounded-xl shadow p-5 space-y-4 border border-gray-100">
      <div className="flex items-center gap-3">
        <img
          src={student.avatar}
          alt={student.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
        />
        <div>
          <div className="font-semibold text-gray-900">{student.name}</div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <FaSchool />
            {student.school || "-"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2"><FaGraduationCap className="text-blue-500" />{student.class || "-"}</div>
        <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" />{student.board || "-"}</div>
        <div className="flex items-center gap-2"><FaEnvelope className="text-blue-500" />{student.email || "-"}</div>
        <div className="flex items-center gap-2"><FaPhone className="text-blue-500" />{student.phone || "-"}</div>
      </div>

      <div className="flex items-center justify-between">
        <span className={getStatusBadge(student.status)}>{student.status}</span>
        <div className="flex gap-1">
          <ActionButton
            icon={FaEye}
            color="bg-blue-100 text-blue-600 hover:bg-blue-200"
            onClick={() => setViewStudent(student)}
            tooltip="View"
          />
          <ActionButton
            icon={FaEdit}
            color="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
            onClick={() => setEditStudent(student)}
            tooltip="Edit"
          />
          <ActionButton
            icon={FaTrash}
            color="bg-red-100 text-red-600 hover:bg-red-200"
            onClick={() => setDeleteStudent(student)}
            tooltip="Delete"
          />
        </div>
      </div>
    </div>
  );

  const EditStudentModal = ({ student, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: student?.name || "",
      standard: student?.class || "",
      board: student?.board || "",
      school: student?.school || "",
      parentEmail: student?.email || "",
      mobilePhone1: student?.phone || "",
      address: student?.address || "",
      fees: student?.fees || "",
      status: student?.status || "Active",
    });
    const [saving, setSaving] = useState(false);
    const [localError, setLocalError] = useState("");

    if (!student) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      setLocalError("");
      try {
        await axios.patch(API.updateStudent(student.id), formData);
        onSave({
          ...student,
          name: formData.name,
          class: formData.standard,
          board: formData.board,
          school: formData.school,
          email: formData.parentEmail,
          phone: formData.mobilePhone1,
          address: formData.address,
          fees: formData.fees,
          status: formData.status,
        });
        onClose();
      } catch (err) {
        setLocalError(err.response?.data?.msg || "Failed to update student");
      } finally {
        setSaving(false);
      }
    };

    return (
      <Modal isOpen={!!student} onClose={onClose} title="Edit Student" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {localError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{localError}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <input
                type="text"
                value={formData.standard}
                onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
              <input
                type="text"
                value={formData.board}
                onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.parentEmail}
                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.mobilePhone1}
                onChange={(e) => setFormData({ ...formData, mobilePhone1: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
              <input
                type="text"
                value={formData.fees}
                onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  const ViewStudentModal = ({ student, onClose }) => {
    if (!student) return null;
    return (
      <Modal isOpen={!!student} onClose={onClose} title="Student Details" size="lg">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/20"
            />
            <div>
              <div className="text-xl font-semibold text-gray-900">{student.name}</div>
              <span className={getStatusBadge(student.status)}>{student.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <div><strong>Class:</strong> {student.class || "-"}</div>
            <div><strong>Board:</strong> {student.board || "-"}</div>
            <div><strong>School:</strong> {student.school || "-"}</div>
            <div><strong>Fees:</strong> {student.fees || "-"}</div>
            <div><strong>Email:</strong> {student.email || "-"}</div>
            <div><strong>Phone:</strong> {student.phone || "-"}</div>
            <div className="md:col-span-2"><strong>Address:</strong> {student.address || "-"}</div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const DeleteConfirmModal = ({ student, onClose, onConfirm, loading }) => {
    if (!student) return null;
    return (
      <Modal isOpen={!!student} onClose={onClose} title="Delete Student" size="sm">
        <div className="space-y-4">
          <p className="text-gray-700">Are you sure you want to delete <strong>{student.name}</strong>?</p>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200" disabled={loading}>Cancel</button>
            <button onClick={onConfirm} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">{loading ? "Deleting..." : "Delete"}</button>
          </div>
        </div>
      </Modal>
    );
  };

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
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
     
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
                    key={student.id}
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
                        onClick={() => setViewStudent(student)}
                        tooltip="View Details"
                      />
                      <ActionButton
                        icon={FaEdit}
                        color="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        onClick={() => setEditStudent(student)}
                        tooltip="Edit Student"
                      />
                      <ActionButton
                        icon={FaTrash}
                        color="bg-red-100 text-red-600 hover:bg-red-200"
                        onClick={() => setDeleteStudent(student)}
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

      {viewStudent && (
        <ViewStudentModal student={viewStudent} onClose={() => setViewStudent(null)} />
      )}

      {deleteStudent && (
        <DeleteConfirmModal
          student={deleteStudent}
          onClose={() => setDeleteStudent(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      )}

      {/* Add/Edit Student Modal */}
      {(openStudentForm || editStudent) && (
        <AddStudent 
          isOpen={openStudentForm || !!editStudent} 
          setIsOpen={(value) => {
            setOpenStudentForm(value);
            if (!value) setEditStudent(null);
          }} 
          studentData={editStudent}
          onUpdate={handleEditSave}
        />
      )}
    </div>
  );
};

export default StudentTable;

