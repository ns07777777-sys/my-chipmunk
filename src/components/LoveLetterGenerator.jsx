// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../index.css";

// export default function MusicPlayer() {
//   const [songs] = useState([
//     { title: "Song 1 – Red Lights", note: "This one always reminds me of our late-night drives ❤️", file: "../assets/songs/2 - Miracle Aligner - The Last Shadow Puppets.mp3" },
//     { title: "Song 2 – Your Smile", note: "Every lyric feels like you.", file: "/songs/song2.mp3" },
//     { title: "Song 3 – Retro Love", note: "A little vintage, just like us 💿", file: "/songs/song3.mp3" },
//     { title: "Song 4 – Starry Nights", note: "We danced under the stars once… 🌌", file: "/songs/song4.mp3" },
//     { title: "Song 5 – Heartbeat", note: "The rhythm that keeps me going.", file: "/songs/song5.mp3" },
//     // ... keep your other songs ...
//   ]);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(new Audio());
//   const canvasRef = useRef(null);

//   const currentSong = songs[currentIndex];

//   // 🎵 Visualizer setup (same as before)
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     let audioCtx;
//     let analyser;
//     let dataArray;
//     let animationId;

//     const draw = () => {
//       animationId = requestAnimationFrame(draw);
//       if (!analyser || !dataArray) return;
//       analyser.getByteFrequencyData(dataArray);

//       ctx.fillStyle = "rgba(10, 0, 0, 0.25)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       const barWidth = (canvas.width / dataArray.length) * 1.5;
//       let x = 0;
//       for (let i = 0; i < dataArray.length; i++) {
//         const barHeight = dataArray[i] * 0.9;
//         const red = 255;
//         const green = Math.min(120, barHeight / 2);
//         const blue = Math.min(60, barHeight / 4);
//         ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
//         ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//         x += barWidth + 1;
//       }
//     };

//     const handlePlay = async () => {
//       if (!audioCtx) {
//         audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//         const source = audioCtx.createMediaElementSource(audioRef.current);
//         analyser = audioCtx.createAnalyser();
//         analyser.fftSize = 64;
//         const bufferLength = analyser.frequencyBinCount;
//         dataArray = new Uint8Array(bufferLength);
//         source.connect(analyser);
//         analyser.connect(audioCtx.destination);
//       }
//       if (audioCtx.state === "suspended") await audioCtx.resume();
//       draw();
//     };

//     audioRef.current.addEventListener("play", handlePlay);
//     const resize = () => {
//       canvas.width = canvas.clientWidth;
//       canvas.height = 120;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("resize", resize);
//       audioRef.current.removeEventListener("play", handlePlay);
//     };
//   }, []);

//   // 🕒 Update progress bar
//   useEffect(() => {
//     const audio = audioRef.current;
//     const updateProgress = () => {
//       setProgress((audio.currentTime / audio.duration) * 100 || 0);
//       setDuration(audio.duration || 0);
//     };
//     audio.addEventListener("timeupdate", updateProgress);
//     audio.addEventListener("ended", handleNext);
//     return () => {
//       audio.removeEventListener("timeupdate", updateProgress);
//       audio.removeEventListener("ended", handleNext);
//     };
//   }, [currentIndex]);

//   const handleSeek = (e) => {
//     const audio = audioRef.current;
//     const newTime = (e.target.value / 100) * audio.duration;
//     audio.currentTime = newTime;
//     setProgress(e.target.value);
//   };

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % songs.length);
//     setTimeout(() => {
//       audioRef.current.src = songs[(currentIndex + 1) % songs.length].file;
//       audioRef.current.play();
//       setIsPlaying(true);
//     }, 100);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
//     setTimeout(() => {
//       audioRef.current.src = songs[(currentIndex - 1 + songs.length) % songs.length].file;
//       audioRef.current.play();
//       setIsPlaying(true);
//     }, 100);
//   };

//   useEffect(() => {
//     audioRef.current.src = currentSong.file;
//   }, [currentIndex]);

