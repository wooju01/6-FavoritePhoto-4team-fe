"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";

export default function FilterDropdown({ option, isOpen, onToggle, onClose }) {
  const { key, label, options } = option;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedId = searchParams.get(key);
  const selectedOption = options.find(opt => String(opt.id) === selectedId);
  const value = selectedOption?.label ?? label;

  const handleChoice = (selectedOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedOption.label === "전체") {
      params.delete(key);
    } else {
      params.set(key, selectedOption.id);
    }

    const fullUrl = `${pathname}?${params.toString()}`;
    router.push(fullUrl);

     onClose?.(); 
  };

  return (
    <div className="relative z-30">
      <button onClick={onToggle} className="flex items-center gap-2.5">
        <span className="text-700-14">{value}</span>
        <IoMdArrowDropdown />
      </button>
      {isOpen && (
        <div className="absolute flex flex-col mt-2 border border-white bg-my-black">
          {options.map((optionLabel, index) => (
            <button
              key={index}
              onClick={() => handleChoice(optionLabel)}
              className="text-400-16 text-start text-nowrap px-4 py-2"
            >
              {optionLabel.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
