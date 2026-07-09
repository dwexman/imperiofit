"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
    const audioRef = useRef(null);
    const userPausedRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const startMusic = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (userPausedRef.current) return;

        try {
            audio.volume = 0.35;
            audio.loop = true;
            await audio.play();
            setIsPlaying(true);
            removeAutoStartListeners();
        } catch (error) {
            setIsPlaying(false);
            console.log("Autoplay bloqueado hasta interacción del usuario.");
        }
    };

    const pauseMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        userPausedRef.current = true;
        audio.pause();
        setIsPlaying(false);
    };

    const toggleMusic = () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            userPausedRef.current = false;
            startMusic();
        }
    };

    const removeAutoStartListeners = () => {
        window.removeEventListener("click", startMusic);
        window.removeEventListener("touchstart", startMusic);
        window.removeEventListener("pointerdown", startMusic);
        window.removeEventListener("scroll", startMusic);
        window.removeEventListener("keydown", startMusic);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.35;
        audio.loop = true;

        window.addEventListener("click", startMusic);
        window.addEventListener("touchstart", startMusic);
        window.addEventListener("pointerdown", startMusic);
        window.addEventListener("scroll", startMusic);
        window.addEventListener("keydown", startMusic);

        startMusic();

        return () => {
            removeAutoStartListeners();
        };
    }, []);

    return (
        <>
            <audio
                ref={audioRef}
                src="/music/technogym.mp3"
                preload="auto"
                autoPlay
                loop
                playsInline
            />

            <button
                type="button"
                onClick={toggleMusic}
                className="fixed right-5 top-[115px] z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-lg text-white shadow-[0_0_25px_rgba(255,90,31,0.4)] backdrop-blur-md transition duration-300 hover:scale-110 hover:border-[#FF5A1F] hover:text-[#FF8A00] md:right-8 md:top-[185px]"
                aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
            >
                {isPlaying ? "⏸" : "▶"}
            </button>
        </>
    );
}