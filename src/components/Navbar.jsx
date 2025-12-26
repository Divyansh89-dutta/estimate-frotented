import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-indigo-600 text-white shadow"
         : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
     }`;

  return (
    <nav
      className="sticky top-0 z-50
      bg-white/80 dark:bg-slate-900/80
      backdrop-blur border-b border-slate-200/60 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-lg font-bold text-indigo-600 dark:text-indigo-400"
        >
          Estimate<span className="text-slate-800 dark:text-white">Manager</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/estimates" className={linkClass}>
            Estimates
          </NavLink>
          <NavLink to="/notifications" className={linkClass}>
            Notifications
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <User className="h-4 w-4" />
              {user.email}
            </span>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1
                text-xs px-3 py-1.5 rounded-full
                bg-rose-100 text-rose-700 hover:bg-rose-200
                dark:bg-rose-900/40 dark:text-rose-300"
            >
              <LogOut className="h-3 w-3" />
              Logout
            </button>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg
              hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300
        ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div
          className="px-4 pb-4 pt-2 space-y-2
          bg-white/90 dark:bg-slate-900/90 backdrop-blur
          border-t border-slate-200/60 dark:border-slate-800"
        >
          <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink
            to="/estimates"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Estimates
          </NavLink>
          <NavLink
            to="/notifications"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Notifications
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Profile
          </NavLink>

          {user && (
            <>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                <User className="h-4 w-4" />
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2
                  text-sm px-3 py-2 rounded-full
                  bg-rose-100 text-rose-700 hover:bg-rose-200
                  dark:bg-rose-900/40 dark:text-rose-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
