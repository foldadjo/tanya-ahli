'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExpertCategory } from '@/types';
import { categoryIcons } from '@/mockup/icons';

const expertCategories: ExpertCategory[] = [
  'Konsultan Politik',
  'Konsultan Hukum', 
  'Psikolog',
  'Ustad',
  'Pendeta',
  'Dokter Umum',
  'Ahli Keuangan',
  'Ahli Teknologi',
  'Guru Karir',
  'Ahli Sejarah',
  'Ahli Kebumian',
  'Ahli Quran',
  'Ahli Filsafat',
  'Ahli Biologi',
  'Ahli Nutrisi',
  'Ahli Parenting',
  'Ahli Linguistik',
  'Ahli Seni',
  'Ahli Musik',
  'Ahli Olahraga',
  'Ahli Pertanian',
  'Ahli Peternakan',
  'Ahli Perikanan',
  'Ahli Arsitektur',
  'Ahli Interior',
  'Konsultan Pernikahan',
  'Konsultan Bisnis',
  'Konsultan Pendidikan'
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = expertCategories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-4 md:mb-6">
              Tanya Ahli
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12">
              Platform konsultasi virtual dengan para ahli di berbagai bidang
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari kategori ahli..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent shadow-lg"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredCategories.map((category) => (
            <Link
              key={category}
              href={`/ask?category=${encodeURIComponent(category)}`}
              className="group"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-gray-100 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-400/5 dark:via-purple-400/5 dark:to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-8 relative">
                  <div className="text-4xl md:text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {category}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    Konsultasi dengan {category.toLowerCase()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* History Link */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center">
          <Link
            href="/history"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 text-white rounded-full font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Lihat Riwayat Pertanyaan</span>
          </Link>
        </div>
      </div>
    </main>
  );
} 