import { useEffect, useState } from "react";

interface CountdownProps {
  now: Date;
  activationDate: Date | undefined;
}

const Countdown = ({ now, activationDate }: CountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!activationDate) {
      setSecondsLeft(0);
      return;
    }
    const initialSeconds = Math.max(
      0,
      Math.floor((activationDate.getTime() - now.getTime()) / 1000)
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

  return <div className="font-mono text-2xl">{`${h}:${m}:${s}`}</div>;
};

export default Countdown;
