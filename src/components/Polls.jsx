import React from 'react';
import { Vote, Users, Shield, Plus, Clock, HelpCircle, Trash2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Polls({ 
  polls, 
  players, 
  isAdmin, 
  onVote, 
  onCreatePoll, 
  onDeletePoll,
  currentUser
}) {
  // Poll creation states
  const [newPollTitle, setNewPollTitle] = React.useState('');
  const [newPollDesc, setNewPollDesc] = React.useState('');
  const [newPollOptions, setNewPollOptions] = React.useState(['', '']);
  const [newPollDeadline, setNewPollDeadline] = React.useState('');
  const [newPollAnonymous, setNewPollAnonymous] = React.useState(false);

  const activeVoterId = currentUser?.id || null;

  const handleAddOption = () => {
    setNewPollOptions([...newPollOptions, '']);
  };

  const handleOptionChange = (index, val) => {
    const updated = [...newPollOptions];
    updated[index] = val;
    setNewPollOptions(updated);
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    const cleanOptions = newPollOptions.filter(o => o.trim() !== '');
    if (!newPollTitle || cleanOptions.length < 2) return;

    onCreatePoll({
      title: newPollTitle,
      description: newPollDesc,
      options: cleanOptions.map(opt => ({ text: opt, votes: [] })),
      deadline: newPollDeadline || new Date(Date.now() + 86400000 * 3).toISOString(),
      anonymous: newPollAnonymous,
      createdBy: isAdmin ? 'Администратор' : 'Капитан',
      active: true
    });

    setNewPollTitle('');
    setNewPollDesc('');
    setNewPollOptions(['', '']);
    setNewPollDeadline('');
    setNewPollAnonymous(false);
  };

  return (
    <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-left">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Голосования команды</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Опросы, MVP матчей и организационные вопросы</p>
        </div>

        {/* Auth status display */}
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          {currentUser ? (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-semibold text-emerald-500">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-5 h-5 rounded-full object-cover" />
              <span>Голос игрока: {currentUser.name.split(' ')[0]}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-xs font-semibold">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Войдите через Telegram</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poll List */}
        <div className="lg:col-span-2 space-y-6">
          {polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, o) => sum + o.votes.length, 0);
            
            // Check if active player already voted
            const userVoteIndex = activeVoterId 
              ? poll.options.findIndex(o => o.votes.includes(activeVoterId)) 
              : -1;
            const hasVoted = userVoteIndex !== -1;

            const isExpired = new Date(poll.deadline) < new Date();

            return (
              <div 
                key={poll.id}
                className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6 text-left relative overflow-hidden"
              >
                {/* Badges row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      poll.active && !isExpired
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-slate-300/20 text-slate-400 dark:text-slate-500'
                    }`}>
                      {poll.active && !isExpired ? 'Активен' : 'Завершен'}
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded font-bold uppercase">
                      {poll.anonymous ? 'Анонимный' : 'Открытый'}
                    </span>
                  </div>
                  
                  {isAdmin && (
                    <button
                      onClick={() => onDeletePoll(poll.id)}
                      className="p-1.5 bg-slate-100 hover:bg-rose-500/15 dark:bg-slate-850 dark:hover:bg-rose-500/25 text-slate-400 hover:text-rose-500 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="font-extrabold text-slate-800 dark:text-slate-150 text-lg leading-snug">{poll.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">{poll.description}</p>

                {/* Options List */}
                <div className="space-y-4 mb-6">
                  {poll.options.map((option, optIdx) => {
                    const optVotes = option.votes.length;
                    const percent = totalVotes > 0 ? Math.round((optVotes / totalVotes) * 100) : 0;
                    const isSelected = userVoteIndex === optIdx;

                    return (
                      <div key={optIdx} className="space-y-1.5">
                        <button
                          disabled={!poll.active || isExpired || !activeVoterId}
                          onClick={() => onVote(poll.id, optIdx, activeVoterId)}
                          className={`w-full relative p-3 rounded-xl border text-left overflow-hidden transition-all group ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500/5'
                              : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-850/30'
                          } ${!activeVoterId ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {/* Progress Bar */}
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-emerald-500/5 dark:bg-emerald-500/10 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />

                          <div className="relative z-10 flex items-center justify-between">
                            <span className={`text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-450 ${
                              isSelected ? 'text-emerald-500 font-bold' : ''
                            }`}>
                              {option.text}
                            </span>
                            <span className="text-xs font-black text-slate-500 dark:text-slate-400">
                              {percent}% ({optVotes})
                            </span>
                          </div>
                        </button>

                        {/* List of Voters (if open poll) */}
                        {!poll.anonymous && optVotes > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pl-2">
                            {option.votes.map(voterId => {
                              const voter = players.find(p => p.id === voterId);
                              if (!voter) return null;
                              return (
                                <div 
                                  key={voterId} 
                                  className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-800"
                                  title={voter.name}
                                >
                                  <img src={voter.avatar} alt={voter.name} className="w-4.5 h-4.5 rounded-full object-cover" />
                                  <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">{voter.name.split(' ')[0]}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer specs */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/60 pt-4 text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Всего проголосовало: {totalVotes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>До: {new Date(poll.deadline).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Left Column: Poll Creator (Admins/Captains only) */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6 text-left relative overflow-hidden">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-4 h-4 text-rose-500" />
              <h3 className="font-extrabold text-slate-850 dark:text-white uppercase tracking-wider text-xs">Создать Опрос</h3>
            </div>
            
            <form onSubmit={handleCreatePoll} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Вопрос</label>
                <input
                  type="text"
                  value={newPollTitle}
                  onChange={(e) => setNewPollTitle(e.target.value)}
                  placeholder="Напр. Во сколько сбор?"
                  required
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Описание</label>
                <textarea
                  value={newPollDesc}
                  onChange={(e) => setNewPollDesc(e.target.value)}
                  placeholder="Дополнительные детали..."
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Варианты ответов</label>
                <div className="space-y-2">
                  {newPollOptions.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Вариант ${idx + 1}`}
                      required={idx < 2}
                      className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="mt-2 text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить вариант</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Дедлайн</label>
                  <input
                    type="date"
                    value={newPollDeadline}
                    onChange={(e) => setNewPollDeadline(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-end mt-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPollAnonymous}
                      onChange={(e) => setNewPollAnonymous(e.target.checked)}
                      className="rounded border-slate-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase">Анонимно</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1"
              >
                <Vote className="w-4 h-4" />
                <span>Создать опрос</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
