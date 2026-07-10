import React from 'react';
import { Calendar, Clock, Trophy, MapPin, Newspaper, ChevronRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsMatches({ news, matches }) {
  const [selectedNewsId, setSelectedNewsId] = React.useState(null);

  const activeNewsItem = news.find(n => n.id === selectedNewsId);

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-left mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Календарь и Новости</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Официальные новости ФК Аврора и расписание матчей лиги</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Matches Section (Column 1) */}
        <div className="lg:col-span-1 space-y-6 text-left">
          <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-6 flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-emerald-500 animate-bounce" />
              <span>Расписание матчей</span>
            </h3>

            <div className="space-y-4">
              {matches.map((match) => {
                const dateObj = new Date(match.date);
                const isCompleted = match.status === 'completed';

                return (
                  <div 
                    key={match.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/50 relative overflow-hidden"
                  >
                    {/* Badge */}
                    <span className={`absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      isCompleted 
                        ? 'bg-slate-350 dark:bg-slate-800 text-slate-500' 
                        : 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                    }`}>
                      {isCompleted ? 'Сыгран' : 'Предстоит'}
                    </span>

                    <div className="text-xs text-slate-400 mb-1.5 font-semibold">
                      {match.type}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-extrabold text-slate-800 dark:text-white text-base leading-tight">
                          {match.home ? 'Аврора' : match.opponent}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 font-medium">против</p>
                        <p className="font-extrabold text-slate-800 dark:text-white text-base leading-tight">
                          {match.home ? match.opponent : 'Аврора'}
                        </p>
                      </div>

                      {/* Score or Calendar info */}
                      {isCompleted ? (
                        <div className="bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 rounded-xl px-4 py-2 text-center">
                          <p className="text-lg font-black tracking-widest">{match.score}</p>
                        </div>
                      ) : (
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-bold">
                            {dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                          </p>
                          <p className="text-xs text-slate-400 font-bold flex items-center justify-end space-x-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-indigo-400" />
                            <span>{dateObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {match.ourGoals && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-850 pt-2 font-medium italic">
                        Голы: {match.ourGoals}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* News Section (Column 2 & 3) */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item) => (
              <div 
                key={item.id}
                className="group rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 border border-slate-700 text-white text-[10px] px-2.5 py-0.5 rounded-lg font-semibold flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</span>
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-base leading-snug group-hover:text-emerald-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-550 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-5">
                    <button
                      onClick={() => setSelectedNewsId(item.id)}
                      className="text-xs font-bold text-emerald-500 hover:text-emerald-450 flex items-center space-x-1"
                    >
                      <span>Читать подробнее</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full News Overlay Modal */}
      <AnimatePresence>
        {activeNewsItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-aurora-card max-w-2xl w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-2xl relative max-h-[85vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-64 overflow-hidden">
                <img src={activeNewsItem.image} alt={activeNewsItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button
                  onClick={() => setSelectedNewsId(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-left">
                  <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold uppercase">Новость</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mt-1">{activeNewsItem.title}</h3>
                </div>
              </div>

              {/* Scrollable text content */}
              <div className="p-6 text-left overflow-y-auto space-y-4 flex-1">
                <p className="text-slate-450 dark:text-slate-500 text-xs font-semibold">
                  Дата публикации: {new Date(activeNewsItem.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium border-l-2 border-emerald-500 pl-3 leading-relaxed">
                  {activeNewsItem.summary}
                </p>
                <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-line">
                  {activeNewsItem.content}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedNewsId(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-250 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-all"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
