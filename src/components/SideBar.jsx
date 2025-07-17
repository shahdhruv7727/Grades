import React, { useState } from "react";
import {
  Home,
  User,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const Navigate = useNavigate();

  let menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home , link: "/studentt"},
    { id: "students", label: "Students", icon: BarChart3, link: "/loaderr" },
    { id: "events", label: "Events", icon: Calendar },
    { id: "teachers", label: "Teachers", icon: Mail },
    { id: "classes", label: "Classes", icon: FileText },
    { id: "aboutus", label: "About Us", icon: User },
    { id: "feeandfinaces", label: "Fee and Finaces", icon: Bell },
    { id: "settings"  , label: "Settings", icon: Settings },
  ];

  const [menu, setMenu] = useState(menuItems);

  const handleItemClick = (itemId, itemlink) => {
    setActiveItem(itemId);
    itemlink && Navigate(itemlink);
  };

  const handleOnChange = (e) => {
    setMenu(
      menuItems.filter(
        (item) =>
          item.id.includes(e.target.value) ||
          item.label.includes(e.target.value)
      )
    );
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
          className={`absolute -right-3 ${isOpen ? "top-14" : "top-12"} bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 z-10`}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl md:w-10">G</span>
            </div>
            <div
              className={`transition-all duration-300 ${
                isOpen
                  ? "opacity-100 w-auto"
                  : "opacity-0 w-0 overflow-hidden md:hidden"
              }`}
            >
              <h1 className="font-bold text-gray-800 text-lg whitespace-nowrap">
                Grades <span className="h-2 w-2 text-white">'''</span>
              </h1>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                Student Portal
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`p-4 border-b border-gray-100 transition-all duration-300 ${
            isOpen
              ? "opacity-100"
              : "opacity-0 h-0 p-0 overflow-hidden md:hidden"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleOnChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item?.link)}
                className={`w-full flex items-center ${
                  isOpen ? "space-x-3 justify-start" : "justify-center"
                } px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 min-w-[20px] min-h-[10px] transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700"
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

                {/* Badge */}
                {item.badge && isOpen && (
                  <span
                    className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
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
            <LogOut className="w-5 h-5 min-w-[20px] min-h-[12px]" />
            {isOpen && (
              <span
                className={`transition-all duration-300 whitespace-nowrap ${
                  isOpen ? "text-gray-700 font-medium" : "text-gray-700"
                }`}
              >
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
      {/* Main Content */}
    </div>
  );
};

export default Sidebar;
