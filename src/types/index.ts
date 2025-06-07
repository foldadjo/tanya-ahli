export type ExpertCategory =
  | 'Konsultan Politik'
  | 'Konsultan Hukum'
  | 'Psikolog'
  | 'Ustad'
  | 'Pendeta'
  | 'Dokter Umum'
  | 'Ahli Keuangan'
  | 'Ahli Teknologi'
  | 'Guru Karir'
  | 'Ahli Sejarah'
  | 'Ahli Kebumian'
  | 'Ahli Quran'
  | 'Ahli Filsafat'
  | 'Ahli Biologi'
  | 'Ahli Nutrisi'
  | 'Ahli Parenting'
  | 'Ahli Linguistik'
  | 'Ahli Seni'
  | 'Ahli Musik'
  | 'Ahli Olahraga'
  | 'Ahli Pertanian'
  | 'Ahli Peternakan'
  | 'Ahli Perikanan'
  | 'Ahli Arsitektur'
  | 'Ahli Interior'
  | 'Konsultan Pernikahan'
  | 'Konsultan Bisnis'
  | 'Konsultan Pendidikan';

export type FeedbackType = 'helpful' | 'not_helpful';

export interface Question {
  id: string;
  category: ExpertCategory;
  question: string;
  answer: string;
  timestamp: string;
  feedback?: FeedbackType;
}

export interface QuestionFormData {
  category: ExpertCategory;
  question: string;
} 