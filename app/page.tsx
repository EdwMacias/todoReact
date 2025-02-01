"use client";
import { useState, useEffect } from "react";
import TaskChart from "./components/TaskChart";
import Link from "next/link";

interface Task {
  title: string;
  description: string;
  priority: "Alta" | "Media" | "Baja";
  completed: boolean;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriority = tasks.filter((task) => task.priority === "Alta").length;
  const mediumPriority = tasks.filter((task) => task.priority === "Media").length;
  const lowPriority = tasks.filter((task) => task.priority === "Baja").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📊 Dashboard de Tareas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Total de Tareas</h2>
          <p className="text-3xl font-semibold">{totalTasks}</p>
        </div>
        <div className="bg-green-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Tareas Completadas</h2>
          <p className="text-3xl font-semibold">{completedTasks}</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Tareas Pendientes</h2>
          <p className="text-3xl font-semibold">{pendingTasks}</p>
        </div>
      </div>

      {/* Gráfica de distribución */}
      <TaskChart tasks={tasks} />

      {/* Botón para volver a la lista de tareas */}
      <Link href="/todo" className="btn btn-primary">Tareas</Link>
    </div>
  );
}