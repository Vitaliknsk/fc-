// Начальные данные для ГЛМФ

export const initialPlayers = [
  ["Виталя Реутов", 47, 7, 2, 29, 0, 0, 6.7, 16],
  ["Женька Павлюк", 46, 7, 6, 86, 0, 0, 6.5, 10],
  ["Юра Лобода", 37, 7, 5, 71, 0, 0, 5.2, 10],
  ["Виталя Бирюков", 30, 9, 7, 78, 1, 0, 3.3, 7],
  ["Валера", 25, 9, 5, 56, 0, 0, 2.7, 6],
  ["Александер", 24, 9, 6, 67, 1, 0, 2.6, 6],
  ["Саша Высоцкий", 19, 9, 5, 56, 1, 0, 2.1, 5],
  ["Жека Парахневич", 19, 6, 2, 33, 0, 0, 3.1, 5],
  ["Илюха Гляненко", 16, 6, 2, 33, 0, 0, 2.6, 6],
  ["Костян", 14, 7, 3, 43, 0, 1, 2, 4],
  ["Рома Павлюк", 14, 6, 2, 33, 0, 1, 2.3, 7],
  ["Андрюха Колчак", 11, 6, 3, 50, 0, 0, 1.8, 7],
  ["Саня Чуба", 11, 5, 4, 80, 1, 0, 2.2, 4],
  ["Леха 20 лет футбола", 10, 2, 0, 0, 0, 1, 5, 6],
  ["Кузя", 9, 7, 3, 43, 0, 0, 1.2, 3],
  ["Игорь", 8, 2, 1, 50, 0, 0, 4, 5],
  ["Артём", 7, 4, 0, 0, 2, 0, 1.7, 3],
  ["Алыча", 4, 1, 1, 100, 0, 0, 4, 4],
  ["Гена", 3, 2, 1, 50, 0, 0, 1.5, 3],
  ["Гога", 2, 4, 1, 25, 0, 1, 0.5, 2],
  ["Муля Кирилл", 2, 2, 0, 0, 0, 0, 1, 1],
  ["Джамал", 2, 2, 2, 100, 0, 0, 1, 2],
  ["Женя Ухо", 1, 2, 1, 50, 0, 0, 0.5, 1],
  ["Никита Обухов", 1, 1, 0, 0, 0, 0, 1, 1],
  ["Саня Вареный", 1, 1, 0, 0, 0, 0, 1, 1],
  ["Саня Брат Игоря", 1, 1, 1, 100, 0, 0, 1, 1],
  ["Витя Матвеев", 0, 1, 0, 0, 0, 0, 0, 0],
].map(([name, goals, matchesPlayed, wins, winRate, ownGoals, redCards, goalsPerMatch, maxGoals], index) => ({
  id: `p${index + 1}`,
  name,
  number: index + 1,
  position: "Игрок",
  avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0f766e,0e7490,1e3a8a`,
  initialBalance: 0,
  stats: { goals, matchesPlayed, wins, winRate, ownGoals, redCards, goalsPerMatch, maxGoals, assists: 0, minutes: matchesPlayed * 60, mvp: 0, yellowCards: 0 },
  rankChanges: { goals: "flat", assists: "flat", points: "flat", attendance: "flat" },
}));
export const initialEvents = [
  {
    id: "ev1",
    title: "Тренировка на Арене Металлург",
    date: "2026-07-08T19:30:00",
    type: "training", // training / match
    location: "Арена Металлург, поле 3",
    cost: 400, // Фиксированное списание за посещение будет 400 руб
    attendance: {
      p1: true,
      p2: true,
      p3: false,
      p4: true,
      p5: true,
      p6: false,
      p7: true,
      p8: true
    },
    completed: false
  },
  {
    id: "ev2",
    title: "Матч против ФК Штурм",
    date: "2026-07-12T11:00:00",
    type: "match",
    location: "Стадион Локомотив, основное поле",
    cost: 400,
    attendance: {
      p1: true,
      p2: true,
      p3: true,
      p4: true,
      p5: true,
      p6: true,
      p7: true,
      p8: false
    },
    completed: false
  },
  {
    id: "ev3",
    title: "Тренировка на Арене Металлург",
    date: "2026-07-03T19:30:00",
    type: "training",
    location: "Арена Металлург, поле 3",
    cost: 400,
    attendance: {
      p1: true,
      p2: true,
      p3: true,
      p4: true,
      p5: true,
      p6: true,
      p7: true,
      p8: true
    },
    completed: true
  },
  {
    id: "ev4",
    title: "Матч против ФК Вымпел",
    date: "2026-06-28T10:00:00",
    type: "match",
    location: "Стадион Локомотив",
    cost: 400,
    attendance: {
      p1: true,
      p2: true,
      p3: false,
      p4: true,
      p5: true,
      p6: true,
      p7: true,
      p8: true
    },
    completed: true
  }
];

export const initialPayments = [
  { id: "tx1", playerId: "p1", date: "2026-07-04", amount: 1500, type: "payment", description: "Оплата за тренировку и матч", verified: true },
  { id: "tx2", playerId: "p2", date: "2026-07-04", amount: 1500, type: "payment", description: "Оплата взноса", verified: true },
  { id: "tx3", playerId: "p3", date: "2026-07-05", amount: 500, type: "payment", description: "Оплата тренировки", verified: false }, // Ожидает подтверждения
  { id: "tx4", playerId: "p4", date: "2026-07-04", amount: 1500, type: "payment", description: "Оплата взноса", verified: true },
  { id: "tx5", playerId: "p5", date: "2026-07-03", amount: 1500, type: "payment", description: "Взнос за июль", verified: true },
  { id: "tx6", playerId: "p7", date: "2026-07-04", amount: 1500, type: "payment", description: "Перевод на карту капитана", verified: true }
];

export const initialPolls = [
  {
    id: "pl1",
    title: "Лучший игрок матча против ФК Вымпел",
    description: "Голосуем за лучшего игрока прошедшей игры. Наша победа 3:1!",
    options: [
      { text: "Виталя Реутов", votes: ["p2", "p4", "p5", "p7"] },
      { text: "Женька Павлюк", votes: ["p1", "p3", "p8"] },
      { text: "Юра Лобода", votes: ["p6"] }
    ],
    deadline: "2026-07-10T23:59:59",
    anonymous: false,
    createdBy: "Администратор",
    active: true
  },
  {
    id: "pl2",
    title: "Удобное время для тренировки в среду",
    description: "Выбираем время начала тренировки на этой неделе.",
    options: [
      { text: "С 19:00 до 20:30", votes: ["p1", "p2", "p3", "p4"] },
      { text: "С 20:30 до 22:00", votes: ["p5", "p6", "p7", "p8"] }
    ],
    deadline: "2026-07-07T18:00:00",
    anonymous: true,
    createdBy: "Капитан",
    active: true
  },
  {
    id: "pl3",
    title: "Цвет нового комплекта формы",
    description: "Голосование завершено. Выбирали дизайн на следующий сезон.",
    options: [
      { text: "Неоново-зеленый с черным", votes: ["p1", "p2", "p3", "p4", "p7", "p8"] },
      { text: "Фиолетово-космический с белым", votes: ["p5", "p6"] }
    ],
    deadline: "2026-06-25T20:00:00",
    anonymous: true,
    createdBy: "Администратор",
    active: false
  }
];

export const initialNews = [
  {
    id: "n1",
    title: "Уверенная победа над ФК Вымпел 3:1!",
    summary: "В напряженном матче 14-го тура наша команда завоевала важнейшие три очка.",
    content: "ГЛМФ провела одну из лучших игр в этом сезоне. С самого начала матча команда захватила инициативу, а во втором тайме закрепила преимущество. Спасибо игрокам и болельщикам за поддержку!",
    date: "2026-06-28",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "n2",
    title: "Анонс матча против ФК Штурм",
    summary: "Битва за второе место в таблице чемпионата ЛФЛ состоится в это воскресенье.",
    content: "В следующее воскресенье, 12 июля, ГЛМФ встретится с ФК Штурм. Это ключевой матч сезона: соперник опережает нас всего на 1 очко в турнирной таблице. Нам нужна только победа! Ждем всех игроков на предыгровой тренировке в среду.",
    date: "2026-07-05",
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&auto=format&fit=crop&q=80"
  }
];

export const initialMatches = [
  { id: "m1", opponent: "ФК Вымпел", date: "2026-06-28T10:00:00", type: "Чемпионат ЛФЛ", score: "3:1", status: "completed", home: true, ourGoals: "ГЛМФ — 3 гола" },
  { id: "m2", opponent: "ФК Штурм", date: "2026-07-12T11:00:00", type: "Чемпионат ЛФЛ", score: null, status: "upcoming", home: false, ourGoals: null },
  { id: "m3", opponent: "ФК Прогресс", date: "2026-07-19T10:00:00", type: "Чемпионат ЛФЛ", score: null, status: "upcoming", home: true, ourGoals: null },
  { id: "m4", opponent: "ФК Легион", date: "2026-06-21T12:30:00", type: "Товарищеский", score: "2:2", status: "completed", home: false, ourGoals: "ГЛМФ — 2 гола" }
];

export const teamAboutInfo = {
  name: "ГЛМФ",
  founded: "2023",
  achievements: [
    { year: "2024", title: "Серебряный призер Зимнего Кубка ЛФЛ" },
    { year: "2025", title: "Победитель Летнего Чемпионата 8х8 (Дивизион Б)" },
    { year: "2026", title: "Выход в Высший дивизион любительской лиги" }
  ],
  history: "Команда была основана группой друзей и единомышленников в 2023 году. Начав с товарищеских матчей на районном стадионе, ГЛМФ быстро переросла в полноценную команду любительской лиги. Цвета команды — изумрудный, глубокий синий и небесный.",
  homePitch: "Арена Металлург, ул. Спортивная, д. 12"
};
