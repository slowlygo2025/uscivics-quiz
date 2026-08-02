"use client";

import { useEffect, useState } from "react";
import { isSpeechSupported, speak, speakLines, stopSpeaking } from "@/lib/tts";

export default function SpeakButton({
  label,
  text,
  texts,
  lang = "en-US",
}: {
  label: string;
  text?: string;
  texts?: string[];
  lang?: string;
}) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(isSpeechSupported());
    const warm = () => window.speechSynthesis.getVoices();
    warm();
    window.speechSynthesis?.addEventListener("voiceschanged", warm);
    return () => {
      window.speechSynthesis?.removeEventListener("voiceschanged", warm);
      stopSpeaking();
    };
  }, []);

  if (!supported) return null;

  function toggle() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    const onEnd = () => setSpeaking(false);
    if (texts?.length) {
      speakLines(texts, { lang, onEnd });
    } else if (text) {
      speak(text, { lang, onEnd });
    } else {
      setSpeaking(false);
    }
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold touch-manipulation transition-colors ${
        speaking
          ? "border-signal/40 bg-signal text-white"
          : "border-line bg-surface text-ink-soft hover:border-signal/40 hover:text-ink"
      }`}
      aria-pressed={speaking}
    >
      <span aria-hidden className="text-[11px]">
        {speaking ? "■" : "▶"}
      </span>
      {speaking ? "Stop" : label}
    </button>
  );
}
