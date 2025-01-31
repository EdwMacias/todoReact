"use client";
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";

interface Task {
  text: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Cargar tareas desde localStorage al montar el componente
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Convertir JSON a array de tareas
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: string) => {
    setTasks([...tasks, { text: newTask, completed: false }]);
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleTask = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (index: number) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const handleSaveEdit = (index: number) => {
    if (editText.trim() === "") return; // Evitar tareas vacías
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lista de Tareas</h1>

      {/* Formulario para agregar tareas */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Mostrar tareas agregadas */}
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center bg-base-200 p-3 rounded-lg shadow ${
              task.completed ? "opacity-50 line-through" : ""
            }`}
          >
            {/* Edición en línea */}
            <div className="flex gap-2 items-center flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
                className="checkbox checkbox-primary"
              />

              {editingIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input input-sm w-full mx-1"
                />
              ) : (
                <span>{task.text}</span>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              {editingIndex === index ? (
                <button onClick={() => handleSaveEdit(index)} className="btn btn-sm btn-success">
                   💾
                </button>
              ) : (
                <button onClick={() => handleEditTask(index)} className="btn btn-sm btn-warning">
                  ✏
                </button>
              )}
              <button onClick={() => handleDeleteTask(index)} className="btn btn-sm btn-error">
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
