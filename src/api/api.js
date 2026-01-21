import { generateData } from './mockData';

const ALL_DATA = generateData(5000);

export const fetchData = async (page, limit) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));

    const start = page * limit;

    return {
      data: ALL_DATA.slice(start, start + limit),
      total: ALL_DATA.length
    };
  } catch (error) {
    console.error('Error while fetching data:', error);
  }
}
