// Fungsi untuk mendapatkan ID pengunjung (menggunakan localStorage)
export const getVisitorId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

// Fungsi untuk mencatat kunjungan
export const recordVisit = async (): Promise<void> => {
  try {
    const visitorId = getVisitorId();
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'recordVisit',
        data: { visitorId }
      })
    });
  } catch (error) {
    console.error('Error recording visit:', error);
  }
};

// Fungsi untuk mencatat pertanyaan ke ahli
export const recordExpertQuestion = async (category: string): Promise<void> => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'recordExpertQuestion',
        data: { category }
      })
    });
  } catch (error) {
    console.error('Error recording expert question:', error);
  }
};

// Fungsi untuk mendapatkan statistik pengunjung harian
export const getDailyVisitors = async (): Promise<{ date: string; count: number }[]> => {
  try {
    const response = await fetch('/api/analytics?action=dailyVisitors');
    if (!response.ok) throw new Error('Failed to fetch daily visitors');
    return await response.json();
  } catch (error) {
    console.error('Error getting daily visitors:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan statistik pertanyaan per ahli
export const getExpertStats = async (): Promise<{ category: string; questionCount: number }[]> => {
  try {
    const response = await fetch('/api/analytics?action=expertStats');
    if (!response.ok) throw new Error('Failed to fetch expert stats');
    return await response.json();
  } catch (error) {
    console.error('Error getting expert stats:', error);
    return [];
  }
}; 