import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FaDownload } from 'react-icons/fa';

const StudentExport = ({ students, isExporting, onExport, className = "" }) => {
  const [exportOptions, setExportOptions] = useState({
    includeAll: true,
    includeActive: false,
    includeInactive: false
  });

  
  const handleExport = async () => {
    if (!students || students.length === 0) {
      alert('No students data to export');
      return;
    }

    let studentsToExport = students;

    // Filter based on export options
    if (!exportOptions.includeAll) {
      studentsToExport = students.filter(student => {
        if (exportOptions.includeActive && student.status === 'Active') return true;
        if (exportOptions.includeInactive && student.status !== 'Active') return true;
        return false;
      });
    }

    if (studentsToExport.length === 0) {
      alert('No students match the selected export criteria');
      return;
    }

    try {
      // Transform data for export
      console.log("Exporting ",studentsToExport);

      const exportData = studentsToExport.map(student => ({
        Name: student.name,
        Email: student.email,
        Standard: student.class || student.standard,
        Board: student.board,
        School: student.school,
        'Mobile Phone': student.phone || student.mobilePhone1,
        Address: student.address,
        'Date of Birth': student.dateOfBirth,
        "Admission Date": student.admissionDate,
        Fees: student.fees,
        // Status: student.status
      }));

      console.log('Exporting data:', exportData);

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Set column widths for better readability
      worksheet['!cols'] = [
        { wch: 8 },  // ID
        { wch: 20 }, // Name
        { wch: 25 }, // Email
        { wch: 10 }, // Standard
        { wch: 15 }, // Board
        { wch: 25 }, // School
        { wch: 15 }, // Mobile Phone
        { wch: 30 }, // Address
        { wch: 12 }, // Date of Birth
        { wch: 10 }, // Fees
        { wch: 10 }  // Status
      ];

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Data');

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `students_export_${timestamp}.xlsx`;

      // Write and download file
      XLSX.writeFile(workbook, filename);

      // Call onExport callback if provided
      if (onExport) {
        onExport(studentsToExport.length);
      }

    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const getFilteredCount = () => {
    if (!students) return 0;
    
    if (exportOptions.includeAll) return students.length;
    
    let count = 0;
    if (exportOptions.includeActive) {
      count += students.filter(s => s.status === 'Active').length;
    }
    if (exportOptions.includeInactive) {
      count += students.filter(s => s.status !== 'Active').length;
    }
    return count;
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <FaDownload className="text-green-600" />
        <span className="text-sm text-gray-600">Export students data to Excel</span>
      </div>
      
      <div className="space-y-4">
        {/* Export Options */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Export Options:</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="exportType"
                checked={exportOptions.includeAll}
                onChange={() => setExportOptions({
                  includeAll: true,
                  includeActive: false,
                  includeInactive: false
                })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">All Students</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="exportType"
                checked={!exportOptions.includeAll}
                onChange={() => setExportOptions({
                  includeAll: false,
                  includeActive: true,
                  includeInactive: false
                })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Filter by Status</span>
            </label>
          </div>
          
          {!exportOptions.includeAll && (
            <div className="ml-6 space-y-1">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeActive}
                  onChange={(e) => setExportOptions(prev => ({
                    ...prev,
                    includeActive: e.target.checked
                  }))}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Active Students</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeInactive}
                  onChange={(e) => setExportOptions(prev => ({
                    ...prev,
                    includeInactive: e.target.checked
                  }))}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">Inactive Students</span>
              </label>
            </div>
          )}
        </div>

        {/* Export Summary */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span className="text-sm text-gray-600">
            {getFilteredCount()} students will be exported
          </span>
          <button
            onClick={handleExport}
            disabled={isExporting || !students?.length || getFilteredCount() === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              isExporting || !students?.length || getFilteredCount() === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Exporting...
              </>
            ) : (
              <>
                <FaDownload className="w-4 h-4" />
                Export to Excel
              </>
            )}
          </button>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p className="font-medium mb-1">Export includes:</p>
          <p>ID, Name, Email, Standard, Board, School, Mobile Phone, Address, Date of Birth, Fees, Status</p>
        </div>
      </div>
    </div>
  );
};

export default StudentExport;