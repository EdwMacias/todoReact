"use client";

import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-base-100 p-4 shadow-md flex justify-left items-center">
            <label htmlFor="sidebar-drawer" className="btn btn-ghost btn-circle">
        <Menu className="w-6 h-6" />
      </label>
      <h1 className="text-lg font-semibold text-primary ml-10">To Do</h1>
      {/* <button className="btn btn-outline btn-sm">Cerrar sesión</button> */}
    </nav>
  );
}