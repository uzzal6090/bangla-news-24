# 📰 Bangla News 24

A modern, responsive Bangla news platform built with **Next.js**, featuring dynamic news content, category-based browsing, user authentication, profile management, and a responsive user experience.

The project focuses on building a production-style news application with **server-side data fetching, dynamic routes, authentication, MongoDB integration, and responsive UI development**.

## 🔗 Live Demo

**Live Website:(https://bangla-news-24-two.vercel.app/)

**Repository:https://github.com/uzzal6090/bangla-news-24

---

## 📌 About The Project

**Bangla News 24** is a full-stack news application designed to provide users with an organized and responsive platform for browsing Bangla news.

Users can explore news by category, read individual news articles, create an account, sign in using email/password or social providers, and manage their profile.

The application's UI is inspired by a modern Bangla news portal design, with particular attention to responsive layouts, navigation, typography, spacing, news cards, and content organization.

---

## ✨ Features

### 📰 News & Content

* Browse the latest news articles
* Browse news by category
* Dynamic news details pages
* Dynamic category pages
* News cards with images, titles, descriptions, and categories
* Responsive news layouts across different screen sizes
* Server-side data fetching for news content
* Graceful handling of unavailable news using Next.js `notFound()`

### 🔐 Authentication

* Email and password registration
* Email and password sign-in
* Google authentication
* GitHub authentication
* Session-based authentication
* Protected user functionality
* User profile management
* Authentication state displayed in the navigation
* Secure authentication using Better Auth

### 👤 User Profile

* View authenticated user information
* Update profile information
* Display user information in the application
* Authentication-aware navigation

### 📱 Responsive Design

* Mobile-first responsive layout
* Desktop, tablet, and mobile support
* Responsive navigation
* Adaptive news card layouts
* Mobile-friendly typography and spacing
* Responsive header and content sections

### ⚡ Next.js Features

* App Router
* Dynamic routes
* Server Components
* Client Components where required
* Server-side data fetching
* Dynamic page rendering
* `notFound()` handling
* Optimized image rendering with Next.js Image

---

## 🛠️ Technologies Used

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **HTML5**
* **CSS3**

### Backend & Authentication

* **Better Auth**
* **MongoDB**
* **MongoDB Adapter for Better Auth**

### API

The application consumes news data from the project API:

```text
https://news-api-v2.vercel.app
```

### Development Tools

* **Git**
* **GitHub**
* **Vercel**
* **VS Code**
* **npm**

---

## 🏗️ Project Structure

A simplified version of the project structure:

```text
bangla-news-24/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │
│   │   ├── auth/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   │
│   │   ├── news/
│   │   │   └── [newsId]/
│   │   │
│   │   ├── profile/
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │
│   └── lib/
│       ├── auth.ts
│       └── auth-client.ts
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

> The exact structure may vary as the project continues to evolve.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Project

```bash
cd bangla-news-24
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
BETTER_AUTH_DB_URL=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_SECRET=your_better_auth_secret
```

If social authentication is enabled, configure the required provider credentials as well:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> Never commit `.env.local` or any secret credentials to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Authentication Architecture

Authentication is implemented using **Better Auth** with MongoDB.

The application supports:

```text
Email & Password
       │
       ├── Sign Up
       ├── Sign In
       └── Session
       
Social Authentication
       │
       ├── Google
       └── GitHub
```

Authentication-related API routes are handled through the Better Auth catch-all route.

Example:

```text
/api/auth/[...all]
```

The client communicates with the authentication system through the configured Better Auth client.

---

## 🗄️ Database

The application uses **MongoDB** for authentication-related persistent data.

The database is configured through the MongoDB connection string stored in an environment variable.

### Database

```text
MongoDB
```

### Adapter

```text
@better-auth/mongo-adapter
```

This keeps authentication data such as users, sessions, accounts, and related records persistent.

---

## 🌐 News API

News content is retrieved from the external news API.

Base API:

```text
https://news-api-v2.vercel.app/api
```

The application uses API endpoints for operations such as:

* Fetching categories
* Fetching category-specific news
* Fetching individual news articles

Example category endpoint:

```text
/api/category/{categoryId}
```

Example news detail endpoint:

```text
/api/news/{newsId}
```

---

## 📄 Main Routes

| Route                    | Description             |
| ------------------------ | ----------------------- |
| `/`                      | Home page               |
| `/news/[newsId]`         | Individual news article |
| `/category/[categoryId]` | Category-based news     |
| `/signin`                | User sign-in            |
| `/signup`                | User registration       |
| `/profile`               | User profile            |

> Route names may be adjusted according to the final application structure.

---

## 🎨 Design & UI

The application follows a modern Bangla news portal layout with emphasis on:

* Clean content hierarchy
* Responsive navigation
* News-focused card layouts
* Consistent spacing
* Readable typography
* Responsive images
* Mobile-friendly navigation
* Desktop and mobile layouts

The visual structure was developed with **Bangla Bulletin** as the primary design reference while implementing the project's own functionality and data.

---

## 📱 Responsive Design

The application is designed to work across:

```text
📱 Mobile
   ↓
📱 Tablet
   ↓
💻 Laptop
   ↓
🖥️ Desktop
```

Responsive behavior includes:

* Flexible containers
* Responsive grid layouts
* Adaptive navigation
* Mobile-friendly typography
* Responsive images
* Appropriate spacing at different breakpoints

---

## ⚙️ Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Start Production Server

```bash
npm run start
```

Runs the production build locally.

### Lint

```bash
npm run lint
```

Checks the project for linting issues.

---

## 🚀 Deployment

The project is deployed using **Vercel**.

### Deploy with Vercel CLI

Install the Vercel CLI:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

### Environment Variables

Before deploying, make sure all required environment variables are configured in the Vercel project settings.

For example:

```env
BETTER_AUTH_DB_URL
BETTER_AUTH_URL
BETTER_AUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

For production, `BETTER_AUTH_URL` should point to the deployed application URL rather than `localhost`.

---

## 🔒 Security Considerations

* Sensitive credentials are stored in environment variables.
* `.env.local` is excluded from version control.
* Authentication is handled through Better Auth.
* OAuth credentials are not exposed in source code.
* Database credentials are not committed to GitHub.
* Server-side secrets are kept outside the client-side code.

---

## 📚 What I Learned

This project helped strengthen my understanding of:

* Next.js App Router
* Server Components and Client Components
* Dynamic routing
* API integration
* Asynchronous data fetching
* Authentication architecture
* Better Auth
* MongoDB integration
* OAuth authentication
* Session management
* Protected user functionality
* Responsive UI development
* Tailwind CSS
* Environment variable management
* Production deployment with Vercel
* Debugging Next.js applications

---

## 🔮 Future Improvements

Possible future improvements include:

* 🔎 Advanced news search
* 🔖 Bookmark/save news
* ❤️ Favorite articles
* 💬 User comments
* 🔔 News notifications
* 🌙 Dark mode
* 📊 User reading history
* 📰 Personalized news recommendations
* ⚡ Improved caching and performance
* 🧪 Automated testing

---

## 👨‍💻 Author

### Uzzal Hosen

Computer Science & Engineering Graduate | Software Engineer in Progress

I am currently focused on building modern web applications and improving my skills in full-stack software development.

### Connect With Me

* **GitHub:** https://github.com/uzzal6090
* **LinkedIn:** https://www.linkedin.com/in/uzzal-hosen-b9ba12395/

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and portfolio purposes.
