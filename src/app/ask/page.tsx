'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExpertCategory, FeedbackType, Question } from '@/types';
import { generateAnswer } from '@/lib/gemini';
import { saveQuestion, updateQuestionFeedback } from '@/lib/storage';
import { getCategoryIcon } from '@/mockup/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const categories: ExpertCategory[] = [
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

export default function AskPage() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ExpertCategory | ''>('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  // Mengambil parameter dari URL saat komponen dimuat
  useEffect(() => {
    const categoryParam = searchParams.get('category') as ExpertCategory;
    const questionParam = searchParams.get('quest');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setCategory(categoryParam);
    }
    
    if (questionParam) {
      setQuestion(decodeURIComponent(questionParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !question) return;

    setLoading(true);
    setAnswer('');

    try {
      const response = await generateAnswer(category, question);
      setAnswer(response);
      
      // Save to localStorage
      const newQuestion: Question = {
        id: Date.now().toString(),
        category,
        question,
        answer: response,
        timestamp: new Date().toISOString(),
      };
      saveQuestion(newQuestion);
      setCurrentQuestionId(newQuestion.id);
    } catch (error) {
      console.error('Error:', error);
      setAnswer('Maaf, terjadi kesalahan saat memproses pertanyaan Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (type: FeedbackType) => {
    if (currentQuestionId) {
      setFeedback(type);
      updateQuestionFeedback(currentQuestionId, type);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3 md:mb-4">
            Tanya Langsung
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Pilih kategori ahli dan ajukan pertanyaan Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-3">
              Pilih Kategori Ahli
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpertCategory)}
                className="w-full p-3 md:p-4 pl-12 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none"
              >
                <option value="">Pilih kategori...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryIcon(cat)} {cat}
                  </option>
                ))}
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                {category && getCategoryIcon(category)}
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-3">
              Pertanyaan Anda
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="w-full p-3 md:p-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Tulis pertanyaan Anda di sini..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 md:py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg text-sm md:text-base"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </div>
            ) : (
              'Tanyakan'
            )}
          </button>
        </form>

        {answer && (
          <div className="mt-8 md:mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-6">Jawaban:</h2>
            <div className="prose prose-lg max-w-none prose-blue dark:prose-invert">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({...props}) => <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4" {...props} />,
                  h2: ({...props}) => <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 md:mb-3" {...props} />,
                  h3: ({...props}) => <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2" {...props} />,
                  p: ({...props}) => <p className="text-gray-700 dark:text-gray-300 mb-3 md:mb-4 leading-relaxed" {...props} />,
                  ul: ({...props}) => <ul className="list-disc list-inside mb-3 md:mb-4 space-y-1 md:space-y-2" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal list-inside mb-3 md:mb-4 space-y-1 md:space-y-2" {...props} />,
                  li: ({...props}) => <li className="text-gray-700 dark:text-gray-300" {...props} />,
                  blockquote: ({...props}) => (
                    <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-3 md:my-4" {...props} />
                  ),
                  code: ({className, children, ...props}: React.ComponentPropsWithoutRef<'code'>) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !match ? (
                      <code className="bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 text-sm font-mono" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-gray-100 dark:bg-gray-700 rounded p-3 md:p-4 text-sm font-mono my-3 md:my-4 overflow-x-auto" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({...props}) => (
                    <pre className="bg-gray-100 dark:bg-gray-700 rounded p-3 md:p-4 text-sm font-mono my-3 md:my-4 overflow-x-auto" {...props} />
                  ),
                  a: ({...props}) => (
                    <a className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline" {...props} />
                  ),
                  table: ({...props}) => (
                    <div className="overflow-x-auto my-3 md:my-4">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
                    </div>
                  ),
                  th: ({...props}) => (
                    <th className="px-4 md:px-6 py-2 md:py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />
                  ),
                  td: ({...props}) => (
                    <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" {...props} />
                  ),
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>
            
            {!feedback && (
              <div className="mt-6 md:mt-8 flex justify-center space-x-6">
                <button
                  onClick={() => handleFeedback('helpful')}
                  className="text-2xl md:text-3xl hover:scale-125 transition-transform duration-300"
                  title="Suka"
                >
                  👍
                </button>
                <button
                  onClick={() => handleFeedback('not_helpful')}
                  className="text-2xl md:text-3xl hover:scale-125 transition-transform duration-300"
                  title="Tidak Suka"
                >
                  👎
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
} 