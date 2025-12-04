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

const e = React.createElement;

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

  return e(
    "div",
    { className: "app" },
    e(Header, { query, onQueryChange: setQuery }),
    e(
      "div",
      { className: "app-body" },
      e(Sidebar, null),
      e(
        "main",
        { className: "main" },
        e(Chips, { active: activeChip, onChange: setActiveChip }),
        e(
          "div",
          { className: "content" },
          e(VideoGrid, { videos: filteredVideos })
        )
      )
    )
  );
}

function Header({ query, onQueryChange }) {
  return e(
    "header",
    { className: "app-header" },
    e(
      "div",
      { className: "header-left" },
      e(
        "div",
        { className: "burger", "aria-label": "Меню" },
        e(
          "div",
          { style: { width: 16 } },
          e(Bar, null),
          e(Bar, null),
          e(Bar, null)
        )
      ),
      e(
        "a",
        { href: "#", className: "logo" },
        e("div", { className: "logo-icon" }),
        e("span", null, "YouTube"),
        e("span", { className: "logo-region" }, "RU")
      )
    ),
    e(
      "div",
      { className: "header-center" },
      e(
        "div",
        { className: "search-wrapper" },
        e("input", {
          className: "search-input",
          placeholder: "Введите запрос",
          value: query,
          onChange: (eEvent) => onQueryChange(eEvent.target.value),
        }),
        e(
          "button",
          { className: "search-button", "aria-label": "Поиск" },
          e("div", { className: "search-icon" })
        )
      ),
      e(
        "button",
        { className: "mic-button", "aria-label": "Голосовой поиск" },
        e("div", { className: "mic-icon" })
      )
    ),
    e(
      "div",
      { className: "header-right" },
      e("div", { className: "icon-button", "aria-label": "Создать" }),
      e("div", { className: "icon-button", "aria-label": "Уведомления" }),
      e("div", { className: "avatar" }, "K")
    )
  );
}

function Bar() {
  return e("div", {
    style: {
      height: 2,
      background: "#f1f1f1",
      borderRadius: 999,
      margin: "3px 0",
    },
  });
}

function Sidebar() {
  return e(
    "aside",
    { className: "sidebar" },
    sidebarSections.map((section, idx) =>
      e(
        "div",
        { key: idx, className: "sidebar-section" },
        section.title
          ? e("div", { className: "sidebar-section-title" }, section.title)
          : null,
        section.items.map((item) =>
          e(
            "div",
            {
              key: item.label,
              className: "sidebar-item" + (item.active ? " active" : ""),
            },
            e("div", { className: "sidebar-icon" }),
            e("span", null, item.label)
          )
        )
      )
    )
  );
}

function Chips({ active, onChange }) {
  return e(
    "div",
    { className: "chips" },
    chips.map((chip) =>
      e(
        "button",
        {
          key: chip,
          className: "chip" + (chip === active ? " active" : ""),
          onClick: () => onChange(chip),
        },
        chip
      )
    )
  );
}

function VideoGrid({ videos }) {
  return e(
    "div",
    { className: "video-grid" },
    videos.map((video) =>
      e(
        "div",
        { key: video.id, className: "video-card" },
        e(
          "div",
          { className: "video-thumb" },
          e("div", { className: "video-badge" }),
          e("div", { className: "video-duration" }, video.duration)
        ),
        e(
          "div",
          { className: "video-info" },
          e("div", { className: "channel-avatar" }, video.initial),
          e(
            "div",
            { className: "video-meta" },
            e("div", { className: "video-title" }, video.title),
            e("div", { className: "video-channel" }, video.channel),
            e(
              "div",
              { className: "video-stats" },
              `${video.views} • ${video.timeAgo}`
            )
          )
        )
      )
    )
  );
}

