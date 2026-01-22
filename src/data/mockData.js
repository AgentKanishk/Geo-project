export function generateData(count) {
  const statuses = ['Active', 'Completed'];
  const data = [];
  
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      project: `Project ${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lat: 28.6 + (Math.random() - 0.5) * 10,
      lng: 77.2 + (Math.random() - 0.5) * 10,
    });
  }
  
  return data;
}