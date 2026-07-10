import React from 'react';
import { ArrowUp, ArrowDown, ArrowRight, ShieldCheck, Target, Award, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Leaderboard({ players }) {
  const [metric, setMetric] = React.useState('goals'); // goals, assists, points, mvp, matches

  const metrics = [
    { id: 'goals', label: 'Голы', icon: Target, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'assists', label: 'Ассисты', icon: Award, color: 'text-teal-500 bg-teal-500/10' },
    { id: 'points', label: 'Гол + Пас', icon: Star, color: 'text-indigo-500 bg-indigo-500/10' },
    { id: 'mvp', label: 'MVP матчей', icon: Heart, color: 'text-rose-500 bg-rose-500/10' },
  ];

  // Calculate values based on selected metric
  const getPlayerValue = (player, metricId) => {
    switch (metricId) {
      case 'goals':
        return player.stats.goals;
      case 'assists':
        return player.stats.assists;
      case 'points':
        return player.stats.goals + player.stats.assists;
      case 'mvp':
        return player.stats.mvp;
      default:
        return 0;
    }
  };

  // Sort players by the selected metric
  const sortedPlayers = [...players].sort((a, b) => {
    const valA = getPlayerValue(a, metric);
    const valB = getPlayerValue(b, metric);
    return valB - valA;
  });

  const maxVal = Math.max(...players.map(p => getPlayerValue(p, metric)), 1);

  // Render change indicator
  const renderTrend = (changeType) => {
    switch (changeType) {
      case 'up':
        return (
          <span className="inline-flex items-center text-emerald-500 dark:text-emerald-400 text-xs font-bold space-x-0.5">
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Вверх</span>
          </span>
        );
      case 'down':
        return (
          <span className="inline-flex items-center text-rose-500 dark:text-rose-450 text-xs font-bold space-x-0.5">
            <ArrowDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Вниз</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-slate-400 dark:text-slate-500 text-xs font-medium space-x-0.5">
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Без изм.</span>
          </span>
        );
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-left mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Таблица Лидеров</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Рейтинг игроков команды в реальном времени</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setMetric(item.id)}
              className={`flex items-center justify-center space-x-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                metric === item.id
                  ? 'bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 border-emerald-500/30 text-emerald-500 dark:text-emerald-400 shadow-md'
                  : 'glass border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className={`p-1 rounded-md ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Leaderboard List */}
      <div className="glass border border-slate-200/50 dark:border-slate-800/40 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-150 dark:divide-slate-800/50">
          {sortedPlayers.map((player, index) => {
            const val = getPlayerValue(player, metric);
            const percent = (val / maxVal) * 100;
            const trend = player.rankChanges[metric] || 'flat';

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 hover:bg-slate-100/50 dark:hover:bg-slate-850/30 transition-colors"
              >
                {/* Left side: Rank, Avatar, Name */}
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 mr-4">
                  {/* Rank Badge */}
                  <span className={`w-6 text-center font-black text-sm ${
                    index === 0 ? 'text-amber-500 text-lg' : 
                    index === 1 ? 'text-slate-400 text-base' : 
                    index === 2 ? 'text-amber-700 text-base' : 
                    'text-slate-400 dark:text-slate-600'
                  }`}>
                    {index + 1}
                  </span>

                  {/* Avatar */}
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-850"
                  />

                  {/* Name and progress bar container */}
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base truncate">
                        {player.name}
                      </span>
                      <span className="font-black text-sm text-emerald-500 dark:text-emerald-400 ml-2">
                        {val}
                      </span>
                    </div>

                    {/* Progress Bar background */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Right side: Trend arrow */}
                <div className="flex items-center justify-end w-20 text-right">
                  {renderTrend(trend)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
