import { useStore } from "@nanostores/react";
import { darkMode } from "@/lib/store";
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
        className={`w-72 transition-opacity duration-300 ease-in-out ${
          $darkMode ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Dark */}
      <img
        src={sparkinitDark.src}
        alt="sparkinit"
        draggable={false}
        className={`w-72 absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${
          $darkMode ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};

export default Brand;
