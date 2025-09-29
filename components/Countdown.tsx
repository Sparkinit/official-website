import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { darkMode } from "@/stores";

interface CountdownProps {
  now: Date;
  activationDate: Date | undefined;
  imageSrc?: string;
}

const Countdown = ({ now, activationDate, imageSrc }: CountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const $darkMode = useStore(darkMode);

  useEffect(() => {
    if (!activationDate) {
      setSecondsLeft(0);
      return;
    }
    const initialSeconds = Math.max(
      0,
      Math.floor((activationDate.getTime() - now.getTime()) / 1000),
    );
    setSecondsLeft(initialSeconds);
  }, [activationDate, now]);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div
      className={`relative h-full w-full transition-all duration-300 ease-in-out ${$darkMode ? "bg-[#C62E01]" : "bg-[#FFD4C7]"}`}
    >
      <img
        src={imageSrc}
        alt="Background"
        className="h-full w-full object-cover"
        draggable="false"
      />
      <div className="bg-background absolute bottom-6 left-0 font-mono text-xl">{`${h}:${m}:${s}`}</div>
    </div>
  );
};

export default Countdown;