//   const formatTime = (seconds) => {
//     if (!seconds || isNaN(seconds)) return "0:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div className="music-page">
//       <div className="music-header">
//         <h1 className="music-title">❤️ Our Playlist</h1>
//         <canvas ref={canvasRef} className="visualizer-bar"></canvas>
//        <p className="music-subtitle">
//   {currentSong ? currentSong.note : "Every song has a memory, every beat a smile."}
// </p>

//       </div>

//       <div className="music-controls">
//         <button onClick={handlePrev}>⏮ Prev</button>
//         <button onClick={handlePlayPause}>{isPlaying ? "⏸ Pause" : "▶️ Play"}</button>
//         <button onClick={handleNext}>⏭ Next</button>
//       </div>

//       <div className="progress-section">
//         <span>{formatTime(audioRef.current.currentTime)}</span>
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={progress}
//           onChange={handleSeek}
//           className="progress-bar"
//         />
//         <span>{formatTime(duration)}</span>
//       </div>

//       <div className="music-list">
//         {songs.map((song, index) => (
//           <div key={index} className={`song-item ${currentIndex === index ? "active" : ""}`}>
//             <div className="song-info">
//               <h3>{song.title}</h3>
//               <p className="song-note">{song.note}</p>
//             </div>
//             <button className="btn-red" onClick={() => setCurrentIndex(index)}>
//               {currentIndex === index && isPlaying ? "⏸ Pause" : "▶️ Play"}
//             </button>
//           </div>
//         ))}
//       </div>

//       <Link to="/" className="btn-back">⬅️ Back to Home</Link>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GraphemeSplitter from "grapheme-splitter";
import "../index.css";

export default function LoveLetter() {
    const [displayedText, setDisplayedText] = useState("");
    const [speed, setSpeed] = useState(50);
    const [isDone, setIsDone] = useState(false);
    const textRef = useRef(null);
    const userScrolledUp = useRef(false);

    const loveLetterText = `
Hy you ❤️
I just wanted to take a moment to remind you how amazing you are.
Every single thing about you — your laugh, your smile, your weird little habits — makes my world brighter.
You’ve turned ordinary moments into memories I’ll never forget.
Even when you’re quiet, you speak to my heart louder than anyone else ever could.
So here’s my little love letter — not perfect, but perfectly you.
Because no one else could ever make me feel this way. 💫

Yours, forever and always. 💋
`;

    // 🩷 Typing effect
    useEffect(() => {
        const splitter = new GraphemeSplitter();
        const letters = splitter.splitGraphemes(loveLetterText);
        let index = 0;
        let isCancelled = false;

        const typeNext = () => {
            if (isCancelled) return;
            if (index < letters.length) {
                setDisplayedText((prev) => prev + letters[index]);
                index++;
                setTimeout(typeNext, speed);
            } else {
                setIsDone(true);
            }
        };

        typeNext();
        return () => {
            isCancelled = true;
        };
    }, [speed]);

    // 💫 Scroll logic (only scrolls if user hasn't scrolled up)
    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const nearBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < 50;

        if (nearBottom && !userScrolledUp.current && !isDone) {
            el.scrollTop = el.scrollHeight;
        }
    }, [displayedText, isDone]);

    // 🚀 Detect when user scrolls manually
    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const handleScroll = () => {
            const nearBottom =
                el.scrollHeight - el.scrollTop - el.clientHeight < 50;
            userScrolledUp.current = !nearBottom;
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="love-page">
            <h1 className="music-title">💌 My Love Letter</h1>

            <div ref={textRef} className="love-letter-box">
                <pre className="love-text">
                    {displayedText}
                    {!isDone && <span className="cursor">|</span>}
                </pre>
            </div>

            <div className="btn-container">
                <button
                    className="btn-red"
                    onClick={() => setSpeed((prev) => Math.max(10, prev - 20))}
                >
                    ⚡ Speed Up
                </button>

                <Link to="/" className="btn-red">
                    ⬅️ Back to Home
                </Link>
            </div>
        </div>
    );
}
