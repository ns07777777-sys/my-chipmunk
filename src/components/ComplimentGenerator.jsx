import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";


const compliments = [
    "You're gorgeoussss beautifulllll hairrr omggg 🫠🫠🫠❤️❤️❤️❤️xx",
    "You’re eyes are the 8th wonder of the world😘😘😘😘xx",
    "You’re beauty is reflected both inside and outside 😘😘😘😘xx",
    "You’re just perfect in all ways every ways omggggg ❤️❤️❤️❤️❤️xx",
    "I LOVE YOUUUUUU SO SOOO MUCHHHH CARTERRRRR!!!! 😘😘😘😘😘😘❤️❤️❤️❤️❤️❤️!!!!xx",
    "You’re cuteeee gorgeoussss adorableeee noseee 😘😘😘😘😘😘😘xx",
    "You’re words traced with wisdom and such thought 🫠🫠🫠xx",
    "Your aurafull aura 😎🥰🥰🥰xx",
    "MY CHEEKY CHIPMUNKKKK 🤭🤭🤭",
    "MY WORLDDDD😘😘😘😘😘xx",
    "You are the most beautiful poem ❤️❤️❤️❤️xx",
    "And yes you always have and do give me butterflies 🦋🤭🤭xx",
    "MY EVERYTHINGGGG ❤️❤️❤️❤️❤️xx",
    "Your soft, full lips I want to kiss you so sooooo muchhhh omgggg 😘😘😘😘😘💋💋💋💋xx",
    "You’re sharp jawline omggg 😫😫😫😫🤭🤭xx",
    "You’re figure just so perfect so beautiful baby 😘😘😘😘xx",
    "MY CUTIEEEEEE 🥰🥰🥰🥰xx",
    "I have to say your handssss 🤭🤭🫠🫠🫠 xx",
    "MY FAVOURITE FOOTBALLER EVERRRR 🥰🥰🥰🥰 xx",
    "I love waking up and seeing my GORGEOUSSSS husbands face every morning 🥰🥰🥰 xx",
    "Your soothing voiceeee 🫠🫠🫠🥰🥰🥰 xx",
    "Your smile makes me melt 🥹🥹🫠🫠🫠 AAAA YOURE JUST SO CUTEEEE BABYYYY DJDNGJDJSN 😝😝😝 xx",
    "My big sexy naughty boy 🤭🤭😘😘😘 xx"
];

export default function ComplimentGenerator() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const nextCompliment = () => {
        setFade(false);
        setTimeout(() => {
            setIndex((index + 1) % compliments.length);
            setFade(true);
        }, 300);
    };

    const randomCompliment = () => {
        let randomIndex = Math.floor(Math.random() * compliments.length);
        if (randomIndex === index) randomIndex = (randomIndex + 1) % compliments.length;
        setFade(false);
        setTimeout(() => {
            setIndex(randomIndex);
            setFade(true);
        }, 300);
    };

    return (
        <div className="compliment-page">
            {/* Floating hearts background */}
            <div className="floating-heart"></div>
            <div className="floating-heart delay1"></div>
            <div className="floating-heart delay2"></div>

            <div className="compliment-box">
                <h1 className="compliment-title">🕯️ You, In Words</h1>
                <p className={`compliment-text ${fade ? "fade-in" : "fade-out"}`}>
                    {compliments[index]}
                </p>

                <div className="compliment-buttons">
                    <button className="btn btn-red" onClick={nextCompliment}>
                        ➡️ Next
                    </button>
                    <button className="btn btn-red" onClick={randomCompliment}>
                        🎲 Random
                    </button>
                </div>

                <Link to="/" className="btn back-btn">
                    ⬅️ Back to Home
                </Link>
            </div>
        </div>
    );
}
