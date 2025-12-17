
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, MoreVertical, Upload, Calendar, X, ArrowRight } from 'lucide-react';
import {assets} from '../assets/assets'; 

const BACKEND_ROUTE = 'http://localhost:5000/api/teachers';

// Sample subjects data - replace with your API call
const AVAILABLE_SUBJECTS = [
  { id: 1, name: 'Math - Grade 6' },
  { id: 2, name: 'Science - Grade 8' },
  { id: 3, name: 'Art - Grade 7-a' },
  { id: 4, name: 'History - Grade 9' },
  { id: 5, name: 'Chemistry - Grade 6' },
  { id: 6, name: 'Physics - Grade 10' },
  { id: 7, name: 'English - Grade 8' },
  { id: 8, name: 'Biology - Grade 9' },
];

const API = {
  teachers: {
    getAll: () => fetch(`${BACKEND_ROUTE}`).then(res => res.json()),
    getById: (id) => fetch(`${BACKEND_ROUTE}/${id}`).then(res => res.json()),
    create: (data) => fetch(`${BACKEND_ROUTE}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id, data) => fetch(`${BACKEND_ROUTE}/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id) => fetch(`${BACKEND_ROUTE}/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }
};

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showProfileView, setShowProfileView] = useState(false);
  const [viewingTeacher, setViewingTeacher] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [subjectSearchTerm, setSubjectSearchTerm] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [profileSubjectSearch, setProfileSubjectSearch] = useState('');
  const [profileSelectedSubjects, setProfileSelectedSubjects] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    teacherId: '',
    department: '',
    qualification: '',
    dateJoined: '',
    status: '',
    profilePicture: null
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await API.teachers.getAll();
      setTeachers(data);
      
      const subjectsMap = {};
      data.forEach(teacher => {
        if (teacher.assignedSubjects && Array.isArray(teacher.assignedSubjects)) {
          subjectsMap[teacher._id] = teacher.assignedSubjects;
        }
      });
      setTeacherSubjects(subjectsMap);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        teacherId: formData.teacherId,
        department: formData.department,
        qualification: formData.qualification,
        dateJoined: formData.dateJoined,
        status: formData.status,
        profilePicture: formData.profilePicture
      };

      if (selectedTeacher) {
        await API.teachers.update(selectedTeacher._id, dataToSubmit);
      } else {
        await API.teachers.create(dataToSubmit);
      }
      fetchTeachers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving teacher:', error);
      alert('Error saving teacher. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await API.teachers.delete(id);
        setTeacherSubjects(prev => {
          const newSubjects = { ...prev };
          delete newSubjects[id];
          return newSubjects;
        });
        fetchTeachers();
        if (showProfileView) {
          setShowProfileView(false);
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Error deleting teacher. Please try again.');
      }
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      email: teacher.email || '',
      phoneNumber: teacher.phoneNumber || '',
      dateOfBirth: teacher.dateOfBirth ? teacher.dateOfBirth.split('T')[0] : '',
      gender: teacher.gender || '',
      address: teacher.address || '',
      teacherId: teacher.teacherId || '',
      department: teacher.department || '',
      qualification: teacher.qualification || '',
      dateJoined: teacher.dateJoined ? teacher.dateJoined.split('T')[0] : '',
      status: teacher.status || '',
      profilePicture: null
    });
    setImagePreview(teacher.profilePicture || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      teacherId: '',
      department: '',
      qualification: '',
      dateJoined: '',
      status: '',
      profilePicture: null
    });
    setImagePreview(null);
  };

  const handleViewProfile = (teacher) => {
    setViewingTeacher(teacher);
    setShowProfileView(true);
    setActiveTab('overview');
  };

  const handleCloseProfileView = () => {
    setShowProfileView(false);
    setViewingTeacher(null);
    setActiveTab('overview');
  };

  const handleAssignSubject = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDropdown(null);
    const currentSubjects = teacherSubjects[teacher._id] || [];
    setAssignedSubjects(currentSubjects);
    setSelectedSubjects([]);
    setSubjectSearchTerm('');
    setShowAssignModal(true);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedTeacher(null);
    setSelectedSubjects([]);
    setAssignedSubjects([]);
    setSubjectSearchTerm('');
  };

  const toggleSubjectSelection = (subject) => {
    setSelectedSubjects(prev => {
      const isSelected = prev.find(s => s.id === subject.id);
      if (isSelected) {
        return prev.filter(s => s.id !== subject.id);
      } else {
        return [...prev, subject];
      }
    });
  };

  const handleAddSelectedSubjects = () => {
    setAssignedSubjects(prev => {
      const newSubjects = selectedSubjects.filter(
        newSub => !prev.find(existing => existing.id === newSub.id)
      );
      return [...prev, ...newSubjects];
    });
    setSelectedSubjects([]);
  };

  const handleRemoveAssignedSubject = (subjectId) => {
    setAssignedSubjects(prev => prev.filter(s => s.id !== subjectId));
  };

 const handleSaveAssignments = async () => {
  try {
    await API.teachers.update(selectedTeacher._id, {
      assignedSubjects: assignedSubjects
    });

    // Update UI
    setTeacherSubjects(prev => ({
      ...prev,
      [selectedTeacher._id]: assignedSubjects
    }));

    alert("Subjects saved successfully!");
    handleCloseAssignModal();
    fetchTeachers(); // refresh list from DB
  } catch (error) {
    console.error("Error saving assigned subjects:", error);
    alert("Failed to save subjects.");
  }
};


  // Profile tab subject handlers
  const toggleProfileSubjectSelection = (subject) => {
    setProfileSelectedSubjects(prev => {
      const isSelected = prev.find(s => s.id === subject.id);
      if (isSelected) {
        return prev.filter(s => s.id !== subject.id);
      } else {
        return [...prev, subject];
      }
    });
  };

  const handleProfileAddSubjects = () => {
    const currentSubjects = teacherSubjects[viewingTeacher._id] || [];
    const newSubjects = profileSelectedSubjects.filter(
      newSub => !currentSubjects.find(existing => existing.id === newSub.id)
    );
    
    setTeacherSubjects(prev => ({
      ...prev,
      [viewingTeacher._id]: [...currentSubjects, ...newSubjects]
    }));
    
    setProfileSelectedSubjects([]);
  };

  const handleProfileRemoveSubject = (subjectId) => {
    setTeacherSubjects(prev => ({
      ...prev,
      [viewingTeacher._id]: (prev[viewingTeacher._id] || []).filter(s => s.id !== subjectId)
    }));
  };

  const handleProfileSaveAssignments = async () => {
  const subjects = teacherSubjects[viewingTeacher._id] || [];

  await API.teachers.update(viewingTeacher._id, {
    assignedSubjects: subjects
  });

  alert("Assignments updated!");
};


  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableSubjects = AVAILABLE_SUBJECTS.filter(subject =>
    subject.name.toLowerCase().includes(subjectSearchTerm.toLowerCase()) &&
    !assignedSubjects.find(assigned => assigned.id === subject.id)
  );

  const filteredProfileAvailableSubjects = AVAILABLE_SUBJECTS.filter(subject =>
    subject.name.toLowerCase().includes(profileSubjectSearch.toLowerCase()) &&
    !(teacherSubjects[viewingTeacher?._id] || []).find(assigned => assigned.id === subject.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {showProfileView && viewingTeacher ? (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-blue-600">Teachers</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </div>
          </div>

          <button 
            onClick={handleCloseProfileView}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-8 hover:bg-blue-700"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="bg-white rounded-2xl p-8 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <img
                  src={assets.file}
                  alt="avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {viewingTeacher.firstName} {viewingTeacher.lastName}
                  </h2>
                  <p className="text-gray-600 mb-1">{viewingTeacher.department}</p>
                  <p className="text-gray-500 text-sm">Teacher ID: {viewingTeacher.teacherId}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleEdit(viewingTeacher);
                    setShowProfileView(false);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(viewingTeacher._id)}
                  className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-6">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`pb-4 border-b-2 font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('subject')}
              className={`pb-4 border-b-2 font-medium transition-colors ${
                activeTab === 'subject' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Subject
            </button>
            <button 
              onClick={() => setActiveTab('attendance')}
              className={`pb-4 border-b-2 font-medium transition-colors ${
                activeTab === 'attendance' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Attendance
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              <div className="bg-white rounded-2xl p-8 mb-6">
                <h3 className="text-xl font-bold mb-6">Personal Details</h3>
                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                  <div>
                    <span className="font-semibold">Date of Birth:</span>{' '}
                    <span className="text-gray-600">
                      {viewingTeacher.dateOfBirth ? new Date(viewingTeacher.dateOfBirth).toLocaleDateString('en-GB') : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Gender:</span>{' '}
                    <span className="text-gray-600">{viewingTeacher.gender || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Employee Status:</span>{' '}
                    <span className="text-gray-600">{viewingTeacher.status || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Date Joined:</span>{' '}
                    <span className="text-gray-600">
                      {viewingTeacher.dateJoined ? new Date(viewingTeacher.dateJoined).toLocaleDateString('en-GB') : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 mb-6">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold">E-mail:</span>{' '}
                    <span className="text-gray-600">{viewingTeacher.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{' '}
                    <span className="text-gray-600">{viewingTeacher.phoneNumber || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Address:</span>{' '}
                    <span className="text-gray-600">{viewingTeacher.address || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Qualification</h3>
                <div className="flex gap-3 flex-wrap">
                  {viewingTeacher.qualification ? (
                    viewingTeacher.qualification.split(',').map((qual, idx) => (
                      <span
                        key={idx}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-medium"
                      >
                        {qual.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-600">No qualifications listed</span>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'subject' && (
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Assign Subject</h2>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Available Subjects */}
                <div className="border-2 border-gray-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Available Subjects</h3>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search Available Subjects"
                      value={profileSubjectSearch}
                      onChange={(e) => setProfileSubjectSearch(e.target.value)}
                      className="relative w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredProfileAvailableSubjects.map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={profileSelectedSubjects.find(s => s.id === subject.id) !== undefined}
                          onChange={() => toggleProfileSubjectSelection(subject)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="font-medium text-gray-800">{subject.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Assigned Subjects */}
                <div className="border-2 border-gray-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Assigned Subjects</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto min-h-[200px]">
                    {(teacherSubjects[viewingTeacher._id] || []).length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No subjects assigned yet</p>
                    ) : (
                      (teacherSubjects[viewingTeacher._id] || []).map((subject) => (
                        <div
                          key={subject.id}
                          className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-800">{subject.name}</span>
                          <button
                            onClick={() => handleProfileRemoveSubject(subject.id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Assign Button */}
              <div className="flex justify-center my-6">
                <button
                  onClick={handleProfileAddSubjects}
                  disabled={profileSelectedSubjects.length === 0}
                  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${
                    profileSelectedSubjects.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <span>Assign</span>
                  <ArrowRight size={20} />
                </button>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={handleProfileSaveAssignments}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save Assignments
                </button>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Attendance</h3>
              <p className="text-gray-600">Attendance tracking coming soon...</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={20} />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              <Plus size={20} />
              <span>Add New Teacher</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => {
              const subjects = teacherSubjects[teacher._id] || [];
              
              return (
                <div key={teacher._id} className="bg-white rounded-2xl border-2 border-gray-900 overflow-visible relative">
                  <img
                    src={assets.file}
                    alt="avatar"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-xl mb-1">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{teacher.department}</p>
                    {subjects.length > 0 ? (
                      <div className="mb-4 p-2 bg-blue-50 rounded">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Assigned Subjects:</p>
                        <p className="text-xs text-blue-600 font-medium">
                          {subjects.map(item => item.name).join(', ')}
                        </p>
                      </div>
                    ) : (
                      <div className="mb-4 p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">No subjects assigned</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewProfile(teacher)}
                        className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        View Profile
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setShowDropdown(showDropdown === teacher._id ? null : teacher._id)}
                          className="p-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg"
                        >
                          <MoreVertical size={20} />
                        </button>
                        {showDropdown === teacher._id && (
                          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                            <button
                              onClick={() => {
                                handleEdit(teacher);
                                setShowDropdown(null);
                              }}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-sm flex items-center gap-2 rounded-t-lg"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleAssignSubject(teacher)}
                              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-sm flex items-center gap-2"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                              </svg>
                              Assign Subject
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(teacher._id);
                                setShowDropdown(null);
                              }}
                              className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-gray-50 text-sm flex items-center gap-2 rounded-b-lg"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Add/Edit Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
              </h2>
              <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Name</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Add 10 - Digit Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Male / Female / Other</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher ID</label>
                  <input
                    type="text"
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleInputChange}
                    placeholder="Teacher ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Department"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="e.g., Master's in Mathematics, Advanced Calculus Certification"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Joined</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateJoined"
                      value={formData.dateJoined}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Full time / Part time</option>
                    <option value="Full time">Full time</option>
                    <option value="Part time">Part time</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedTeacher ? 'Update Teacher' : 'Add Teacher'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Subjects Modal */}
      {showAssignModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6">
              <h2 className="text-3xl font-bold mb-4">Assign Subjects</h2>
              <div className="flex items-center gap-4">
                <img
                 src={assets.file}
                  alt={`${selectedTeacher.firstName} ${selectedTeacher.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedTeacher.firstName} {selectedTeacher.lastName}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Available Subjects */}
                <div className="border-2 border-gray-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Available Subjects</h3>
                  <div className=" mb-4">
                    {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /> */}
                    <input
                      type="text"
                      placeholder="Search Available Subjects"
                      value={subjectSearchTerm}
                      onChange={(e) => setSubjectSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredAvailableSubjects.map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubjects.find(s => s.id === subject.id) !== undefined}
                          onChange={() => toggleSubjectSelection(subject)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="font-medium text-gray-800">{subject.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Assigned Subjects */}
                <div className="border-2 border-gray-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Assigned Subjects</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto min-h-[200px]">
                    {assignedSubjects.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No subjects assigned yet</p>
                    ) : (
                      assignedSubjects.map((subject) => (
                        <div
                          key={subject.id}
                          className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-800">{subject.name}</span>
                          <button
                            onClick={() => handleRemoveAssignedSubject(subject.id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <div className="flex justify-center my-6">
                <button
                  onClick={handleAddSelectedSubjects}
                  disabled={selectedSubjects.length === 0}
                  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors ${
                    selectedSubjects.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <span>Click to Add</span>
                  <ArrowRight size={20} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseAssignModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignments}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}