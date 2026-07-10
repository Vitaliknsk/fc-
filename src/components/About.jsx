import React from 'react';
import { Calendar, MapPin, Award, Star, History, Compass } from 'lucide-react';
import { teamAboutInfo } from '../data/mockData';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="py-6 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-left mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">О Команде</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">История ФК Аврора и наши достижения</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        {/* Main Content (History & Details) */}
        <div className="lg:col-span-2 space-y-6">
          {/* History */}
          <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6">
            <h3 className="font-extrabold text-slate-800 dark:text-white text-lg mb-4 flex items-center space-x-2">
              <History className="w-5 h-5 text-emerald-500" />
              <span>Наша История</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-305 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {teamAboutInfo.history}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-5 flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-450 dark:text-slate-500 font-semibold uppercase">Год основания</p>
                <p className="text-lg font-black text-slate-800 dark:text-white">{teamAboutInfo.founded} год</p>
              </div>
            </div>

            <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-5 flex items-center space-x-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-450 dark:text-slate-500 font-semibold uppercase">Домашний стадион</p>
                <p className="text-sm font-black text-slate-800 dark:text-white leading-snug">{teamAboutInfo.homePitch}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trophy Cabinet Column (Column 3) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6 bg-gradient-to-b from-indigo-900/10 via-aurora-card/75 to-purple-900/10">
            <h3 className="font-extrabold text-slate-850 dark:text-white text-lg mb-6 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500 animate-pulse" />
              <span>Кабинет Трофеев</span>
            </h3>

            <div className="space-y-4">
              {teamAboutInfo.achievements.map((ach, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all flex items-start space-x-3.5 text-left group"
                >
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">{ach.year}</span>
                    <h4 className="font-bold text-sm text-slate-200 group-hover:text-white leading-tight mt-0.5">
                      {ach.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
