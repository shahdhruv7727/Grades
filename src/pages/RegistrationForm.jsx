import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SendGETRequest } from '../services/SendGETRequest';
import { API } from '../API/api';

const StudentList = () => {
  const [filters, setFilters] = useState({});
  const [uiState, setUIState] = useState({
    sidebarVisible: false,
    activeColumns: [],
  });
  const [tempFilters, setTempFilters] = useState({});

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const response = await SendGETRequest(API.Students);
      return response?.data?.students || [];
    },
  });

  const filteredStudents = students.filter((student) => {
    return Object.entries(filters).every(([key, value]) => {
      const field = student[key]?.toString().toLowerCase();
      return field?.includes(value.toLowerCase());
    });
  });

  const handleColumnClick = (column) => {
    setUIState((prev) => ({
      sidebarVisible: true,
      activeColumns: prev.activeColumns.includes(column)
        ? prev.activeColumns
        : [...prev.activeColumns, column],
    }));
    setTempFilters((prev) => ({ ...prev, [column]: filters[column] || '' }));
  };

  const handleInputChange = (column, value) => {
    setTempFilters((prev) => ({ ...prev, [column]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setUIState((prev) => ({ ...prev, sidebarVisible: false }));
  };

  const resetFilters = () => {
    setFilters({});
    setTempFilters({});
    setUIState({ sidebarVisible: false, activeColumns: [] });
  };

  const removeFilter = (column) => {
    const updatedFilters = { ...filters };
    const updatedTemp = { ...tempFilters };
    delete updatedFilters[column];
    delete updatedTemp[column];
    setFilters(updatedFilters);
    setTempFilters(updatedTemp);
    setUIState((prev) => ({
      ...prev,
      activeColumns: prev.activeColumns.filter((col) => col !== column),
    }));
  };

  if (isLoading) return <div className="p-4">Loading students...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading students</div>;

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl font-semibold mb-4">Registered Students</h2>

      {uiState.sidebarVisible && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg border-l z-50 p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Active Filters</h3>
            <button onClick={() => setUIState((prev) => ({ ...prev, sidebarVisible: false }))}>✕</button>
          </div>
          {uiState.activeColumns.map((col) => (
            <div key={col} className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </label>
              <input
                type="text"
                className="w-full border p-2"
                placeholder={`Filter ${col}`}
                value={tempFilters[col] || ''}
                onChange={(e) => handleInputChange(col, e.target.value)}
              />
              <button
                onClick={() => removeFilter(col)}
                className="text-red-500 text-xs mt-1 underline"
              >
                Remove Filter
              </button>
            </div>
          ))}
          <button onClick={applyFilters} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2">
            Apply Filters
          </button>
          <button onClick={resetFilters} className="bg-gray-300 text-black px-4 py-2 rounded w-full">
            Reset All
          </button>
        </div>
      )}

      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              {['name', 'parentEmail', 'standard', 'admissionDate', 'board', 'school', 'city', 'state', 'mobilePhone1'].map((col) => (
                <th key={col} className="p-2 cursor-pointer" onClick={() => handleColumnClick(col)}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="text-sm text-gray-800 hover:bg-gray-50">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.parentEmail}</td>
                <td className="p-2">{student.standard}</td>
                <td className="p-2">{new Date(student.admissionDate).toLocaleDateString()}</td>
                <td className="p-2">{student.board}</td>
                <td className="p-2">{student.school}</td>
                <td className="p-2">{student.city}</td>
                <td className="p-2">{student.state}</td>
                <td className="p-2">{student.mobilePhone1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
