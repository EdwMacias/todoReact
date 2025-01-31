import "./styles/globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light">
      <body className="h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido Principal */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}