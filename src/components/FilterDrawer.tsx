import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FilterDrawer({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-[320px] bg-white shadow-xl p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-slate-900 font-semibold">Filters</h4>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-50">✕</button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Level</label>
            <div className="flex gap-2 flex-wrap">
              {['Higher Secondary', 'Secondary', 'Middle', 'Primary'].map(l => (
                <label key={l} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-blue-600" /> {l}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Capacity</label>
            <select className="w-full border border-slate-200 rounded-md h-9 px-2">
              <option>Any</option>
              <option>60</option>
            </select>
          </div>
          <button className="w-full h-9 rounded-md bg-blue-600 text-white">Apply</button>
        </div>
      </aside>
    </div>
  );
}
