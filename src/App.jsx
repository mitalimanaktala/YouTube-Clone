import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from "./components/Layout.jsx";
import Watch from "./pages/Watch.jsx";
import Home from "./pages/Home.jsx";
import Upload from "./pages/Upload.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Trending from "./pages/Trending.jsx";
import History from "./pages/History.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./index.css";


function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  );
}

export default App;
