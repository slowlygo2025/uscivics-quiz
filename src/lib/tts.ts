/** Browser Web Speech API helpers for oral interview practice. */

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
}

/**
 * Speak text aloud. Defaults to en-US so practice matches the real oral interview.
 */
export function speak(
  text: string,
  options?: { lang?: string; rate?: number; onEnd?: () => void }
) {
  if (!isSpeechSupported() || !text.trim()) return;

  stopSpeaking();
  const utter = new SpeechSynthesisUtterance(text.trim());
  utter.lang = options?.lang ?? "en-US";
  utter.rate = options?.rate ?? 0.92;

  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(utter.lang.toLowerCase().slice(0, 2)) &&
        /en-US|Samantha|Google US|Microsoft Aria|Microsoft Guy/i.test(
          `${v.lang} ${v.name}`
        )
    ) ||
    voices.find((v) =>
      v.lang.toLowerCase().startsWith(utter.lang.toLowerCase().slice(0, 2))
    );
  if (preferred) utter.voice = preferred;

  if (options?.onEnd) {
    utter.onend = () => options.onEnd?.();
    utter.onerror = () => options.onEnd?.();
  }

  // Chrome sometimes needs a tick after cancel
  window.setTimeout(() => window.speechSynthesis.speak(utter), 40);
}

export function speakLines(
  lines: string[],
  options?: { lang?: string; rate?: number; onEnd?: () => void }
) {
  const joined = lines.filter(Boolean).join(". ");
  speak(joined, options);
}
