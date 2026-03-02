import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  UserCircleIcon,
  HomeIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const username = "Admin"; // You can make this dynamic later

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { name: "Employees", path: "/employee", icon: UsersIcon },
    { name: "Attendance", path: "/attendance", icon: CalendarDaysIcon },
  ];

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* LEFT: Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <UsersIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              HRMS Lite
            </span>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="flex flex-row md:flex gap-4 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition duration-200 ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: User + Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <UserCircleIcon className="h-7 w-7 text-gray-500" />
              <span className="font-medium">{username}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
            >
              <UserCircleIcon className="h-4 w-4" />
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;