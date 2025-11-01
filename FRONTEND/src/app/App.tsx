import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const loc = useLocation();
  const active = loc.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg ${
        active ? "bg-black text-white" : "hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
};

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const authed = !!user?.token;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between h-14">
          <div className="header-title">NET BANKING</div>
          {user?.token && (
            <div className="text-sm text-gray-600">{user?.username}</div>
          )}
        </div>
      </header>

      {/* App layout */}
      <div className="container grid grid-cols-12 gap-6 py-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 space-y-2">
          {authed && (
            <nav className="flex flex-col gap-1">
              <NavLink to="/dashboard">🏠 Overview</NavLink>
              <NavLink to="/accounts">🏦 Accounts</NavLink>
              <NavLink to="/card">💳 Cards</NavLink>
              <NavLink to="/fundtransfer">💸 Fund Transfer</NavLink>
              <NavLink to="/transactions">📄 Transactions</NavLink>
              <NavLink to="/profile">👤 Profile</NavLink>
              <NavLink to="/about">ℹ️ About</NavLink>
              <NavLink to="/incidents">🔥 Incidents</NavLink>
              <NavLink to="/customers">👥 Customers</NavLink>

              <button onClick={logout} className="btn btn-outline mt-4">
                Sign Out
              </button>
            </nav>
          )}
        </aside>

        {/* Content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
