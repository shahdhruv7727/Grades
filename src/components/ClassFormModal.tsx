import React, { useState } from "react";
import { ClassItem } from "../data/classes";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (newClass: ClassItem) => void;
};

export default function ClassFormModal({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [level, setLevel] = useState<ClassItem["level"]>("Higher Secondary");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass: ClassItem = {
      id: Date.now().toString(),
      name,
      teacher,
      capacity,
      level,
    };
    onSubmit(newClass);
    onClose();
    setName("");
    setTeacher("");
    setCapacity(0);
    setLevel("Higher Secondary");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-fadeIn">
        {/* Header */}
        <h2 className="text-2xl font-bold text-left text-gray-800 mb-2">Add New Class</h2>
        <p className="text-gray-500 mb-6 text-sm text">
          Enter the details below to create a new class.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">
              Class Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 12-A"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">
              Teacher
            </label>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Mr. Sharma"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">
              Capacity
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 60"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">
              Level
            </label>
            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value as ClassItem["level"])
              }
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Higher Secondary</option>
              <option>Secondary</option>
              <option>Middle</option>
              <option>Primary</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
