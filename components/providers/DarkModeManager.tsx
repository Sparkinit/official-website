import { useStore } from "@nanostores/react";
import { darkMode } from "@/lib/store";
import { useEffect } from "react";

const DarkModeManager = () => {
  const $darkMode = useStore(darkMode);

  useEffect(() => {
    if ($darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [$darkMode]);

  return null;
};

export default DarkModeManager;
