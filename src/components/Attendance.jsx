import React from 'react';
import { Calendar, CheckCircle2, XCircle, CreditCard, DollarSign, Plus, UserCheck, Shield, ChevronDown, Check, Trash2, ArrowUpRight, MessageCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Attendance({ 
  players, 
  events, 
  payments, 
  isAdmin, 
  onToggleAttendance, 
  onAddEvent, 
  onAddPayment, 
  onVerifyPayment,
  onDeleteEvent,
  onUpdateInitialBalance,
  onSendTelegramReminder,
  currentUser
}) {
  const [selectedPlayerId, setSelectedPlayerId] = React.useState(currentUser?.id || players[0]?.id || '');
  const [newEventTitle, setNewEventTitle] = React.useState('');
  const [newEventDate, setNewEventDate] = React.useState('');
  const [newEventType, setNewEventType] = React.useState('training');
  const [newEventLocation, setNewEventLocation] = React.useState('');
  
  // Admin manual balance states
  const [manualBalanceInput, setManualBalanceInput] = React.useState('');

  const [paymentAmount, setPaymentAmount] = React.useState('');
  const [paymentDesc, setPaymentDesc] = React.useState('Взнос на карту');
  
  // Sync selected player when currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      setSelectedPlayerId(currentUser.id);
    }
  }, [currentUser]);

  const activePlayer = players.find(p => p.id === selectedPlayerId) || players[0];

  // Calculations for active player
  const playerEvents = events.filter(e => e.completed);
  const attendedEventsCount = playerEvents.filter(e => e.attendance[selectedPlayerId] === true).length;
  const attendanceRate = playerEvents.length > 0 ? Math.round((attendedEventsCount / playerEvents.length) * 100) : 100;

  // Deduct 400 rubles per completed event if RSVP is true (present)
  const totalCostIncurred = playerEvents.filter(e => e.attendance[selectedPlayerId] === true).length * 400;

  // Total paid by player
  const verifiedPayments = payments.filter(p => p.playerId === selectedPlayerId && p.type === 'payment' && p.verified);
  const totalPaid = verifiedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.playerId === selectedPlayerId && p.type === 'payment' && !p.verified);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  
  const initialBal = activePlayer?.initialBalance || 0;
  const balance = initialBal - totalCostIncurred + totalPaid;

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (!paymentAmount || isNaN(paymentAmount)) return;
    
    onAddPayment({
      playerId: selectedPlayerId,
      amount: parseInt(paymentAmount),
      description: paymentDesc,
      date: new Date().toISOString().split('T')[0],
      type: 'payment',
      verified: false
    });
    setPaymentAmount('');
    setPaymentDesc('Взнос на карту');
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventLocation) return;
    
    onAddEvent({
      title: newEventTitle,
      date: newEventDate,
      type: newEventType,
      cost: 400, // Fixed 400 RUB
      location: newEventLocation,
      completed: false
    });

    setNewEventTitle('');
    setNewEventDate('');
    setNewEventLocation('');
  };

  const handleSaveBalance = (e) => {
    e.preventDefault();
    if (!manualBalanceInput || isNaN(manualBalanceInput)) return;
    onUpdateInitialBalance(selectedPlayerId, parseInt(manualBalanceInput));
    setManualBalanceInput('');
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Selection Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Посещаемость и Взносы</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {isAdmin ? 'Панель управления администратора' : 'Кабинет учета посещений и финансов игрока'}
          </p>
        </div>

        {/* Player Switcher */}
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Игрок:</label>
          <div className="relative">
            <select
              value={selectedPlayerId}
              onChange={(e) => setSelectedPlayerId(e.target.value)}
              className="appearance-none pr-8 pl-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-aurora-card/65 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/80 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Player Stats & Dues Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6 bg-gradient-to-b from-slate-50/50 to-slate-100/50 dark:from-aurora-card/40 dark:to-slate-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
            
            {/* Player Profile Brief */}
            <div className="flex items-center space-x-3 mb-6">
              <img src={activePlayer?.avatar} alt={activePlayer?.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-800" />
              <div className="text-left">
                <p className="font-extrabold text-slate-800 dark:text-white leading-tight">{activePlayer?.name}</p>
                <p className="text-xs text-slate-450 font-medium">Номер {activePlayer?.number} • {activePlayer?.position}</p>
              </div>
            </div>

            {/* Financial summary */}
            <div className="space-y-4 border-t border-slate-200 dark:border-slate-800/60 pt-4 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Начальный баланс (установлен):</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{initialBal} ₽</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Списано за посещения ({attendedEventsCount} × 400 ₽):</span>
                <span className="font-bold text-rose-500">-{totalCostIncurred} ₽</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Внесено оплат:</span>
                <span className="font-bold text-emerald-500">+{totalPaid} ₽</span>
              </div>

              {totalPending > 0 && (
                <div className="flex justify-between items-center text-amber-500 text-xs">
                  <span>Ожидает проверки:</span>
                  <span>+{totalPending} ₽</span>
                </div>
              )}

              {/* Balance card */}
              <div className={`p-4 rounded-xl mt-4 border flex items-center justify-between ${
                balance >= 0 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 dark:text-emerald-450' 
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-500 dark:text-rose-400'
              }`}>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider">Текущий баланс</p>
                  <p className="text-xl font-black">{balance} ₽</p>
                </div>
                <CreditCard className="w-6 h-6 opacity-80" />
              </div>

              {/* Debt alert & Telegram reminder button */}
              {balance < 0 && (
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                  <div className="flex items-start space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] font-semibold leading-relaxed">Внимание! У игрока отрицательный баланс.</p>
                  </div>
                  <button
                    onClick={() => onSendTelegramReminder(activePlayer, balance)}
                    className="w-full py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Напомнить в TG</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Player Submit payment notification Form */}
          {!isAdmin && (
            <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6 text-left">
              <h3 className="font-extrabold text-slate-800 dark:text-white mb-4">Сообщить об оплате</h3>
              <form onSubmit={handleSubmitPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Сумма платежа (₽)</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Пример: 1500"
                    required
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Комментарий</label>
                  <input
                    type="text"
                    value={paymentDesc}
                    onChange={(e) => setPaymentDesc(e.target.value)}
                    placeholder="Взнос за тренировки"
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center space-x-1"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Отправить уведомление</span>
                </button>
              </form>
            </div>
          )}

          {/* Admin Tools: Edit player balance manually & Create Event */}
          {isAdmin && (
            <div className="space-y-4">
              {/* Balance Editor */}
              <div className="rounded-2xl glass border border-rose-500/20 dark:border-rose-500/10 p-6 text-left relative overflow-hidden bg-rose-500/[0.01]">
                <div className="flex items-center space-x-2 text-rose-500 mb-4">
                  <Shield className="w-4 h-4" />
                  <h3 className="font-extrabold uppercase tracking-wide text-xs">Установить баланс игроку</h3>
                </div>
                <form onSubmit={handleSaveBalance} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Стартовый баланс для {activePlayer?.name.split(' ')[0]} (₽)
                    </label>
                    <input
                      type="number"
                      value={manualBalanceInput}
                      onChange={(e) => setManualBalanceInput(e.target.value)}
                      placeholder={`Текущий: ${initialBal}`}
                      required
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Применить баланс
                  </button>
                </form>
              </div>

              {/* Create Event */}
              <div className="rounded-2xl glass border border-rose-500/20 dark:border-rose-500/10 p-6 text-left relative overflow-hidden bg-rose-500/[0.01]">
                <div className="flex items-center space-x-2 text-rose-500 mb-4">
                  <Shield className="w-4 h-4" />
                  <h3 className="font-extrabold uppercase tracking-wide text-xs">Создать событие (Админ)</h3>
                </div>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Название</label>
                    <input
                      type="text"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder="Напр. Тренировка Арена"
                      required
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Тип</label>
                      <select
                        value={newEventType}
                        onChange={(e) => setNewEventType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none"
                      >
                        <option value="training">Тренировка</option>
                        <option value="match">Матч</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Списание</label>
                      <input
                        type="text"
                        disabled
                        value="400 ₽"
                        className="w-full px-3 py-2 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-850 rounded-lg text-xs text-slate-500 dark:text-slate-400 font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Дата и Время</label>
                    <input
                      type="datetime-local"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Локация</label>
                    <input
                      type="text"
                      value={newEventLocation}
                      onChange={(e) => setNewEventLocation(e.target.value)}
                      placeholder="Напр. Локомотив, поле 2"
                      required
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-855 border border-slate-200/50 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Создать</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Events Calendar & Payments List */}
        <div className="lg:col-span-2 space-y-8">
          {/* Events Calendar */}
          <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6 text-left">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-6 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <span>Расписание и Посещаемость</span>
            </h3>

            <div className="space-y-4">
              {events.map((event) => {
                const hasRsvp = event.attendance[selectedPlayerId] === true;
                const dateObj = new Date(event.date);

                return (
                  <div 
                    key={event.id} 
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/50 gap-4"
                  >
                    {/* Event Detail */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          event.type === 'match' 
                            ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400' 
                            : 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                        }`}>
                          {event.type === 'match' ? 'Матч' : 'Тренировка'}
                        </span>
                        <span className="text-slate-400 dark:text-slate-550 text-xs">
                          {dateObj.toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-150 leading-tight">{event.title}</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{event.location}</p>
                      <p className="text-xs text-rose-500 mt-0.5 font-bold">Списание с баланса: -400 ₽</p>
                    </div>

                    {/* RSVP / Attendance marking actions */}
                    <div className="flex items-center space-x-2 justify-end">
                      {isAdmin ? (
                        <button
                          onClick={() => onToggleAttendance(event.id, selectedPlayerId)}
                          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                            event.attendance[selectedPlayerId]
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                          }`}
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{event.attendance[selectedPlayerId] ? 'Присутствовал' : 'Отсутствовал'}</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onToggleAttendance(event.id, selectedPlayerId)}
                            className={`p-2 rounded-xl border transition-all ${
                              hasRsvp 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-500/5' 
                                : 'bg-slate-100/50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-emerald-400'
                            }`}
                            title="Я буду"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              if (event.attendance[selectedPlayerId] !== false) {
                                onToggleAttendance(event.id, selectedPlayerId);
                              }
                            }}
                            className={`p-2 rounded-xl border transition-all ${
                              event.attendance[selectedPlayerId] === false 
                                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                                : 'bg-slate-100/50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-rose-400'
                            }`}
                            title="Не смогу"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}

                      {/* Admin delete event option */}
                      {isAdmin && (
                        <button
                          onClick={() => onDeleteEvent(event.id)}
                          className="p-2 bg-slate-100 hover:bg-rose-500/10 dark:bg-slate-855 dark:hover:bg-rose-500/15 text-slate-400 hover:text-rose-500 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment History List */}
          <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 p-6 text-left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                <span>История транзакций</span>
              </h3>
              {isAdmin && (
                <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-500 px-2 py-0.5 rounded font-bold uppercase">
                  Подтверждение оплат
                </span>
              )}
            </div>

            <div className="space-y-3">
              {payments.filter(p => isAdmin || p.playerId === selectedPlayerId).map((tx) => {
                const txPlayer = players.find(p => p.id === tx.playerId);
                
                return (
                  <div 
                    key={tx.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/50"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <div className={`p-2 rounded-lg ${
                        tx.verified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500 animate-pulse'
                      }`}>
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <p className="font-bold text-sm text-slate-800 dark:text-slate-200">+{tx.amount} ₽</p>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            tx.verified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {tx.verified ? 'Подтвержден' : 'Проверяется'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-450 dark:text-slate-500 font-medium">
                          {tx.description} • {txPlayer?.name}
                        </p>
                      </div>
                    </div>

                    {/* Admin Verification CTA */}
                    {isAdmin && !tx.verified && (
                      <button
                        onClick={() => onVerifyPayment(tx.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Подтвердить</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
