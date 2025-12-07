import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  FaUpload,
  FaFileExcel,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

const StudentImport = ({ onImport, className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'warning'

  const setMessageWithType = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    // Auto clear message after 5 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    if (!validTypes.includes(file.type)) {
      setMessageWithType('Please select a valid Excel file (.xlsx or .xls)', 'error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) {
        setMessageWithType('No data found in the Excel file', 'warning');
        return;
      }

      // Required columns for student import
      const requiredColumns = ['name', 'email', 'standard', 'board', 'school', 'mobilePhone1'];
      const firstRow = jsonData[0];
      const availableColumns = Object.keys(firstRow);
      const missingColumns = requiredColumns.filter(col => !availableColumns.includes(col));
      
      if (missingColumns.length > 0) {
        setMessageWithType(
          `Missing required columns: ${missingColumns.join(', ')}. Please check the template.`, 
          'error'
        );
        return;
      }

      // Transform data to match API structure
      const transformedData = jsonData.map((row, index) => ({
        name: row.name || '',
        email: row.email || '',
        standard: row.standard || row.class || '', // Handle both field names
        board: row.board || '',
        school: row.school || '',
        mobilePhone1: row.mobilePhone1 || row.phone || '', // Handle both field names
        address: row.address || '',
        dateOfBirth: row.dateOfBirth || '',
        fees: row.fees || '0',
        status: row.status || 'Active',
        avatar: row.avatar || null
      }));

      // Validate each student record
      const validStudents = [];
      const errors = [];

      transformedData.forEach((student, index) => {
        const rowNum = index + 2; // +2 because Excel rows start from 1 and first row is header
        
        if (!student.name.trim()) {
          errors.push(`Row ${rowNum}: Name is required`);
        }
        if (!student.email.trim()) {
          errors.push(`Row ${rowNum}: Email is required`);
        } else if (!/\S+@\S+\.\S+/.test(student.email)) {
          errors.push(`Row ${rowNum}: Invalid email format`);
        }
        if (!student.standard.trim()) {
          errors.push(`Row ${rowNum}: Standard/Class is required`);
        }
        if (!student.school.trim()) {
          errors.push(`Row ${rowNum}: School is required`);
        }

        if (!errors.some(error => error.includes(`Row ${rowNum}`))) {
          validStudents.push(student);
        }
      });

      if (errors.length > 0) {
        setMessageWithType(
          `Found ${errors.length} validation errors. First few: ${errors.slice(0, 3).join('; ')}`, 
          'error'
        );
        return;
      }

      // Call the onImport callback with valid students
      await onImport(validStudents);
      setMessageWithType(
        `Successfully imported ${validStudents.length} students`, 
        'success'
      );
      event.target.value = ''; // Reset input

    } catch (error) {
      console.error('Import error:', error);
      setMessageWithType('Error reading file. Please check the file format.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTemplate = () => {
    // Create template with student fields
    const templateData = [{
      name: 'John Doe',
      email: 'john.doe@example.com',
      standard: '10th',
      board: 'CBSE',
      school: 'ABC High School',
      mobilePhone1: '9876543210',
      address: '123 Main St, City',
      dateOfBirth: '2008-01-15',
      fees: '5000',
      status: 'Active'
    }];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Template');
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // name
      { wch: 25 }, // email
      { wch: 10 }, // standard
      { wch: 15 }, // board
      { wch: 25 }, // school
      { wch: 15 }, // mobilePhone1
      { wch: 30 }, // address
      { wch: 12 }, // dateOfBirth
      { wch: 10 }, // fees
      { wch: 10 }  // status
    ];

    XLSX.writeFile(workbook, 'student_import_template.xlsx');
    setMessageWithType('Template downloaded successfully!', 'success');
  };

  const getMessageIcon = () => {
    switch (messageType) {
      case 'success':
        return <FaCheckCircle className="w-4 h-4" />;
      case 'error':
        return <FaExclamationTriangle className="w-4 h-4" />;
      case 'warning':
        return <FaExclamationTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getMessageClasses = () => {
    switch (messageType) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return '';
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaUpload className="text-blue-600" />
          <span className="text-sm text-gray-600">Upload Excel file to import students</span>
        </div>
        <button
          onClick={downloadTemplate}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <FaFileExcel className="w-4 h-4" />
          Download Template
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="student-excel-upload" 
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaFileExcel className="w-8 h-8 mb-2 text-green-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> Excel file
              </p>
              <p className="text-xs text-gray-500">XLSX or XLS files only</p>
            </div>
            <input 
              id="student-excel-upload" 
              type="file" 
              className="hidden" 
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
          </label>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Processing file...</span>
          </div>
        )}

        {message && (
          <div className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${getMessageClasses()}`}>
            {getMessageIcon()}
            {message}
          </div>
        )}

        <div className="text-xs text-gray-500 bg-white-50 p-3 rounded-lg">
          <p className="font-medium mb-2">Required columns:</p>
          <div className="grid grid-cols-2 gap-1">
            <span>• name</span>
            <span>• email</span>
            <span>• standard</span>
            <span>• board</span>
            <span>• school</span>
            <span>• mobilePhone1</span>
          </div>
          <p className="mt-2 text-xs">Optional: address, dateOfBirth, fees, status</p>
        </div>
      </div>
    </div>
  );
};

export default StudentImport;