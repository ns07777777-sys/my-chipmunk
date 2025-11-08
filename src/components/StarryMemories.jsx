// import React, { useEffect, useState } from "react";
// import "./StarryMemories.css";
// import { Link } from "react-router-dom";

// const memories = [
//   "The way you make me laugh no matter what 🥹",
//   "Our first date — I still think about it all the time 💕",
//   "When you stayed up late just to talk to me 🌙",
//   "How your hugs make everything feel okay 🤍",
//   "The way you look at me when you think I’m not looking 😳",
//   "That random road trip — one of my favorite days ever 🚗",
//   "You dancing like an idiot just to make me smile 😂",
//   "The way you say my name, soft and warm ☁️",
//   "Every time you tell me you love me — I melt a little 💫",
// ];

// export default function StarryMemories() {
//   const [stars, setStars] = useState([]);
//   const [popup, setPopup] = useState(null);

//   useEffect(() => {
//     const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
//       id: i,
//       top: Math.random() * 100,
//       left: Math.random() * 100,
//       animationDelay: `${Math.random() * 3}s`,
//       size: Math.random() * 2 + 1,
//       memory: memories[Math.floor(Math.random() * memories.length)],
//     }));
//     setStars(generatedStars);
//   }, []);

//   // Mouse parallax
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const stars = document.querySelectorAll(".star");
//       stars.forEach((star, i) => {
//         const speed = (i % 5) + 1;
//         const x = (window.innerWidth - e.pageX * speed) / 200;
//         const y = (window.innerHeight - e.pageY * speed) / 200;
//         star.style.transform = `translate(${x}px, ${y}px)`;
//       });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="starry-container">
//       {stars.map((star) => (
//         <div
//           key={star.id}
//           className="star clickable-star"
//           style={{
//             top: `${star.top}%`,
//             left: `${star.left}%`,
//             width: `${star.size}px`,
//             height: `${star.size}px`,
//             animationDelay: star.animationDelay,
//           }}
//           onClick={() => setPopup(star.memory)}
//         ></div>
//       ))}

//       <div className="starry-content">
//         <h1>🌌 Starry Memories</h1>
//         <p>Tap a star to reveal a memory 💫</p>
//         <Link to="/" className="back-home">← Back Home</Link>
//       </div>

//       {popup && (
//         <div className="memory-popup" onClick={() => setPopup(null)}>
//           <div className="memory-card">
//             <p>{popup}</p>
//             <button>✧ close ✧</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// src/pages/StarryMemories.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./StarryMemories.css"; // separate CSS (below)

export default function StarryMemories() {
    const placeholderMemories = [
        "The last day before the Christmas holidays 🫠🫠🫠",
        "When I’d just stare at you in maths and biology and physics 🫠🫠🫠even RE 😅xx",
        "The sixth form open evening 🥰🥰🥰 and at the end when you waited with me for my dad xx",
        "When i designed your name on your leavers shirtttt 🫠🫠🫠xx",
        "All of our hugsss 🥰🥰🥰 omggg I miss our hugs 🥺🥺🥺 xx",
        "The Liverpool tripppp, and how YOUUU got us both lost 🫨🫨🫨😌 xx",
        "Prommm, how gorgeous you looked omggg 🫠🫠🫠😘😘😘 and how I fed you the dinner there 🤭🤭xx"

    ];

    const [stars, setStars] = useState([]);
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        const generated = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            top: Math.random() * 92 + "%",
            left: Math.random() * 94 + "%",
            size: Math.random() * 6 + 8, // larger base stars so they're tappable
            memory: placeholderMemories[i % placeholderMemories.length],
            delay: Math.random() * 3,
        }));
        setStars(generated);
    }, []);

    // gentle parallax for mouse (no effect on touch)
    useEffect(() => {
        const handleMove = (e) => {
            const all = document.querySelectorAll(".star");
            all.forEach((el, idx) => {
                const speed = (idx % 5) + 1;
                const x = (e.clientX - window.innerWidth / 2) * (speed / 800);
                const y = (e.clientY - window.innerHeight / 2) * (speed / 1200);
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="starry-bg fade-in" style={{ paddingBottom: 80 }}>
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="star clickable-star"
                    style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                        transitionDelay: `${s.delay}s`,
                        boxShadow: "0 0 12px rgba(255,80,80,0.6)",
                        background: "radial-gradient(circle, #fff 0%, #ff9a9a 50%, rgba(255,50,50,0.05) 100%)",
                    }}
                    onClick={() => setPopup(s.memory)}
                />
            ))}

            <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: 24 }}>
                <h1 style={{ color: "#ff4d4d" }}>🌌 Starry Memories</h1>
                <p style={{ color: "#ffdede", maxWidth: 640, margin: "0 auto 16px" }}>
                    Tap a star to reveal a memory xx
                </p>
            </div>

            {popup && (
                <div className="memory-popup" onClick={() => setPopup(null)}>
                    <div className="memory-card">
                        <p style={{ color: "#fff" }}>{popup}</p>
                        <button onClick={() => setPopup(null)}>✧ close ✧</button>
                    </div>
                </div>
            )}

            {/* Back to Home at bottom */}
            <div style={{ position: "fixed", bottom: 18, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 40 }}>
                <Link to="/" className="back-home" style={{ background: "rgba(255,77,77,0.08)", padding: "10px 18px", borderRadius: 18, color: "#ffbdbd" }}>
                    ⬅ Back to Home
                </Link>
            </div>
        </div>
    );
}
