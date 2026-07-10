import React from 'react';
import { Send, SendHorizontal, MessageSquare, Info, Star } from 'lucide-react';

export default function Chat({ players }) {
  const [messages, setMessages] = React.useState([
    { id: 1, senderName: "Александр Морозов", senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", text: "Привет всем! В среду тренировка в силе?", time: "18:24", self: false },
    { id: 2, senderName: "Дмитрий Смирнов", senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", text: "Привет! Да, капитан сказал собираемся в 19:30. Поле забронировано.", time: "18:26", self: false },
    { id: 3, senderName: "Илья Васильев", senderAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80", text: "Я буду. Форму берем зеленую или белую?", time: "18:30", self: false },
    { id: 4, senderName: "Капитан", senderAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80", text: "Берем зеленую! И не забывайте сдавать взносы за прошлый матч.", time: "18:32", self: false },
  ]);

  const [inputVal, setInputVal] = React.useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const activePlayer = players[0]; // mock sender as Alexander
    
    setMessages([
      ...messages,
      {
        id: Date.now(),
        senderName: activePlayer?.name || "Александр Морозов",
        senderAvatar: activePlayer?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        text: inputVal,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        self: true
      }
    ]);
    setInputVal('');
  };

  return (
    <div className="py-6 max-w-3xl mx-auto px-4 sm:px-6">
      {/* Informative banner about Telegram integration */}
      <div className="mb-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-left flex items-start space-x-3">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Интеграция с Telegram</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Этот чат симулирует интеграцию с основным Telegram-каналом ГЛМФ. Сообщения, отправленные ботом клуба, автоматически ретранслируются на сайт.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl glass border border-slate-200/50 dark:border-slate-800/40 overflow-hidden shadow-xl flex flex-col h-[500px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-left">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-white leading-tight">Общий Чат Авроры</h4>
              <p className="text-[10px] text-slate-400 font-semibold">{players.length} участников на связи</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full font-bold uppercase tracking-wider">
            Online
          </span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-100/30 dark:bg-slate-950/20 scrollbar-thin">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-2.5 max-w-[80%] ${msg.self ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`}>
              {!msg.self && (
                <img src={msg.senderAvatar} alt={msg.senderName} className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-800 mt-0.5" />
              )}
              <div>
                <div className={`p-3 rounded-2xl text-left ${
                  msg.self 
                    ? 'bg-emerald-500 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-aurora-card border border-slate-200 dark:border-slate-800/80 rounded-tl-none text-slate-800 dark:text-slate-200'
                }`}>
                  {!msg.self && (
                    <p className="text-[10px] font-extrabold text-indigo-400 dark:text-indigo-400 mb-1">{msg.senderName}</p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <p className={`text-[10px] text-slate-400 mt-1 ${msg.self ? 'text-right' : ''}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800/80 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all hover:scale-105 shadow-md shadow-emerald-500/20"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
