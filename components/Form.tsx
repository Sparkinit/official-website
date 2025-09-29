import { useStore } from "@nanostores/react";
import { darkMode } from "@/stores";

interface FormProps {
  imageSrc: string;
}

const Form = ({ imageSrc }: FormProps) => {
  const $darkMode = useStore(darkMode);

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

      <h2 className="absolute inset-0 px-3 pt-24 text-4xl font-bold">
        引火人，你好
      </h2>
    </div>
  );
};

export default Form;
