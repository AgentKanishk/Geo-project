import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

function TableView({ data, selectedId, onSelect }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  return (
    <div className="border">
      <div className="flex font-bold bg-gray-100 px-4 py-2">
        <div className="w-1/2">Project</div>
        <div className="w-1/2">Status</div>
      </div>

      <div
        ref={parentRef}
        className="h-100 overflow-auto"
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
                className={`flex px-4 py-2 border-b cursor-pointer absolute w-full
                  ${row.id === selectedId ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="w-1/2">{row.project}</div>
                <div className="w-1/2">{row.status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TableView;
