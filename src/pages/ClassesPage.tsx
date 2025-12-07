import React from "react";
import { Link } from "react-router-dom"; // Make sure Link is imported
import { CLASSES, ClassItem } from "../data/classes";
import Toolbar from "../components/Toolbar";
import FilterDrawer from "../components/FilterDrawer";
import ClassFormModal from "../components/ClassFormModal";

const LEVEL_ORDER = ["Higher Secondary", "Secondary", "Middle", "Primary"];

// --- Modified Section Component ---
// This component now uses <Link> to make each card clickable and navigate.
type SectionProps = {
  title: string;
  items: ClassItem[];
};

const Section: React.FC<SectionProps> = ({ title, items }) => (
  <section>
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        // Each card is now a link to its specific details page (e.g., /classes/12-A)
        <Link to={`/classes/${item.id}`} key={item.id} className="group">
          <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">Teacher: {item.teacher}</p>
            <p className="text-sm text-gray-500 mt-2">{item.capacity} Student Capacity</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);


export default function ClassesPage() {
  const [query, setQuery] = React.useState("");
  const [drawer, setDrawer] = React.useState(false);
  const [classes, setClasses] = React.useState(CLASSES);
  const [formOpen, setFormOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    if (!query) return classes;
    const q = query.toLowerCase();
    return classes.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.teacher.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q)
    );
  }, [query, classes]);

  const groups = React.useMemo(() => {
    return LEVEL_ORDER.map((level) => ({
      level,
      items: filtered.filter((c) => c.level === level),
    }));
  }, [filtered]);

  const handleAddClass = (newClass: ClassItem) => {
    // Ensure new classes get a unique ID and an empty students array
    const classWithId = { ...newClass, id: `class-${Date.now()}`, students: [] };
    setClasses((prev) => [...prev, classWithId]);
  };

  return (
    <div className="p-6">
      <Toolbar
        query={query}
        setQuery={setQuery}
        onOpenFilter={() => setDrawer(true)}
        onAddClass={() => setFormOpen(true)}
      />

      <div className="mt-6 space-y-8">
        {groups.map((g) =>
          g.items.length ? (
            <Section
              key={g.level}
              title={g.level}
              items={g.items}
            />
          ) : null
        )}
      </div>

      <FilterDrawer open={drawer} onClose={() => setDrawer(false)} />

      <ClassFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddClass}
      />
    </div>
  );
}

