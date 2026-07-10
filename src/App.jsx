import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Roster from './components/Roster';
import Leaderboard from './components/Leaderboard';
import Attendance from './components/Attendance';
import Polls from './components/Polls';
import NewsMatches from './components/NewsMatches';
import About from './components/About';
import Chat from './components/Chat';
import Footer from './components/Footer';

import {
  initialPlayers,
  initialEvents,
  initialPayments,
  initialPolls,
  initialNews,
  initialMatches
} from './data/mockData';

export default function App() {
  // Tabs & Settings State
  const [activeTab, setActiveTab] = React.useState('home');
  const [darkMode, setDarkMode] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  
  // Telegram Session State
  const [currentUser, setCurrentUser] = React.useState(() => {
    const saved = localStorage.getItem('fc_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Core Data States (synchronized with localStorage)
  const [players, setPlayers] = React.useState(() => {
    const saved = localStorage.getItem('fc_players');
    return saved ? JSON.parse(saved) : initialPlayers;
  });

  const [events, setEvents] = React.useState(() => {
    const saved = localStorage.getItem('fc_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [payments, setPayments] = React.useState(() => {
    const saved = localStorage.getItem('fc_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [polls, setPolls] = React.useState(() => {
    const saved = localStorage.getItem('fc_polls');
    return saved ? JSON.parse(saved) : initialPolls;
  });

  const [news] = React.useState(initialNews);
  const [matches] = React.useState(initialMatches);

  // Toast / notification feedback state
  const [toastMessage, setToastMessage] = React.useState(null);

  // Sync state changes with localStorage
  React.useEffect(() => {
    localStorage.setItem('fc_players', JSON.stringify(players));
    // If current user details change, sync it too
    if (currentUser) {
      const updatedUser = players.find(p => p.id === currentUser.id);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    }
  }, [players]);

  React.useEffect(() => {
    localStorage.setItem('fc_currentUser', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  React.useEffect(() => {
    localStorage.setItem('fc_events', JSON.stringify(events));
  }, [events]);

  React.useEffect(() => {
    localStorage.setItem('fc_payments', JSON.stringify(payments));
  }, [payments]);

  React.useEffect(() => {
    localStorage.setItem('fc_polls', JSON.stringify(polls));
  }, [polls]);

  // Dark mode side effect
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Core Interaction Handlers
  const handleRsvp = (eventId, going) => {
    // If logged in, RSVP as currentUser. Otherwise RSVP as Alexander Morozov (p1)
    const voterId = currentUser ? currentUser.id : "p1";
    
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          attendance: {
            ...evt.attendance,
            [voterId]: going
          }
        };
      }
      return evt;
    }));

    const voterName = players.find(p => p.id === voterId)?.name || 'Игрок';
    triggerToast(`Отметка RSVP изменена для игрока: ${voterName}`);
  };

  const handleToggleAttendance = (eventId, playerId) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const current = evt.attendance[playerId];
        let next;
        if (current === true) next = false;
        else if (current === false) next = undefined; // reset
        else next = true; // present

        return {
          ...evt,
          attendance: {
            ...evt.attendance,
            [playerId]: next
          }
        };
      }
      return evt;
    }));
  };

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      attendance: {}
    };
    // Pre-populate attendance state with undefined for all players
    players.forEach(p => {
      newEvent.attendance[p.id] = undefined;
    });

    setEvents(prev => [newEvent, ...prev]);
    triggerToast("Новая тренировка/матч успешно добавлена!");
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    triggerToast("Событие удалено.");
  };

  const handleAddPayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: `tx-${Date.now()}`
    };
    setPayments(prev => [newPayment, ...prev]);
    triggerToast("Уведомление об оплате отправлено на проверку капитану!");
  };

  const handleVerifyPayment = (paymentId) => {
    setPayments(prev => prev.map(tx => {
      if (tx.id === paymentId) {
        return { ...tx, verified: true };
      }
      return tx;
    }));
    triggerToast("Перевод успешно подтвержден. Баланс обновлен!");
  };

  const handleUpdateInitialBalance = (playerId, newBalance) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, initialBalance: newBalance };
      }
      return p;
    }));
    triggerToast("Стартовый баланс успешно изменен.");
  };

  const handleSendTelegramReminder = (player, balance) => {
    const debtAmount = Math.abs(balance);
    // Simulate TG notification delivery
    triggerToast(
      `🔔 Напоминание отправлено в Telegram: "@${player.name.split(' ')[0]}, твой баланс составляет ${balance} ₽. Не забудь погасить задолженность в ${debtAmount} ₽!"`
    );
  };

  const handleVote = (pollId, optionIndex, playerId) => {
    if (!playerId) {
      triggerToast("Пожалуйста, сначала авторизуйтесь через Telegram!");
      return;
    }
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        const cleanOptions = poll.options.map(opt => ({
          ...opt,
          votes: opt.votes.filter(id => id !== playerId)
        }));

        cleanOptions[optionIndex].votes.push(playerId);

        return {
          ...poll,
          options: cleanOptions
        };
      }
      return poll;
    }));
    triggerToast("Ваш голос успешно учтен!");
  };

  const handleCreatePoll = (pollData) => {
    const newPoll = {
      ...pollData,
      id: `pl-${Date.now()}`
    };
    setPolls(prev => [newPoll, ...prev]);
    triggerToast("Голосование успешно создано!");
  };

  const handleDeletePoll = (pollId) => {
    setPolls(prev => prev.filter(p => p.id !== pollId));
    triggerToast("Опрос удален.");
  };

  // Find the next upcoming event for the Hero widget banner
  const nextEvent = [...events]
    .filter(e => !e.completed && new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-aurora-dark transition-colors duration-300 relative">
      {/* Toast Notification Alert Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full p-4 rounded-xl bg-slate-900/95 dark:bg-aurora-card/95 border border-emerald-500/35 text-white shadow-2xl flex items-center space-x-3 transition-all animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <p className="text-xs font-semibold leading-relaxed text-left">{toastMessage}</p>
        </div>
      )}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        players={players}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              setActiveTab={setActiveTab}
              nextEvent={nextEvent}
              onRsvp={handleRsvp}
              players={players}
              matches={matches}
              events={events}
            />
            <div className="border-t border-slate-200/50 dark:border-slate-800/40">
              <Leaderboard players={players} />
            </div>
            <div className="border-t border-slate-200/50 dark:border-slate-800/40 py-8">
              <Chat players={players} />
            </div>
          </>
        )}

        {activeTab === 'roster' && <Roster players={players} />}

        {activeTab === 'leaderboard' && <Leaderboard players={players} />}

        {activeTab === 'attendance' && (
          <Attendance
            players={players}
            events={events}
            payments={payments}
            isAdmin={isAdmin}
            onToggleAttendance={handleToggleAttendance}
            onAddEvent={handleAddEvent}
            onAddPayment={handleAddPayment}
            onVerifyPayment={handleVerifyPayment}
            onDeleteEvent={handleDeleteEvent}
            onUpdateInitialBalance={handleUpdateInitialBalance}
            onSendTelegramReminder={handleSendTelegramReminder}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'polls' && (
          <Polls
            polls={polls}
            players={players}
            isAdmin={isAdmin}
            onVote={handleVote}
            onCreatePoll={handleCreatePoll}
            onDeletePoll={handleDeletePoll}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'news' && <NewsMatches news={news} matches={matches} />}

        {activeTab === 'about' && <About />}
      </main>

      <Footer />
    </div>
  );
}
