export const generateData = (count = 5000) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    project: `Project ${i + 1}`,
    lat: 28 + Math.random() * 5,
    lng: 77 + Math.random() * 5,
    status: i % 2 === 0 ? 'Active' : 'Completed',
    updated: `2026-01-${(i % 28) + 1}`
  }));
};
