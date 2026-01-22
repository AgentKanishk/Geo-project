import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export default function TableView({ data, selectedId, onSelect }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
  });

  return (
    <div className="h-full rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900">
      <div className="flex font-semibold bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-4 text-sm uppercase tracking-wider">
        <div className="w-1/4">ID</div>
        <div className="w-1/2">Project Name</div>
        <div className="w-1/4">Status</div>
      </div>

      <div
        ref={parentRef}
        className="h-[calc(100%-56px)] overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = data[virtualRow.index];

            return (
              <div
                key={row.id}
                onClick={() => onSelect(row.id)}
                className={`flex px-6 py-3 border-b border-gray-700 cursor-pointer absolute w-full transition-all duration-200
                  ${row.id === selectedId 
                    ? 'bg-linear-to-r from-red-500/20 to-pink-500/20 border-l-4 border-l-red-500 shadow-lg' 
                    : 'hover:bg-gray-700/50'}`}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="w-1/4 font-mono text-sm text-gray-300 font-semibold">#{row.id}</div>
                <div className="w-1/2 text-white font-medium">{row.project}</div>
                <div className="w-1/4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    row.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  }`}>
                    {row.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}