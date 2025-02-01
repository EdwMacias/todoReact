"use client";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskChart from "../components/TaskChart";// Nueva gráfica

interface Task {
  title: string;
  description: string;
  priority: "Alta" | "Media" | "Baja";
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: Task) => setTasks([...tasks, newTask]);

  const handleDeleteTask = (index: number) => setTasks(tasks.filter((_, i) => i !== index));

  const handleToggleTask = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 ">
        <div className="m-2">
        <h1 className="text-2xl font-bold text-center">Formulario</h1>
          <TaskForm onAddTask={handleAddTask} />
        </div>
        <div className="m-2">
          {/* Lista de tareas */}
          <h1 className="text-2xl font-bold text-center">Lista de Tareas</h1>
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`p-4 rounded-lg shadow bg-base-200 ${
                  task.completed ? "opacity-50 line-through" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-primary">{task.title}</h2>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <p className="text-sm font-semibold">
                      {task.priority === "Alta" ? "🔴 Alta" :
                      task.priority === "Media" ? "🟡 Media" :
                      "🟢 Baja"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(index)}
                      className="checkbox checkbox-primary"
                    />
                    <button onClick={() => handleDeleteTask(index)} className="btn btn-sm btn-error">
                      ❌
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="justify-center max-w-96 m-2">
          {/* Gráfica */}
          <TaskChart tasks={tasks}/>
        </div>
    </div>
  );
}
