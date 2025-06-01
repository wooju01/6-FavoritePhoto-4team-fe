export default function FilterTab({ selected, onChange, filters }) {
  const allTabs = [
    { key: "grade", label: "등급" },
    { key: "genre", label: "장르" },
    { key: "saleType", label: "판매방법" },
    { key: "sale", label: "매진 여부" },
  ];

  // filters 배열에 포함된 탭만 사용
  const visibleTabs = allTabs.filter((tab) => filters.includes(tab.key));

  return (
    <div className="flex justify-start border-b border-gray-700 mb-4 gap-4">
      {visibleTabs.map((tab, index) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`py-2 px-4 cursor-pointer text-400-14 ${
            selected === tab.key
              ? "text-white border-b-2 border-white"
              : "text-gray-400"
          }`}
        >
          {selected === tab.key && tab.key !== "sale"
            ? `${tab.label}${index + 1}`
            : tab.label}
        </button>
      ))}
    </div>
  );
}
