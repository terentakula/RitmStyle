# RitmStyle

A modern responsive website for **RitmStyle**, rebuilt from a static HTML/CSS/JavaScript project as a React application.

The project keeps the original dark aquatic visual identity while adding a more modern interface, responsive layout, animated interactions, React routing and improved mobile navigation.

## Live Demo

**https://terentakula.github.io/RitmStyle/**

## Features

* Responsive layout for desktop, tablet and mobile
* Modern animated hero section
* Smooth scroll-based animations
* Interactive session cards
* Animated testimonials slider
* Mobile navigation menu
* Booking modal with form validation
* News and blog pages
* Individual article pages
* Responsive pricing and contact sections
* Reduced-motion support
* GitHub Pages deployment with GitHub Actions

## Tech Stack

* React
* Vite
* React Router
* Motion / `motion/react`
* CSS3
* GitHub Actions
* GitHub Pages

## Getting Started

Clone the repository:

```bash
git clone https://github.com/terentakula/RitmStyle.git
```

Open the project directory:

```bash
cd RitmStyle
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/          # Images, icons and other static assets
├── components/      # Shared UI components
├── data/            # Sessions, prices, reviews and article content
├── pages/           # Home, News, Blog and Article pages
├── App.jsx          # Application routes and layout
├── main.jsx         # React entry point
└── styles.css       # Global styles and responsive layout
```

## Deployment

The project is automatically deployed to GitHub Pages through GitHub Actions after changes are pushed to the `main` branch.

Live version:

**https://terentakula.github.io/RitmStyle/**

## Note

The booking interface is implemented on the frontend. It currently does not send booking data to a backend service.

A backend API, email service, Telegram bot, Formspree or CRM can be connected later for production use.

## Repository

https://github.com/terentakula/RitmStyle
