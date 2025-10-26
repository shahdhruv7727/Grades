import React from "react";
import { useParams, Link } from "react-router-dom";
import { CLASSES } from "../data/classes";
import { ArrowLeft, User, Users, Pencil, UserPlus, Trash2 } from "lucide-react";

// A small, reusable component for the statistic cards at the top.
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
    <div className={`rounded-full p-3 ${color}`}>
      <Icon className="text-white w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function ClassDetailsPage() {
  // This hook gets the `:classId` from the URL (e.g., "12-A").
  const { classId } = useParams();
  const classData = CLASSES.find((c) => c.id === classId);

  // Calculate stats. `useMemo` prevents recalculating on every render.
  const stats = React.useMemo(() => {
    if (!classData?.students) return { boys: 0, girls: 0, total: 0 };
    const boys = classData.students.filter((s) => s.gender === "Male").length;
    const girls = classData.students.filter((s) => s.gender === "Female").length;
    return {
      boys,
      girls,
      total: classData.students.length,
    };
  }, [classData]);

  // Show a message if the class ID from the URL is not found.
  if (!classData) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Class Not Found</h2>
        <Link to="/classes" className="text-blue-600 hover:underline mt-4 inline-block">
          Click here to go back to the classes list
        </Link>
      </div>
    );
  }

  // Placeholder functions for the admin buttons.
  const handleEdit = () => alert(`Editing ${classData.name}`);
  const handleAddStudent = () => alert(`Adding a student to ${classData.name}`);
  const handleDelete = () => {
    // Using window.confirm shows a simple confirmation pop-up.
    if (window.confirm(`Are you sure you want to delete ${classData.name}?`)) {
      alert(`${classData.name} has been deleted.`);
      // In a real app, you would add logic here to remove the class and redirect.
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <Link
          to="/classes"
          className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all classes
        </Link>
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
            <p className="text-lg text-gray-600 mt-1">
              Class Teacher: <span className="font-semibold">{classData.teacher}</span>
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button onClick={handleEdit} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </button>
            <button onClick={handleAddStudent} className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition-colors">
              <UserPlus className="w-4 h-4 mr-2" /> Add Student
            </button>
            <button onClick={handleDelete} className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm transition-colors">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </button>
          </div>
        </div>
      </header>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} label="Total Students" value={stats.total} color="bg-blue-500" />
        <StatCard icon={User} label="Boys" value={stats.boys} color="bg-sky-500" />
        <StatCard icon={User} label="Girls" value={stats.girls} color="bg-pink-500" />
        <StatCard icon={User} label="Class Teacher" value={classData.teacher} color="bg-purple-500" />
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <h3 className="text-xl font-bold text-gray-800 p-6 border-b">Student Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Roll No.</th>
                <th scope="col" className="px-6 py-3">Student Name</th>
                <th scope="col" className="px-6 py-3">Gender</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(classData.students || []).map((student, index) => (
                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4">{student.gender}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 hover:underline">View Profile</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

