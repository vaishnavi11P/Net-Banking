import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

const linkClass =
  "block rounded-md px-3 py-2 text-sm transition hover:bg-gray-100";
const activeClass =
  "block rounded-md px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-600";

const Sidebar: React.FC<Props> = ({ open, onClose }) => {
  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 h-full w-64 shrink-0 border-r bg-white p-3 transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="mb-3 px-2 text-xs font-semibold uppercase text-gray-500">
          Navigation
        </div>
        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            onClick={onClose}
          >
            🏠 Dashboard
          </NavLink>
          <NavLink
            to="/accounts"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            onClick={onClose}
          >
            🏦 Accounts
          </NavLink>
          <NavLink
            to="/card"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            onClick={onClose}
          >
            💳 Cards
          </NavLink>
          <NavLink
            to="/fundtransfer"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            onClick={onClose}
          >
            💸 Fund Transfer
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            onClick={onClose}
          >
            📄 Transactions
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            onClick={onClose}
          >
            👤 Profile
          </NavLink>

          <div className="mt-4 border-t pt-3">
            <NavLink
              to="/customers"
              className={({ isActive }) => (isActive ? activeClass : linkClass)}
              onClick={onClose}
            >
              👥 Customers
            </NavLink>
            <NavLink
              to="/incidents"
              className={({ isActive }) => (isActive ? activeClass : linkClass)}
              onClick={onClose}
            >
              🚨 Incidents
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? activeClass : linkClass)}
              onClick={onClose}
            >
              ℹ️ About
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
