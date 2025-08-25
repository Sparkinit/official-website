import { useStore } from "@nanostores/react";
import { darkMode } from "@/stores";
import { useEffect } from "react";

const DarkModeManager = () => {
  const $darkMode = useStore(darkMode);

  useEffect(() => {
    if ($darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [$darkMode]);

  return null;
};

export default DarkModeManager;
