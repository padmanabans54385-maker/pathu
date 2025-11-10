"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------
   Shared UI
--------------------------------------------------------*/
const Screen = ({ children }) => (
  <div
    style={{
      height: "100dvh",
      width: "100%",
      background:
        "radial-gradient(1200px 800px at 50% 30%, rgba(255,80,160,0.08), rgba(10,10,26,1))",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial",
    }}
  >
    {children}
  </div>
);

const PinkButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      marginTop: 24,
      padding: "14px 28px",
      borderRadius: 999,
      border: "none",
      fontWeight: 700,
      fontSize: 18,
      color: "white",
      background:
        "linear-gradient(90deg, rgba(255,109,177,1), rgba(255,63,169,1))",
      boxShadow: "0 0 24px rgba(255,95,190,0.6)",
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

/* -------------------------------------------------------
   Fun particles
--------------------------------------------------------*/
function Hearts() {
  // floating hearts background
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 6,
        size: 10 + Math.random() * 10,
      })),
    []
  );
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, 0.6, 0] }}
          transition={{ repeat: Infinity, delay: h.delay, duration: h.duration }}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            background:
              "radial-gradient(circle at 30% 30%, #ff99d5, #ff4aa7 60%, transparent 61%)",
            transform: "rotate(45deg)",
            borderRadius: 6,
            filter: "blur(0.2px)",
          }}
        />
      ))}
    </div>
  );
}

function Confetti({ show }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.6,
        rot: (Math.random() - 0.5) * 360,
        dur: 2.2 + Math.random() * 1.8,
      })),
    []
  );
  if (!show) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10%", opacity: 0, rotate: 0 }}
          animate={{ y: "110%", opacity: [0, 1, 1, 0], rotate: p.rot }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            width: 8,
            height: 12,
            background: `hsl(${Math.floor(Math.random() * 360)},90%,60%)`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

function Bunting() {
  // simple SVG bunting
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: "94%",
        maxWidth: 1100,
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 1000 140" width="100%" height="100%">
        <path
          d="M10 20 C 250 140, 750 140, 990 20"
          stroke="#ffffff33"
          strokeWidth="3"
          fill="none"
        />
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 30 + (940 / 17) * i;
          const y = 20 + (i % 2 ? 90 : 70);
          const hue = (i * 27) % 360;
          return (
            <polygon
              key={i}
              points={`${x},20 ${x + 22},${y} ${x - 22},${y}`}
              fill={`hsl(${hue},90%,55%)`}
              stroke="#00000022"
            />
          );
        })}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------
   Screens
--------------------------------------------------------*/
function Countdown({ onDone }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    const t = setInterval(() => {
      setN((c) => {
        if (c <= 1) {
          clearInterval(t);
          onDone?.();
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <Screen>
      <Hearts />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <motion.div
          key={n}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 170,
            height: 170,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background:
              "radial-gradient(circle, rgba(255,0,255,0.35), rgba(0,0,0,0.6))",
            boxShadow: "0 0 40px #ff00ff, 0 0 70px #00ffff",
            fontSize: 80,
            fontWeight: 800,
            color: "#ff5db6",
            textShadow: "0 0 24px #ff5db6",
          }}
        >
          {n}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p
            style={{
              fontSize: 22,
              color: "#ffcfe8",
              textShadow: "0 0 12px #ff5db6",
            }}
          >
            Crafting your special moment…
          </p>
        </motion.div>
      </motion.div>
    </Screen>
  );
}

function Intro({ onNext }) {
  return (
    <Screen>
      <Hearts />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: "center", padding: 16 }}
      >
        <motion.img
          src="https://raw.githubusercontent.com/OrnithopterDev/public-assets/main/cute-bear.png"
          alt="cute"
          width={130}
          height={130}
          style={{ margin: "0 auto 14px", filter: "drop-shadow(0 6px 14px #0008)" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        />
        <h1
          style={{
            fontSize: 44,
            lineHeight: 1.15,
            margin: 0,
            color: "#ff9bd6",
            textShadow: "0 0 20px #ff4fa4",
          }}
        >
          A Cutiepie was born today, 21 years ago!
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 18,
            color: "#ffe0f3",
            textShadow: "0 0 10px #ff6db1",
          }}
        >
          Yes, it’s <b>YOU!</b> A little surprise awaits…
        </p>
        <PinkButton onClick={onNext}>⭐ Start the surprise</PinkButton>
      </motion.div>
    </Screen>
  );
}

