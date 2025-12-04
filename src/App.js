import React from "https://esm.sh/react@18";

const chips = [
  "Все",
  "Музыка",
  "Игры",
  "Прямые трансляции",
  "Новости",
  "Спорт",
  "Подкасты",
  "Развлечения",
  "Обучение",
  "Технологии",
];

const videos = [
  {
    id: 1,
    title: "Создаем клон главной страницы YouTube на React за 30 минут",
    channel: "Frontend Studio",
    views: "128 тыс. просмотров",
    timeAgo: "2 дня назад",
    duration: "18:42",
    initial: "FS",
  },
  {
    id: 2,
    title: "React 18 с нуля: современный стек без боли",
    channel: "Dev Cast",
    views: "256 тыс. просмотров",
    timeAgo: "1 неделя назад",
    duration: "42:10",
    initial: "DC",
  },
  {
    id: 3,
    title: "UX-паттерны на примере YouTube: разбор интерфейса",
    channel: "Product Mind",
    views: "74 тыс. просмотров",
    timeAgo: "5 часов назад",
    duration: "24:03",
    initial: "PM",
  },
  {
    id: 4,
    title: "Как сделать адаптивную сетку карточек только на CSS",
    channel: "CSS Craft",
    views: "32 тыс. просмотров",
    timeAgo: "3 недели назад",
    duration: "13:55",
    initial: "CC",
  },
  {
    id: 5,
    title: "Pro-уровень в JavaScript: паттерны, которые реально нужны",
    channel: "JS Pro",
    views: "421 тыс. просмотров",
    timeAgo: "4 месяца назад",
    duration: "39:17",
    initial: "JP",
  },
  {
    id: 6,
    title: "React + Tailwind: быстрый UI как у крупных сервисов",
    channel: "Pixel Dev",
    views: "88 тыс. просмотров",
    timeAgo: "3 дня назад",
    duration: "21:09",
    initial: "PD",
  },
  {
    id: 7,
    title: "Рабочий подход к структуре фронтенд-проектов",
    channel: "Senior Notes",
    views: "64 тыс. просмотров",
    timeAgo: "1 месяц назад",
    duration: "27:31",
    initial: "SN",
  },
  {
    id: 8,
    title: "Разбираем дизайн YouTube под лупой",
    channel: "Design Lab",
    views: "19 тыс. просмотров",
    timeAgo: "6 часов назад",
    duration: "16:02",
    initial: "DL",
  },
];

const sidebarSections = [
  {
    title: null,
    items: [
      { label: "Главная", active: true },
      { label: "Shorts" },
      { label: "Подписки" },
    ],
  },
  {
    title: "Вы",
    items: [
      { label: "Ваш канал" },
      { label: "История" },
      { label: "Ваши видео" },
      { label: "Позже" },
    ],
  },
  {
    title: "Подписки",
    items: [
      { label: "Музыка" },
      { label: "Игры" },
      { label: "Кодинг" },
      { label: "Новости" },
      { label: "Спорт" },
    ],
  },
];

export function App() {
  const [query, setQuery] = React.useState("");
  const [activeChip, setActiveChip] = React.useState("Все");

  const filteredVideos = videos.filter((v) => {
    const matchesQuery =
      !query ||
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.channel.toLowerCase().includes(query.toLowerCase());

    const matchesChip =
      activeChip === "Все" ||
      (activeChip === "Музыка" && v.channel.toLowerCase().includes("music")) ||
      (activeChip === "Игры" && v.title.toLowerCase().includes("игр")) ||
      (activeChip === "Новости" && v.title.toLowerCase().includes("новост")) ||
      activeChip === "Прямые трансляции" ||
      activeChip === "Спорт" ||
      activeChip === "Подкасты" ||
      activeChip === "Развлечения" ||
      activeChip === "Обучение" ||
      activeChip === "Технологии";

    return matchesQuery && matchesChip;
  });

  return (
    <div className="app">
      <Header query={query} onQueryChange={setQuery} />
      <div className="app-body">
        <Sidebar />
        <main className="main">
          <Chips active={activeChip} onChange={setActiveChip} />
          <div className="content">
            <VideoGrid videos={filteredVideos} />
          </div>
        </main>
      </div>
    </div>
  );
}

function Header({ query, onQueryChange }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="burger" aria-label="Меню">
          <div style={{ width: 16 }}>
            <Bar />
            <Bar />
            <Bar />
          </div>
        </div>
        <a href="#" className="logo">
          <div className="logo-icon" />
          <span>YouTube</span>
          <span className="logo-region">RU</span>
        </a>
      </div>

      <div className="header-center">
        <div className="search-wrapper">
          <input
            className="search-input"
            placeholder="Введите запрос"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <button className="search-button" aria-label="Поиск">
            <div className="search-icon" />
          </button>
        </div>
        <button className="mic-button" aria-label="Голосовой поиск">
          <div className="mic-icon" />
        </button>
      </div>

      <div className="header-right">
        <div className="icon-button" aria-label="Создать" />
        <div className="icon-button" aria-label="Уведомления" />
        <div className="avatar">K</div>
      </div>
    </header>
  );
}

function Bar() {
  return (
    <div
      style={{
        height: 2,
        background: "#f1f1f1",
        borderRadius: 999,
        margin: "3px 0",
      }}
    />
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      {sidebarSections.map((section, idx) => (
        <div key={idx} className="sidebar-section">
          {section.title && (
            <div className="sidebar-section-title">{section.title}</div>
          )}
          {section.items.map((item) => (
            <div
              key={item.label}
              className={
                "sidebar-item" + (item.active ? " active" : "")
              }
            >
              <div className="sidebar-icon" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}

function Chips({ active, onChange }) {
  return (
    <div className="chips">
      {chips.map((chip) => (
        <button
          key={chip}
          className={"chip" + (chip === active ? " active" : "")}
          onClick={() => onChange(chip)}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

function VideoGrid({ videos }) {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <div className="video-thumb">
            <div className="video-badge" />
            <div className="video-duration">{video.duration}</div>
          </div>
          <div className="video-info">
            <div className="channel-avatar">{video.initial}</div>
            <div className="video-meta">
              <div className="video-title">{video.title}</div>
              <div className="video-channel">{video.channel}</div>
              <div className="video-stats">
                {video.views} • {video.timeAgo}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


