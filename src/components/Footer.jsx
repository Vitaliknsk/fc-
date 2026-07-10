import React from 'react';
import { Mail, Phone, MessageCircle, Heart, Trophy } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/40 glass py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-500 dark:text-slate-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center space-x-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm tracking-wide">ГЛМФ</p>
              <p className="text-[10px] text-slate-400">Любительский Футбольный Клуб © {new Date().getFullYear()}</p>
            </div>
          </div>

          {/* Captain/Admin contacts */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="tel:+79991234567" 
              className="flex items-center space-x-2 hover:text-emerald-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+7 (999) 123-45-67 (Капитан)</span>
            </a>
            <a 
              href="mailto:fc.aurora@gmail.com" 
              className="flex items-center space-x-2 hover:text-emerald-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>fc.aurora@gmail.com</span>
            </a>
            <a 
              href="https://t.me/fc_aurora_mock" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-2 hover:text-emerald-500 transition-colors text-indigo-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Чат в Telegram</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/20 text-center text-xs">
          <p className="flex items-center justify-center space-x-1">
            <span>Сделано с</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
            <span>для футболистов и их болельщиков</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
