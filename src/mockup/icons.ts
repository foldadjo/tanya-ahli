export const categoryIcons: Record<string, string> = {
  'Konsultan Politik': '🏛️',
  'Konsultan Hukum': '⚖️',
  'Psikolog': '🧠',
  'Ustad': '🕌',
  'Pendeta': '⛪',
  'Dokter Umum': '🩺',
  'Ahli Keuangan': '💰',
  'Ahli Teknologi': '💻',
  'Guru Karir': '📈',
  'Ahli Sejarah': '📜',
  'Ahli Kebumian': '🌍',
  'Ahli Quran': '📖',
  'Ahli Filsafat': '🤔',
  'Ahli Biologi': '🧬',
  'Ahli Nutrisi': '🥗',
  'Ahli Parenting': '👨‍👩‍👧‍👦',
  'Ahli Linguistik': '🗣️',
  'Ahli Seni': '🎨',
  'Ahli Musik': '🎵',
  'Ahli Olahraga': '🏃‍♂️',
  'Ahli Pertanian': '🌾',
  'Ahli Peternakan': '🐄',
  'Ahli Perikanan': '🐟',
  'Ahli Arsitektur': '🏗️',
  'Ahli Interior': '🛋️',
  'Konsultan Pernikahan': '💑',
  'Konsultan Bisnis': '💼',
  'Konsultan Pendidikan': '🎓'
};

export const getCategoryIcon = (category: string): string => {
  return categoryIcons[category] || '❓';
}; 