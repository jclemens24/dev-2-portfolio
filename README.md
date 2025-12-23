# Jordan Clemens - Portfolio Website

A modern, AI-powered portfolio website showcasing my work as a Software Engineer at Cisco. Built with cutting-edge technologies and featuring an intelligent chatbot assistant that knows my entire professional background.

## ✨ Features

### 🤖 AI-Powered Chat Assistant

- **Kernel**: An AI chatbot with complete knowledge of my resume, projects, and experience
- Streaming responses using GPT-4o-mini
- Text-to-speech functionality for accessibility
- Built with LangChain and OpenAI

### 🎨 Interactive Sections

- **Home**: Hero section with animated introduction
- **About**: Education, resume download/preview, and personal interests
- **Skills**: 6 categories of technical skills with visual badges
- **Experience**: Timeline view of professional history (Cisco, AccruePartners, USMC)
- **Projects**: Featured and additional projects with GitHub/live demo links
- **Achievements**: U.S. Patent and Navy Achievement Medal recognition
- **Contact**: Functional contact form with email integration via Resend

### 🔥 Technical Highlights

- **Glass Morphism UI**: Modern, sleek design with backdrop blur effects
- **Scroll Animations**: Intersection Observer-based reveal animations
- **Smooth Navigation**: Animated scrolling between sections
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation
- **SSR**: Server-side rendering with SvelteKit

## 🛠️ Tech Stack

### Frontend

- **Framework**: SvelteKit (Svelte 5 with runes)
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG components
- **Animations**: CSS transitions + Intersection Observer

### Backend

- **API**: SvelteKit API routes
- **AI/ML**: OpenAI GPT-4o-mini, LangChain
- **Email**: Resend API for contact form
- **Database**: PostgreSQL (Drizzle ORM)
- **Auth**: Lucia (configured)

### Development

- **Language**: TypeScript
- **Build Tool**: Vite
- **Testing**: Playwright (E2E), Vitest (Unit)
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/jorcleme/dev-2-portfolio.git
cd dev-2-portfolio
```

1. Install dependencies:

```sh
npm install
```

1. Set up environment variables:

```sh
# Create .env file with:
PRIVATE_OPENAI_API_KEY=your_openai_api_key
PRIVATE_RESEND_API_KEY=your_resend_api_key
PRIVATE_DATABASE_URL=your_database_url
```

1. Start the development server:

```sh
npm run dev

# or open in browser automatically
npm run dev -- --open
```

## 📦 Building for Production

Create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

> To deploy, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## 📁 Project Structure

```bash
src/
├── lib/
│   ├── components/
│   │   ├── chat/          # AI chat interface
│   │   ├── common/        # Reusable components (GlassCard, ScrollReveal)
│   │   ├── icons/         # SVG icon components
│   │   ├── sections/      # Page sections (About, Skills, etc.)
│   │   └── ui/            # UI elements (Navbar, Footer)
│   ├── data/
│   │   └── resume.md      # Resume content for AI context
│   ├── server/
│   │   ├── auth.ts        # Authentication logic
│   │   └── db/            # Database schema and queries
│   └── types/             # TypeScript type definitions
├── routes/
│   ├── api/
│   │   ├── chat/          # AI chat endpoint
│   │   └── contact/       # Contact form endpoint
│   └── +page.svelte       # Main landing page
└── static/                # Static assets (fonts, resume files)
```

## 🎯 Key Features Explained

### AI Chat Integration

The chat assistant uses Retrieval Augmented Generation (RAG) to provide accurate answers about my background. It loads my resume at build time using Vite's `?raw` import for optimal performance.

### Glass Morphism Design System

Custom reusable components (`GlassCard`, `FeatureCard`, `StatBadge`) provide consistent styling throughout the site with customizable hover colors (purple, blue, cyan).

### Scroll Reveal Animations

The `ScrollReveal` component wraps sections and uses Intersection Observer to trigger animations when content enters the viewport, creating a dynamic user experience.

### Contact Form with Resend

Functional contact form that sends formatted emails via Resend API, with proper validation, loading states, and error handling.

## 📝 License

This project is open source and available under the MIT License.

## 📧 Contact

- **Email**: <jordanclemens1986@gmail.com>
- **GitHub**: [@jorcleme](https://github.com/jorcleme)
- **LinkedIn**: [Jordan Clemens](https://linkedin.com/in/jordan-clemens)

---

## 🔧 SvelteKit Documentation

This project is built with SvelteKit. For more information about the framework:

### Developing

Once you've installed dependencies with `npm install`, start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

For more information, visit the [SvelteKit documentation](https://kit.svelte.dev/).
