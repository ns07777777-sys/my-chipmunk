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

    const loveLetterText = 
`To my gorgeous most beautiful husband on his 18th birthday!!! ❤️❤️❤️
Honestly any words I say will never ever amount to how much you truly mean to me and how much I love you
For my love for you is never ending baby❤️❤️❤️.
I pray you have the future you dream of, achieve the goals you have set out in your mind,
You are now 18!! You’re now at the point where so many new doors and pathways are unlocked so many more decisions to make, destinations to take, always keep your head up as you always have, and keep going no matter how hard it gets and I promise you I am forever holding your hand through it all, I am forever your number 1 supporter, forever cheering you on.
I look at you, and it makes me so emotional, I’m crying as I’m writing this 😅 (its currently November 8th at 11:29pm, just as a time stamp😌) because you are literally a miracle,
You are literally the strongest person I know and will ever know, and I am forever and ever proud of you my baby ❤️❤️❤️.
In the poetry world, they say, every poet has their muse, and you are my muse, 
You are an art, and not everyone can be an art, not anyone can be an art,
But you are an art.
I’ve just sat here and thought, I’ve wrote a poem about you through the season of autumn,
But omg I can literally write about the season of winter through you as well,
And the season of spring and summer too. I can look at the ocean and write about you, the sun, the sky.
You are the most perfect most beautiful creation my love, always know that, both inside and out.
One day, and this day isn’t far away at all, we will be cuddling together on our sofa, watching our children play, and we’ll think back to this time, and how everything used to be. 
How lucky am I to have been blessed with you Carter. 
Baby, I hope you have the best birthday ever❤️❤️❤️, you better tell me all about your dayyy 👹👹👹 😘😘😘.
I love you forever Carter ❤️❤️❤️❤️❤️😘😘😘😘😘😘
Lots of Love,
Noorin xxx
`;

    // 🩷 Typing effect
    useEffect(() => {
        setDisplayedText(""); // ✅ Clear text before typing starts
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
    }, [speed, loveLetterText]); // ✅ include loveLetterText here too



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
