import React from 'react';
import { Target, Star, Clock, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Roster({ players }) {
  const [filter, setFilter] = React.useState('Все');

  const positions = ['Все', 'Вратарь', 'Защитник', 'Полузащитник', 'Нападающий'];

  const filteredPlayers = filter === 'Все' 
    ? players 
    : players.filter(p => p.position === filter);

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Состав Команды</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Игроки ГЛМФ на сезон 2026</p>
        </div>
        
        {/* Horizontal filters */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 overflow-x-auto pb-2">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setFilter(pos)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                filter === pos
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'glass text-slate-650 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredPlayers.map((player) => (
          <motion.div
            layout
            key={player.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/20"
          >
            {/* Background glowing sphere decoration */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-500/15 transition-all pointer-events-none" />

            {/* Avatar & Player Info */}
            <div className="flex items-center space-x-4 mb-5">
              <div className="relative">
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-250 dark:border-slate-800 group-hover:border-emerald-500 transition-colors"
                />
                <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center">
                  {player.number}
                </span>
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-emerald-500 dark:group-hover:text-emerald-450 transition-colors leading-tight">
                  {player.name}
                </h3>
                <span className="inline-block text-xs font-semibold px-2 py-0.5 mt-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {player.position}
                </span>
              </div>
            </div>

            {/* Personal Stats Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 dark:border-slate-800/60 pt-4 text-left">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <Star className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Матчи</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{player.stats.matchesPlayed}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Голы</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{player.stats.goals}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded bg-teal-500/10 text-teal-500 dark:text-teal-400">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Пасы</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{player.stats.assists}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">Минуты</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{player.stats.minutes}'</p>
                </div>
              </div>
            </div>

            {/* MVP Badge */}
            {player.stats.mvp > 0 && (
              <div className="absolute top-3 right-3 flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold">
                <Heart className="w-2.5 h-2.5 fill-current" />
                <span>{player.stats.mvp} MVP</span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