function Cake({ onLight, lit }) {
  const flamePulse = {
    animate: { scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] },
    transition: { duration: 1.2, repeat: Infinity },
  };
  return (
    <Screen>
      <Bunting />
      <Hearts />
      <div style={{ textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.7 }}
          style={{ position: "relative", display: "inline-block" }}
        >
          {/* simple cake svg */}
          <svg width="280" height="200" viewBox="0 0 280 200">
            <defs>
              <radialGradient id="plate" cx="50%" cy="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ccccdd" />
              </radialGradient>
            </defs>
            <ellipse cx="140" cy="180" rx="110" ry="20" fill="url(#plate)" />
            <g>
              <ellipse cx="140" cy="140" rx="110" ry="40" fill="#7b4b2a" />
              <ellipse cx="140" cy="110" rx="110" ry="40" fill="#8a532e" />
              <ellipse cx="140" cy="80" rx="110" ry="40" fill="#9c5c32" />
              {/* icing */}
              <path
                d="M30,70 q110,50 220,0 v25 q-110,45 -220,0 z"
                fill="#fff5ea"
              />
            </g>
            {/* candle */}
            <rect x="133" y="40" width="14" height="40" rx="6" fill="#ff3f65" />
          </svg>

          {/* flame */}
          <AnimatePresence>
            {lit && (
              <motion.div
                {...flamePulse}
                exit={{ opacity: 0, scale: 0.5 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 28,
                  transform: "translateX(-50%)",
                  width: 26,
                  height: 38,
                  background:
                    "radial-gradient(circle at 50% 30%, #ffd26a, #ff6d00 65%, transparent 66%)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  filter: "drop-shadow(0 0 18px #ff9f00)",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {!lit ? (
          <PinkButton onClick={onLight}>🔥 Light the Candle</PinkButton>
        ) : (
          <PinkButton onClick={onLight}>🎈 Pop the Balloons</PinkButton>
        )}
      </div>
    </Screen>
  );
}

function Balloons({ onDone }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 10 + i * 8 + (Math.random() * 6 - 3),
        delay: Math.random() * 0.6,
        color: `hsl(${(i * 36) % 360},90%,60%)`,
      })),
    []
  );
  const [popped, setPopped] = useState(new Set());

  const allPopped = popped.size === balloons.length;

  return (
    <Screen>
      <Bunting />
      <Confetti show={allPopped} />
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            onClick={() =>
              setPopped((s) => new Set(s).add(b.id))
            }
            initial={{ y: "110%", opacity: 0 }}
            animate={
              popped.has(b.id)
                ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] }
                : { y: ["110%", "-10%"], opacity: [0, 1, 1] }
            }
            transition={
              popped.has(b.id)
                ? { duration: 0.35 }
                : { duration: 6, repeat: Infinity, delay: b.delay, ease: "easeInOut" }
            }
            style={{
              position: "absolute",
              left: `${b.x}%`,
              bottom: 0,
              width: 46,
              height: 58,
              background: b.color,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: "50%",
                width: 2,
                height: 24,
                transform: "translateX(-50%)",
                background: "#ffffff88",
              }}
            />
          </motion.div>
        ))}

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 40,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 42,
              color: "#ff9bd6",
              textShadow: "0 0 18px #ff4fa4",
              marginBottom: 8,
            }}
          >
            Happy Birthday, Cutiepiee!
          </motion.h1>

          {!allPopped ? (
            <div style={{ opacity: 0.9, fontSize: 16, color: "#ffe0f3" }}>
              Tap the balloons to pop them 🎈
            </div>
          ) : (
            <PinkButton onClick={onDone}>✨ Decorate</PinkButton>
          )}
        </div>
      </div>
    </Screen>
  );
}

