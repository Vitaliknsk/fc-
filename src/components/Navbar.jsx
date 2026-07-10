import React from 'react';
import { Sun, Moon, Shield, Menu, X, Trophy } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode, isAdmin, setIsAdmin }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'roster', label: 'Состав' },
    { id: 'leaderboard', label: 'Лидеры' },
    { id: 'attendance', label: 'Посещаемость' },
    { id: 'polls', label: 'Голосования' },
    { id: 'news', label: 'Матчи и Новости' },
    { id: 'about', label: 'О клубе' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/50 dark:border-slate-800/40 w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 shadow-[0_0_15px_rgba(16,185,129,0.3)] mr-3 overflow-hidden">
              <Trophy className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent uppercase">
              ФК АВРОРА
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-semibold border-b-2 border-emerald-500 rounded-b-none'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-emerald-500 dark:hover:text-emerald-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Admin Toggle */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                isAdmin
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 dark:text-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                  : 'bg-slate-100 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Переключить режим Администратора"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Админ' : 'Игрок'}</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Admin Toggle Mobile */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`p-1.5 rounded-lg border ${
                isAdmin ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <Shield className="w-4 h-4" />
            </button>
            
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400"
            >
              {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-aurora-card/95 border-b border-slate-200 dark:border-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
