import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Home() {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        // Add slight delay for entrance animation
        const timer = setTimeout(() => setShowButtons(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home-container">
            <div className="background-glow"></div>

            <div className="home-content">
                <h1 className="app-title glitch" data-text="MyChipmunk ❤️">
                    Carter, My Cheeky Chipmunk ❤️
                </h1>

                <p className="subtitle">I love you forever Carter. Lots of love, Noorin xxx</p>

                {showButtons && (
                    <div className="button-container">
                        <Link to="/music" className="retro-btn red-btn">
                            💌 Birthday Love Letter
                        </Link>
                        <Link to="/compliments" className="retro-btn pink-btn">
                            🕯️ You, In Words
                        </Link>
                        <Link to="/stars" className="retro-btn purple-btn">
                            🌌 Starry Memories
                        </Link>
                    </div>
                )}
            </div>

            <footer className="footer">© 2025 Carter My Cheeky Chipmunk | Made with ❤️, by Noorin xx</footer>
        </div>
    );
}
