'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types';
import { getQuestions, deleteQuestion } from '@/lib/storage';
import { getCategoryIcon } from '@/mockup/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Search } from 'lucide-react';
import FeedbackButtons from '@/components/FeedbackButtons';

export default function HistoryPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const savedQuestions = getQuestions();
    setQuestions(savedQuestions);
  };

  const handleDelete = (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) {
      deleteQuestion(questionId);
      loadQuestions();
      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(null);
      }
    }
  };

  const handleFeedbackUpdate = (updatedQuestion: Question) => {
    loadQuestions();
    if (selectedQuestion?.id === updatedQuestion.id) {
      setSelectedQuestion(updatedQuestion);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3 md:mb-4">
            Riwayat Pertanyaan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Lihat kembali pertanyaan dan jawaban sebelumnya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
            <div className="mb-4 md:mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari pertanyaan, kategori, atau jawaban..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-6">
              Daftar Pertanyaan
            </h2>
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">🔍</div>
                <p className="text-gray-500 dark:text-gray-400">
                  {questions.length === 0 
                    ? 'Belum ada riwayat pertanyaan'
                    : 'Tidak ada hasil yang ditemukan'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestion(q)}
                    className={`p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedQuestion?.id === q.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800'
                        : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2 items-end">
                        <span className="text-2xl">{getCategoryIcon(q.category)}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{q.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(q.timestamp)}
                        </span>
                        <button
                          onClick={(e) => handleDelete(q.id, e)}
                          className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
                          title="Hapus pertanyaan"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 line-clamp-2 mb-2 md:mb-3 text-sm md:text-base">{q.question}</p>
                    <FeedbackButtons 
                      question={q} 
                      onFeedbackUpdate={handleFeedbackUpdate}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedQuestion && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-8">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(selectedQuestion.category)}</span>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Detail Pertanyaan
                  </h2>
                </div>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(selectedQuestion.timestamp)}
                  </span>
                  <button
                    onClick={(e) => handleDelete(selectedQuestion.id, e)}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
                    title="Hapus pertanyaan"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    Kategori
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-sm md:text-base">
                    {selectedQuestion.category}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    Pertanyaan
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                    {selectedQuestion.question}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    Jawaban
                  </h3>
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
                      {selectedQuestion.answer}
                    </ReactMarkdown>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Apakah jawaban ini membantu?
                  </h3>
                  <FeedbackButtons 
                    question={selectedQuestion} 
                    onFeedbackUpdate={handleFeedbackUpdate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 