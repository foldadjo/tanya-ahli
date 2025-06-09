'use client';

import { useState, useEffect } from 'react';
import { getDailyVisitors, getExpertStats } from '@/lib/analytics';
import { getCategoryIcon } from '@/mockup/icons';

interface DailyVisitor {
  date: string;
  count: number;
}

interface ExpertStat {
  category: string;
  questionCount: number;
}

export default function AdminPage() {
  const [dailyVisitors, setDailyVisitors] = useState<DailyVisitor[]>([]);
  const [expertStats, setExpertStats] = useState<ExpertStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitors, experts] = await Promise.all([
          getDailyVisitors(),
          getExpertStats()
        ]);
        setDailyVisitors(visitors);
        setExpertStats(experts);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3 md:mb-4">
            Dashboard Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Statistik Pengunjung dan Pertanyaan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Pengunjung Harian */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-6">
              Pengunjung Harian
            </h2>
            {dailyVisitors.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Belum ada data pengunjung
              </p>
            ) : (
              <div className="space-y-4">
                {dailyVisitors.map((visitor) => (
                  <div
                    key={visitor.date}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {new Date(visitor.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {visitor.count} pengunjung
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Statistik Ahli */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-6">
              Statistik Pertanyaan per Ahli
            </h2>
            {expertStats.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Belum ada data pertanyaan
              </p>
            ) : (
              <div className="space-y-4">
                {expertStats.map((stat) => (
                  <div
                    key={stat.category}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(stat.category)}</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {stat.category}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                      {stat.questionCount} pertanyaan
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 