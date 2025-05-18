import React, { useState } from 'react';
import Select from 'react-select';
// import { useNavigate } from 'react-router-dom';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'staff', label: 'Staff' },
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password, role });
    // Add your login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Grades</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <Select
              options={roles}
              // styles={customStyles}
              placeholder="Choose role"
              onChange={(selectedOption) => setRole(selectedOption)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
