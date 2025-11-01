import React from "react";
import { useAuth } from "../context/AuthContext";

type Props = {
  onMenuToggle?: () => void;
};

const Navbar: React.FC<Props> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <div className="font-semibold tracking-tight">NetBanking</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-gray-600">
            {user?.username ?? "Guest"}
          </div>
          {user ? (
            <button
              onClick={logout}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
