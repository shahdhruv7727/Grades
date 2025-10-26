import React, { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  BookOpen,
  FileText,
  Info,
  DollarSign,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, link: "/dashboard" },
    { id: "students", label: "Students", icon: Users, link: "/students" },
    { id: "events", label: "Events", icon: Calendar, link: "/events" },
    { id: "teachers", label: "Teachers", icon: BookOpen, link: "/teachers" },
    { id: "classes", label: "Classes", icon: FileText, link: "/classes" },
    { id: "aboutus", label: "About Us", icon: Info, link: "/about" },
    {
      id: "finance",
      label: "Fee & Finances",
      icon: DollarSign,
      link: "/finance",
    },
    { id: "settings", label: "Settings", icon: Settings, link: "/settings" },
  ];

  const handleItemClick = (itemId, link) => {
    setActiveItem(itemId);
    if (link) navigate(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } min-h-screen border-r border-gray-200 relative`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute -right-3 ${
            isOpen ? "top-14" : "top-12"
          } bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 z-10`}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Header / Logo */}
      <div className="flex items-center justify-center gap-3 mt-2 p-6">
             {/* /*<Logo className="h-12 w-auto mx-auto" />  */}
             <img src="src\assets\GRADES.svg" alt="Logo" className="h-6 w-auto mx-auto" draggable = "false" />
            </div>

        {/* Search Bar */}
        {isOpen && (
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0062FF] focus:border-transparent text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.link)}
                className={`w-full flex items-center ${
                  isOpen ? "space-x-3 justify-start" : "justify-center"
                } px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[#0062FF] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#0062FF]"
                }`}
              >
                <Icon
                  className={`w-5 h-5 min-w-[20px] transition-all duration-200 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                />
                {isOpen && (
                  <span
                    className={`transition-all duration-300 whitespace-nowrap ${
                      isActive ? "text-white font-medium" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => handleItemClick("logout")}
            className={`w-full flex items-center ${
              isOpen ? "space-x-3 justify-start" : "justify-center"
            } px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group relative`}
          >
            <LogOut className="w-5 h-5 min-w-[20px]" />
            {isOpen && (
              <span className="transition-all duration-300 whitespace-nowrap font-medium">
                Logout
              </span>
            )}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
