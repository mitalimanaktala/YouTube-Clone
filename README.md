# 🎬 Media Streamer – YouTube Clone

A modern YouTube-inspired video streaming platform built using **React + Vite**.  
This project replicates core YouTube functionality including video browsing, search, dynamic recommendations, watch history, and infinite scrolling.

🔗 **Live Demo:**  
👉 https://you-tube-clone-gauf8dt54-mitalis-projects-36610fb2.vercel.app

---

## 🚀 Features

- 🏠 Home page with dynamic video feed
- ♾ Infinite scroll (Home, Trending, History)
- 🔥 Trending videos (region-based)
- 🔎 Search functionality with search history
- 🎥 Watch page with embedded YouTube player
- 🎯 Smart video recommendations
- 🕘 Watch history stored using localStorage
- 🔄 Scroll-to-top on route change
- 🧩 Reusable custom hooks (useInfiniteScroll)
- 📱 Responsive sidebar layout
- 🔐 API key secured using environment variables

---

## 🧠 Recommendation Logic

The recommendation system works using:

1. `relatedToVideoId` from YouTube Data API  
2. Fallback title-based search (for Shorts or edge cases)  
3. Duplicate filtering for clean results  

This ensures recommendations always appear dynamically based on the currently watched video.

---

## 🛠 Tech Stack

- ⚛ **React**
- ⚡ **Vite**
- 🎨 **CSS Modules**
- 🌐 **YouTube Data API v3**
- 🚀 **Vercel (Deployment)**

---

## 📂 Project Structure

```bash
src/
│
├── api/                 # API integration logic
├── components/          # Reusable UI components
├── hooks/               # Custom hooks (useInfiniteScroll)
├── pages/               # Application pages
│
├── App.jsx
└── main.jsx
```

---

## ♾ Infinite Scroll Implementation

Implemented using:

- IntersectionObserver API
- Custom reusable hook
- Early loading using `rootMargin`
- Applied to:
  - Home Page
  - Trending Page
  - History Page

This ensures smooth and seamless user experience.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_RAPID_API_KEY=your_youtube_api_key_here
```

⚠ Do not expose your API key publicly.

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/mitalimanaktala/Youtube-Clone.git
cd your-repository-name
npm install
npm run dev
```

---

## 🏗 Build for Production

```bash
npm run build
```

---

## 🌍 Deployment

This project is deployed using **Vercel**.

To deploy:

1. Connect GitHub repository to Vercel
2. Add environment variable:
   - `VITE_RAPID_API_KEY`
3. Deploy

---

## 👩‍💻 Author

**Mitali Manaktala**  
B.Tech Computer Science Student  
Lovely Professional University  

---

## 📌 Future Improvements

- ▶ Autoplay next video
- 🌙 Dark mode toggle
- 📊 Real view count formatting
- 👍 Like / Comment system
- 🔐 Authentication system
- 📂 Category-based filtering

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
