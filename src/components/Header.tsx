'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MessageSquare, History } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-32 h-16">
                  <Image
                    src="/logo.png"
                    alt="Tanya Ahli Logo"
                    fill
                    className="object-contain dark:brightness-0 dark:invert dark:opacity-90 transition-all duration-300"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <Link
                href="/ask"
                className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Tanya</span>
              </Link>
              <Link
                href="/history"
                className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <History className="w-5 h-5" />
                <span>Riwayat</span>
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-transform duration-300"
              >
                <div className="relative w-6 h-6">
                  <X 
                    className={`absolute w-6 h-6 transition-all duration-300 ${
                      isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                    }`}
                  />
                  <Menu 
                    className={`absolute w-6 h-6 transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`sm:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-48 opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/ask"
              className={`block text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition-all duration-300 ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '100ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Tanya</span>
            </Link>
            <Link
              href="/history"
              className={`block text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition-all duration-300 ${
                isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <History className="w-5 h-5" />
              <span>Riwayat</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 