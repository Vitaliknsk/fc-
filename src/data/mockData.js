// Начальные данные для ГЛМФ

export const initialPlayers = [
  {
    id: "p1",
    name: "Александр Морозов",
    number: 10,
    position: "Нападающий",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    initialBalance: 1500, // Начальный баланс в рублях
    stats: {
      goals: 12,
      assists: 8,
      matchesPlayed: 14,
      minutes: 1120,
      mvp: 4,
      yellowCards: 1,
      redCards: 0
    },
    rankChanges: {
      goals: "up", // up, down, flat
      assists: "flat",
      points: "up",
      attendance: "flat"
    }
  },
  {
    id: "p2",
    name: "Дмитрий Смирнов",
    number: 7,
    position: "Полузащитник",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    initialBalance: 800,
    stats: {
      goals: 8,
      assists: 11,
      matchesPlayed: 15,
      minutes: 1250,
      mvp: 3,
      yellowCards: 2,
      redCards: 0
    },
    rankChanges: {
      goals: "flat",
      assists: "up",
      points: "up",
      attendance: "up"
    }
  },
  {
    id: "p3",
    name: "Максим Соколов",
    number: 9,
    position: "Нападающий",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=80",
    initialBalance: -200, // Пример долга
    stats: {
      goals: 10,
      assists: 3,
      matchesPlayed: 12,
      minutes: 980,
      mvp: 2,
      yellowCards: 0,
      redCards: 0
    },
    rankChanges: {
      goals: "down",
      assists: "down",
      points: "down",
      attendance: "down"
    }
  },
  {
    id: "p4",
    name: "Артем Кузнецов",
    number: 8,
    position: "Полузащитник",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initialBalance: 2000,
    stats: {
      goals: 4,
      assists: 7,
      matchesPlayed: 15,
      minutes: 1300,
      mvp: 1,
      yellowCards: 3,
      redCards: 0
    },
    rankChanges: {
      goals: "up",
      assists: "flat",
      points: "flat",
      attendance: "up"
    }
  },
  {
    id: "p5",
    name: "Роман Петров",
    number: 4,
    position: "Защитник",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    initialBalance: 1200,
    stats: {
      goals: 2,
      assists: 3,
      matchesPlayed: 15,
      minutes: 1350,
      mvp: 2,
      yellowCards: 4,
      redCards: 1
    },
    rankChanges: {
      goals: "flat",
      assists: "up",
      points: "flat",
      attendance: "up"
    }
  },
  {
    id: "p6",
    name: "Кирилл Иванов",
    number: 5,
    position: "Защитник",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    initialBalance: -800, // Пример долга
    stats: {
      goals: 1,
      assists: 2,
      matchesPlayed: 13,
      minutes: 1100,
      mvp: 0,
      yellowCards: 5,
      redCards: 0
    },
    rankChanges: {
      goals: "down",
      assists: "flat",
      points: "down",
      attendance: "down"
    }
  },
  {
    id: "p7",
    name: "Илья Васильев",
    number: 1,
    position: "Вратарь",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    initialBalance: 500,
    stats: {
      goals: 0,
      assists: 1,
      matchesPlayed: 16,
      minutes: 1440,
      mvp: 2,
      yellowCards: 0,
      redCards: 0
    },
    rankChanges: {
      goals: "flat",
      assists: "flat",
      points: "flat",
      attendance: "up"
    }
  },
  {
    id: "p8",
    name: "Сергей Федоров",
    number: 17,
    position: "Полузащитник",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    initialBalance: 0,
    stats: {
      goals: 5,
      assists: 4,
      matchesPlayed: 10,
      minutes: 680,
      mvp: 1,
      yellowCards: 1,
      redCards: 0
    },
    rankChanges: {
      goals: "up",
      assists: "up",
      points: "up",
      attendance: "flat"
    }
  }
];

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
      { text: "Александр Морозов (1 гол, 1 ассист)", votes: ["p2", "p4", "p5", "p7"] },
      { text: "Дмитрий Смирнов (2 ассиста)", votes: ["p1", "p3", "p8"] },
      { text: "Илья Васильев (серия сейвов)", votes: ["p6"] }
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
    content: "ГЛМФ провела одну из лучших игр в этом сезоне. С самого начала матча мы захватили инициативу. На 12-й минуте Александр Морозов открыл счет красивым ударом в девятку после паса Дмитрия Смирнова. Во втором тайме соперник сравнял счет с пенальти, но дубль Максима Соколова принес нам заслуженную победу. Спасибо болельщикам за поддержку!",
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
  { id: "m1", opponent: "ФК Вымпел", date: "2026-06-28T10:00:00", type: "Чемпионат ЛФЛ", score: "3:1", status: "completed", home: true, ourGoals: "Морозов 12', Соколов 64', 78'" },
  { id: "m2", opponent: "ФК Штурм", date: "2026-07-12T11:00:00", type: "Чемпионат ЛФЛ", score: null, status: "upcoming", home: false, ourGoals: null },
  { id: "m3", opponent: "ФК Прогресс", date: "2026-07-19T10:00:00", type: "Чемпионат ЛФЛ", score: null, status: "upcoming", home: true, ourGoals: null },
  { id: "m4", opponent: "ФК Легион", date: "2026-06-21T12:30:00", type: "Товарищеский", score: "2:2", status: "completed", home: false, ourGoals: "Смирнов 34', Федоров 81'" }
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