function Decorate({ onDone }) {
  const [sprinkles, setSprinkles] = useState(0);
  return (
    <Screen>
      <Hearts />
      <div style={{ textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* cake again */}
          <svg width="280" height="200" viewBox="0 0 280 200">
            <ellipse cx="140" cy="180" rx="110" ry="20" fill="#e7e7f1" />
            <g>
              <ellipse cx="140" cy="140" rx="110" ry="40" fill="#7b4b2a" />
              <ellipse cx="140" cy="110" rx="110" ry="40" fill="#8a532e" />
              <ellipse cx="140" cy="80" rx="110" ry="40" fill="#9c5c32" />
              <path
                d="M30,70 q110,50 220,0 v25 q-110,45 -220,0 z"
                fill="#fff5ea"
              />
            </g>
            <rect x="133" y="40" width="14" height="40" rx="6" fill="#ff3f65" />
            {/* pseudo sprinkles */}
            {Array.from({ length: sprinkles }).map((_, i) => (
              <rect
                key={i}
                x={40 + Math.random() * 200}
                y={70 + Math.random() * 40}
                width="6"
                height="3"
                fill={`hsl(${(i * 47) % 360},90%,60%)`}
                rx="1"
              />
            ))}
          </svg>
        </motion.div>

        <div style={{ marginTop: 12, color: "#ffe0f3" }}>
          Click to add sprinkles: {sprinkles}
        </div>
        <PinkButton
          onClick={() => setSprinkles((s) => Math.min(80, s + 10))}
        >
          ✨ Add Sprinkles
        </PinkButton>
        <PinkButton onClick={onDone}>💖 Continue</PinkButton>
      </div>
    </Screen>
  );
}

function Finale({ onRestart }) {
  return (
    <Screen>
      <Confetti show />
      <Hearts />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ textAlign: "center", padding: 16 }}
      >
        <h1
          style={{
            fontSize: 48,
            margin: 0,
            color: "#ff9bd6",
            textShadow: "0 0 20px #ff4fa4",
          }}
        >
          Make a Wish ✨
        </h1>
        <p style={{ marginTop: 12, color: "#ffe0f3", fontSize: 18 }}>
          May your year be filled with love, laughter and endless surprises!
        </p>
        <PinkButton onClick={onRestart}>🔁 Replay</PinkButton>
      </motion.div>
    </Screen>
  );
}

/* -------------------------------------------------------
   Root App: connects all pages
--------------------------------------------------------*/
export default function BirthdayApp() {
  // 0=Countdown, 1=Intro, 2=Cake(light), 3=Balloons, 4=Decorate, 5=Finale
  const [step, setStep] = useState(0);
  const [candleLit, setCandleLit] = useState(false);

  const next = () => setStep((s) => Math.min(5, s + 1));

  // simple music (optional)
  const audioRef = useRef(null);
  useEffect(() => {
    if (step >= 2 && audioRef.current) {
      audioRef.current.volume = 0.35;
      // best-effort play (will start after first user interaction in some browsers)
      audioRef.current.play().catch(() => {});
    }
  }, [step]);

  return (
    <>
      <audio
        ref={audioRef}
        src="https://raw.githubusercontent.com/OrnithopterDev/public-assets/main/happy-birthday-soft.mp3"
        preload="auto"
        loop
      />
      <AnimatePresence mode="wait">
        {step === 0 && <Countdown key="count" onDone={() => setStep(1)} />}
        {step === 1 && <Intro key="intro" onNext={() => setStep(2)} />}
        {step === 2 && (
          <Cake
            key="cake"
            lit={candleLit}
            onLight={() => {
              if (!candleLit) setCandleLit(true);
              else setStep(3);
            }}
          />
        )}
        {step === 3 && <Balloons key="balloons" onDone={() => setStep(4)} />}
        {step === 4 && <Decorate key="decorate" onDone={() => setStep(5)} />}
        {step === 5 && <Finale key="finale" onRestart={() => setStep(0)} />}
      </AnimatePresence>
    </>
  );
}
