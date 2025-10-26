import React from 'react';

type Props = {
  query: string;
  setQuery: (v: string) => void;
  onOpenFilter: () => void;
  onAddClass: () => void;
};

export default function Toolbar({ query, setQuery, onOpenFilter, onAddClass }: Props) {
  const [local, setLocal] = React.useState(query);

  React.useEffect(() => {
    const id = setTimeout(() => setQuery(local.trim()), 200);
    return () => clearTimeout(id);
  }, [local]);

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Search"
            className="h-9 w-72 rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search classes"
          />
          <span className="absolute left-3 top-2.5 h-4 w-4 rounded-full bg-slate-200" aria-hidden />
        </div>
        <button
          onClick={onOpenFilter}
          className="h-9 rounded-md border border-slate-200 px-3 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open filters"
        >
          Filter
        </button>
      </div>
      <button
        onClick={onAddClass}
        className="h-9 rounded-md bg-blue-600 px-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        + Add Class
      </button>
    </div>
  );
}
