import { useState, useMemo } from 'react';

import { generateData } from './data/mockData';
import MapView from './components/MapView';
import TableView from './components/tableview';

const data = generateData(5000);

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    let result = data;
    
    if (filter !== 'All') {
      result = result.filter(d => d.status === filter);
    }
    
    if (searchQuery) {
      result = result.filter(d => 
        d.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toString().includes(searchQuery)
      );
    }
    
    return result;
  }, [filter, searchQuery]);

  const stats = useMemo(() => ({
    total: filteredData.length,
    active: filteredData.filter(d => d.status === 'Active').length,
    completed: filteredData.filter(d => d.status === 'Completed').length,
  }), [filteredData]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-480 mx-auto space-y-6">
        
        <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Geo Data Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Real-time project tracking and visualization</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2.5 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 transition-all"
                />
                <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                className="bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 font-medium cursor-pointer transition-all"
                onChange={e => setFilter(e.target.value)}
                value={filter}
              >
                <option>All</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-xl p-4 shadow-lg border border-blue-500/30">
              <div className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Total Projects</div>
              <div className="text-3xl font-bold text-white mt-1">{stats.total.toLocaleString()}</div>
            </div>
            
            <div className="bg-linear-to-br from-green-600 to-green-700 rounded-xl p-4 shadow-lg border border-green-500/30">
              <div className="text-green-200 text-sm font-semibold uppercase tracking-wide">Active</div>
              <div className="text-3xl font-bold text-white mt-1">{stats.active.toLocaleString()}</div>
            </div>
            
            <div className="bg-linear-to-br from-purple-600 to-purple-700 rounded-xl p-4 shadow-lg border border-purple-500/30">
              <div className="text-purple-200 text-sm font-semibold uppercase tracking-wide">Completed</div>
              <div className="text-3xl font-bold text-white mt-1">{stats.completed.toLocaleString()}</div>
            </div>
            
            <div className="bg-linear-to-br from-orange-600 to-orange-700 rounded-xl p-4 shadow-lg border border-orange-500/30">
              <div className="text-orange-200 text-sm font-semibold uppercase tracking-wide">Selected</div>
              <div className="text-3xl font-bold text-white mt-1">{selectedId ? `#${selectedId}` : '—'}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 h-150">
          <div className="h-150">
            <MapView
              data={filteredData}
              selectedId={selectedId}
              onMarkerClick={setSelectedId}
            />
          </div>

          <div className="h-150">
            <TableView
              data={filteredData}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>

        {selectedId && (
          <div className="bg-linear-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-medium">Currently Selected</div>
                  <div className="text-xl font-bold text-white">
                    {filteredData.find(d => d.id === selectedId)?.project}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}