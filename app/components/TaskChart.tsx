"use client";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface Task {
  priority: "Alta" | "Media" | "Baja";
  completed: boolean;
}

interface TaskChartProps {
  tasks: Task[];
}

export default function TaskChart({ tasks }: TaskChartProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const highPriority = tasks.filter((task) => task.priority === "Alta").length;
  const mediumPriority = tasks.filter((task) => task.priority === "Media").length;
  const lowPriority = tasks.filter((task) => task.priority === "Baja").length;

  const data = {
    labels: ["Pendientes", "Completadas"],
    datasets: [
      {
        data: [pendingTasks, completedTasks],
        backgroundColor: ["#facc15", "#16a34a"],
      },
    ],
  };

  const priorityData = {
    labels: ["Alta", "Media", "Baja"],
    datasets: [
      {
        data: [highPriority, mediumPriority, lowPriority],
        backgroundColor: ["#ef4444", "#facc15", "#10b981"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Tareas Completadas vs Pendientes</h2>
        <Pie data={data} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Distribución por Prioridad</h2>
        <Pie data={priorityData} />
      </div>
    </div>
  );
}
