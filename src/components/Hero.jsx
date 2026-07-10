import React from 'react';
import { Calendar, MapPin, Award, Users, DollarSign, ArrowRight, Check, X, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ setActiveTab, nextEvent, onRsvp, players, matches, events }) {
  // Compute team-wide stats
  const totalMatches = matches.filter(m => m.status === 'completed').length;
  const wins = matches.filter(m => m.status === 'completed' && m.score && parseInt(m.score.split(':')[0]) > parseInt(m.score.split(':')[1])).length;
  const draws = matches.filter(m => m.status === 'completed' && m.score && parseInt(m.score.split(':')[0]) === parseInt(m.score.split(':')[1])).length;
  
  // Calculate average attendance
  const completedEvents = events.filter(e => e.completed);
  let totalAttendancePercent = 0;
  if (completedEvents.length > 0) {
    const totalPossibleSlots = completedEvents.length * players.length;
    let actualAttendanceCount = 0;
    completedEvents.forEach(e => {
      Object.values(e.attendance).forEach(val => {
        if (val) actualAttendanceCount++;
      });
    });
    totalAttendancePercent = Math.round((actualAttendanceCount / totalPossibleSlots) * 100);
  } else {
    totalAttendancePercent = 92; // default mock
  }

  // Count active polls
  const activePollsCount = 2; // mock count

  return (
    <div className="relative overflow-hidden pt-4 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with absolute gradient decoration */}
        <div className="relative rounded-3xl overflow-hidden glass border border-slate-200/50 dark:border-slate-800/40 p-8 sm:p-12 mb-12 bg-gradient-to-br from-indigo-900/20 via-aurora-card/85 to-emerald-950/20 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Team intro */}
            <div className="lg:col-span-3 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ЛФЛ • Высший Дивизион</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-none"
              >
                Футбольный Клуб <br/>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                  АВРОРА
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-600 dark:text-slate-350 max-w-xl text-base sm:text-lg mb-8"
              >
                Официальный портал футбольной команды Аврора. Статистика, расписание тренировок и матчей, система учета взносов и интерактивные голосования в одном месте.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => setActiveTab('roster')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-650 text-white font-medium shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <span>Состав команды</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('polls')}
                  className="px-6 py-3 rounded-xl glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850 font-medium transition-all"
                >
                  Голосования
                </button>
              </motion.div>
            </div>

            {/* Next Match Promo Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-slate-900/50 dark:bg-aurora-card/80 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1 rounded-bl-xl font-bold uppercase border-l border-b border-indigo-500/20">
                Предстоящий матч
              </div>
              
              {nextEvent ? (
                <div className="text-left mt-2">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{new Date(nextEvent.date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-150 mb-1 leading-tight">{nextEvent.title}</h3>
                  <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-6">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span className="truncate">{nextEvent.location}</span>
                  </div>

                  <div className="border-t border-slate-800 pt-4">
                    <p className="text-xs text-slate-400 mb-3 font-semibold">Ваше участие:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => onRsvp(nextEvent.id, true)}
                        className="flex items-center justify-center space-x-1 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-semibold transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Буду</span>
                      </button>
                      <button
                        onClick={() => onRsvp(nextEvent.id, false)}
                        className="flex items-center justify-center space-x-1 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-sm font-semibold transition-all"
                      >
                        <X className="w-4 h-4" />
                        <span>Не смогу</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShieldAlert className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-slate-400 text-sm">Нет запланированных матчей в ближайшие дни.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { label: "Сыграно Матчей", value: totalMatches, icon: Calendar, color: "text-indigo-400 bg-indigo-500/10" },
            { label: "Побед команды", value: wins, icon: Award, color: "text-emerald-400 bg-emerald-500/10" },
            { label: "Ср. посещаемость", value: `${totalAttendancePercent}%`, icon: Users, color: "text-teal-400 bg-teal-500/10" },
            { label: "Активные опросы", value: activePollsCount, icon: DollarSign, color: "text-pink-400 bg-pink-500/10" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              className="glass border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-5 text-left flex items-center justify-between"
            >
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
