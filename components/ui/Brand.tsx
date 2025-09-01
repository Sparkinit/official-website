import { useStore } from "@nanostores/react";
import { darkMode } from "@/stores";
import sparkinitLight from "@/assets/sparkinit-light.svg";
import sparkinitDark from "@/assets/sparkinit-dark.svg";

const Brand = () => {
  const $darkMode = useStore(darkMode);

  return (
    <button
      onClick={() => darkMode.set(!$darkMode)}
      className="relative overflow-hidden"
    >
      {/* Light */}
      <img
        src={sparkinitLight.src}
        alt="sparkinit"
        draggable={false}
        className={`w-48 transition-all duration-300 ease-in-out sm:w-56 md:w-64 lg:w-72 ${
          $darkMode ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Dark */}
      <img
        src={sparkinitDark.src}
        alt="sparkinit"
        draggable={false}
        className={`absolute top-0 left-0 w-48 transition-all duration-300 ease-in-out sm:w-56 md:w-64 lg:w-72 ${
          $darkMode ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};

export default Brand;
