import { useState, useEffect } from "react";

interface CountdownProps {
  now: Date;
  activationDate: Date | undefined;
}

const Countdown = ({ now, activationDate }: CountdownProps) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUntilActivation = activationDate
    ? (() => {
        const currentTime = new Date(now.getTime() + elapsedSeconds * 1000);
        const timeDiff = activationDate.getTime() - currentTime.getTime();

        if (timeDiff <= 0) return "00:00:00";

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      })()
    : "00:00:00";

  return <div className="font-mono text-2xl">{timeUntilActivation}</div>;
};

export default Countdown;
