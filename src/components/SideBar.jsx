import React, { useState, useMemo } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";

// ============================================
// CONFIGURATION
// ============================================

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home, link: "/studentt" },
  { id: "students", label: "Students", icon: BarChart3, link: "/wha" },
  { id: "events", label: "Events", icon: Calendar, link: "/events" },
  { id: "teachers", label: "Teachers", icon: Mail, link: "/teachers" },
  { id: "classes", label: "Classes", icon: FileText, link: "/classes" },
  { id: "aboutus", label: "About Us", icon: User, link: "/aboutus" },
  { id: "finances", label: "Fee and Finances", icon: Bell, link: "/fees" },
  { id: "settings", label: "Settings", icon: Settings, link: "/settings" },
];

// ============================================
// MAIN COMPONENT
// ============================================

const Sidebar = ({ logo, onLogout }) => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // ============================================
  // HOOKS
  // ============================================
  const navigate = useNavigate();
  const location = useLocation();

  // ============================================
  // COMPUTED VALUES
  // ============================================
  
  // Filter menu items based on search query
  const filteredMenu = useMemo(() => {
    if (!searchQuery) return MENU_ITEMS;
    
    const query = searchQuery.toLowerCase();
    return MENU_ITEMS.filter(
      (item) =>
        item.id.toLowerCase().includes(query) ||
        item.label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Determine active menu item based on current route
  const activeItem = useMemo(() => {
    const currentItem = MENU_ITEMS.find(
      (item) => item.link === location.pathname
    );
    return currentItem?.id || "dashboard";
  }, [location.pathname]);

  // ============================================
  // EVENT HANDLERS
  // ============================================
  
  const handleItemClick = (item) => {
    if (item.link) {
      navigate(item.link);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      console.log("Logging out...");
      navigate("/login");
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ============================================
          SIDEBAR CONTAINER
          ============================================ */}
      <aside
        className={`bg-white shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } min-h-screen border-r border-gray-200 relative flex flex-col`}
      >
        {/* ============================================
            TOGGLE BUTTON
            ============================================ */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-14 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* ============================================
            HEADER SECTION
            ============================================ */}
        <header className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            {/* Logo Container */}
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-white font-bold text-xl">G</span>
              )}
            </div>

            {/* Brand Text */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              <h1 className="font-bold text-gray-800 text-lg whitespace-nowrap text-left">
                Grades
              </h1>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                Student Portal
              </p>
            </div>
          </div>
        </header>

        {/* ============================================
            SEARCH SECTION
            ============================================ */}
        <div
          className={`p-4 border-b border-gray-100 transition-all duration-300 ${
            isOpen ? "opacity-100 h-auto" : "opacity-0 h-0 p-0 overflow-hidden"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
              aria-label="Search menu items"
            />
          </div>
        </div>

        {/* ============================================
            NAVIGATION MENU
            ============================================ */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center ${
                    isOpen ? "space-x-3 justify-start" : "justify-center"
                  } px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Icon */}
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />

                  {/* Label (visible when sidebar is open) */}
                  {isOpen && (
                    <span
                      className={`transition-all duration-300 whitespace-nowrap text-sm ${
                        isActive ? "text-white font-medium" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip (visible when sidebar is collapsed) */}
                  {!isOpen && (
                    <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            // Empty state when no results found
            <div className="text-center text-gray-500 text-sm py-4">
              No results found
            </div>
          )}
        </nav>

        {/* ============================================
            FOOTER SECTION
            ============================================ */}
        <footer className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isOpen ? "space-x-3 justify-start" : "justify-center"
            } px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group relative focus:outline-none focus:ring-2 focus:ring-red-500`}
            aria-label="Logout"
          >
            {/* Logout Icon */}
            <LogOut className="w-5 h-5 flex-shrink-0" />

            {/* Logout Text (visible when sidebar is open) */}
            {isOpen && (
              <span className="transition-all duration-300 whitespace-nowrap text-sm font-medium">
                Logout
              </span>
            )}
            {/* Tooltip (visible when sidebar is collapsed) */}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                Logout
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default Sidebar;