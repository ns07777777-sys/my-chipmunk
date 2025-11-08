import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MusicPlayer from "./components/LoveLetterGenerator";
import ComplimentGenerator from "./components/ComplimentGenerator";
import StarryMemories from "./components/StarryMemories";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<MusicPlayer />} />
        <Route path="/compliments" element={<ComplimentGenerator />} />
        <Route path="/stars" element={<StarryMemories />} />
      </Routes>
    </Router>
  );
}
