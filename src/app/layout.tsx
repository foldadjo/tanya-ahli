import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Konsultasi Virtual',
  description: 'Platform konsultasi virtual dengan berbagai ahli',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                <div className="flex justify-between h-24">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <Link href="/" className="flex items-center space-x-2">
                        <div className="relative">
                          <Image
                            src="/logo.png"
                            alt="Tanya Ahli Logo"
                            width={162}
                            height={162}
                            className="dark:brightness-0 dark:invert dark:opacity-90 transition-all duration-300"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link
                        href="/ask"
                        className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Tanya
                      </Link>
                      <Link
                        href="/history"
                        className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Riwayat
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>
            <main>{children}</main>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Tanya Ahli. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 