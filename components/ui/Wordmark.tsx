import { useStore } from "@nanostores/react";
import { darkMode } from "@/stores";
import sparkinitUppercaseLight from "@/assets/sparkinit-uppercase-light.svg";
import sparkinitUppercaseDark from "@/assets/sparkinit-uppercase-dark.svg";

const Wordmark = () => {
  const $darkMode = useStore(darkMode);

  return (
    <div>
      {/* Light */}
      <img
        src={sparkinitUppercaseLight.src}
        alt="sparkinit"
        draggable={false}
        className={`w-full transition-all duration-300 ease-in-out ${
          $darkMode ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Dark */}
      <img
        src={sparkinitUppercaseDark.src}
        alt="sparkinit"
        draggable={false}
        className={`absolute top-0 left-0 w-full px-3 pt-4 transition-all duration-300 ease-in-out sm:px-6 sm:pt-6 md:px-8 md:pt-8 ${
          $darkMode ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default Wordmark;
