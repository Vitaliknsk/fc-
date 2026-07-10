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

  // Sync state changes with localStorage
  React.useEffect(() => {
    localStorage.setItem('fc_players', JSON.stringify(players));
  }, [players]);

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

  // Core Interaction Handlers
  const handleRsvp = (eventId, going) => {
    // Alexander Morozov (p1) is the default player in the Hero CTA
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          attendance: {
            ...evt.attendance,
            p1: going
          }
        };
      }
      return evt;
    }));
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
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const handleAddPayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: `tx-${Date.now()}`
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  const handleVerifyPayment = (paymentId) => {
    setPayments(prev => prev.map(tx => {
      if (tx.id === paymentId) {
        return { ...tx, verified: true };
      }
      return tx;
    }));
  };

  const handleVote = (pollId, optionIndex, playerId) => {
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        // Remove player's existing vote from any other option first
        const cleanOptions = poll.options.map(opt => ({
          ...opt,
          votes: opt.votes.filter(id => id !== playerId)
        }));

        // Add player's vote to the selected option
        cleanOptions[optionIndex].votes.push(playerId);

        return {
          ...poll,
          options: cleanOptions
        };
      }
      return poll;
    }));
  };

  const handleCreatePoll = (pollData) => {
    const newPoll = {
      ...pollData,
      id: `pl-${Date.now()}`
    };
    setPolls(prev => [newPoll, ...prev]);
  };

  const handleDeletePoll = (pollId) => {
    setPolls(prev => prev.filter(p => p.id !== pollId));
  };

  // Find the next upcoming event for the Hero widget banner
  const nextEvent = [...events]
    .filter(e => !e.completed && new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-aurora-dark transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
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
            {/* Embedded sections in home for premium experience */}
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
          />
        )}

        {activeTab === 'news' && <NewsMatches news={news} matches={matches} />}

        {activeTab === 'about' && <About />}
      </main>

      <Footer />
    </div>
  );
}
