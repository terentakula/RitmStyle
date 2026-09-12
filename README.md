# RitmStyle React

React/Vite rewrite of the original static RitmStyle project.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Stack

- React
- Vite
- React Router
- Motion (`motion/react`)
- Responsive CSS without a UI framework

## Structure

- `src/components` — shared Header, Footer, modal, UI helpers
- `src/pages` — Home, News, Blog and Article pages
- `src/data/siteData.js` — sessions, prices, testimonials and article content
- `src/assets` — migrated original assets

## Important

The booking form is fully interactive on the frontend but currently does not send data to a real service. Connect it to an API, email service, Telegram bot, Formspree or CRM before production use.

`BrowserRouter` is used. On static hosting (for example GitHub Pages) add an SPA fallback or switch to `HashRouter`.
