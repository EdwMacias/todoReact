"use client";
import { useState } from "react";
import IcRoundPlus from "./IcRoundPlus";
interface TaskFormProps {
  onAddTask: (task: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "") return; // Evitar tareas vacías
    onAddTask(task);
    setTask(""); // Limpiar el input
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Nueva tarea"
        className="input input-bordered w-full"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="btn btn-outline btn-primary"><IcRoundPlus/></button>
    </form>
  );
}