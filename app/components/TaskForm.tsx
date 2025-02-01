"use client";
import { useState } from "react";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

interface Task {
  title: string;
  description: string;
  priority: "Alta" | "Media" | "Baja";
  completed: boolean;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Alta" | "Media" | "Baja">("Media");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") return;
    onAddTask({ title, description, priority, completed: false });

    setTitle("");
    setDescription("");
    setPriority("Media");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4  p-4 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Título de la tarea"
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        className="textarea textarea-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select
        className="select select-bordered w-full"
        value={priority}
        onChange={(e) => setPriority(e.target.value as "Alta" | "Media" | "Baja")}
      >
        <option value="Alta">🔴 Alta</option>
        <option value="Media">🟡 Media</option>
        <option value="Baja">🟢 Baja</option>
      </select>
      <button type="submit" className="btn btn-primary w-full">Agregar Tarea</button>
    </form>
  );
}
