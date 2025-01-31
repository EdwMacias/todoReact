"use client";
import { Home, ListChecks, Menu } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="drawer">
      {/* Toggle del drawer */}
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Contenido principal (botón para abrir el sidebar) */}

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay">
          
        </label>
        
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 shadow-lg">
          <h2 className="text-xl font-bold text-primary mb-6">Tareas pendientes</h2>
          <li>
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" /> Inicio
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
