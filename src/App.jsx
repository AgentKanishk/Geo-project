import { useState } from 'react';
import MapView from './components/MapvView';
import TableView from './components/tableview';
import { generateData } from './data/mockData';

const data = generateData(5000);

function App() {
  const [selectedId, setSelectedId] = useState(null);

  const [filter, setFilter] = useState('All');

  const filteredData =
    filter === 'All'
      ? data
      : data.filter(d => d.status === filter);


  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Geo Dashboard</h2>

      <MapView
        data={filteredData}
        selectedId={selectedId}
        onMarkerClick={setSelectedId}
      />

      <TableView
        data={filteredData}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />


      <select
        className="border p-2"
        onChange={e => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

    </div>
  );
}

export default App;
