import React from 'react';
import type { ClassItem } from '../data/classes';
import ClassCard from './ClassCard';

type Props = {
  title: string;
  items: ClassItem[];
  onOpen?: (item: ClassItem) => void;
};

export default function Section({ title, items, onOpen }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const cols = getColsForWidth();
    let next = idx;
    if (e.key === 'ArrowRight') next = Math.min(items.length - 1, idx + 1);
    if (e.key === 'ArrowLeft')  next = Math.max(0, idx - 1);
    if (e.key === 'ArrowDown')  next = Math.min(items.length - 1, idx + cols);
    if (e.key === 'ArrowUp')    next = Math.max(0, idx - cols);
    if (next !== idx) {
      e.preventDefault();
      refs.current[next]?.focus();
      setActiveIndex(next);
    }
  };

  function getColsForWidth() {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 768)  return 2;
    return 1;
  }

  return (
    <section className="space-y-3">
      <h3 className="text-slate-500 text-sm text-left font-medium">{title}</h3>
      <div
        role="grid"
        aria-label={`${title} classes`}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {items.map((it, i) => (
          <ClassCard
            key={it.id}
            item={it}
            tabIndex={i === activeIndex ? 0 : -1}
            onFocus={() => setActiveIndex(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onOpen={onOpen}
            ref={(el: any) => (refs.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
}
