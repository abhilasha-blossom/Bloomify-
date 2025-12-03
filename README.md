# 🌱 Bloomify — Habit Garden App

**Bloomify** is a gamified habit-tracking application where every habit is represented as a growing plant. When users complete a habit daily, the plant grows through multiple visual stages. Missing days resets progress, encouraging consistency.

## 🎯 Main Goal
Turn daily habits into a fun and rewarding experience by visualizing personal growth through a digital garden.

## 📌 Core Features (MVP)
- **Add new habits**: Name + optional icon/emoji.
- **Track streaks**: Mark habits as completed for the day.
- **Visual Growth**: Auto plant-growth system based on streak count.
- **Garden View**: Display all plants in a grid.
- **Persistence**: Data saved locally (LocalStorage).

## 🌱 Growth Logic
Plants evolve according to streak count:

| Streak | Growth Stage |
| :--- | :--- |
| 1–2 days | Seed |
| 3–5 days | Sprout |
| 6–9 days | Young Plant |
| 10–14 days | Bud / Flowering |
| 15+ days | Full Bloom |

*Completing a habit today increases streak; missing a day resets it.*

## 🌦 Season / Theme Feature
A selectable garden theme that changes the background:
- 🌸 Spring
- ☀️ Summer
- 🍂 Autumn
- ❄️ Winter

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Styling**: CSS Modules / Vanilla CSS (Soft Aesthetic)
- **Storage**: LocalStorage
