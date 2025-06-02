const saleTypeOptions = [
  { label: "교환중", value: "PENDING" },
  { label: "판매중", value: "AVAILABLE" },
];

export default function FilterPanelSaleType({
  saleTypes = {},
  selectedSaleType = null,
  onSelectSaleType,
}) {
  const handleClick = (value) => {
    if (selectedSaleType === value) {
      onSelectSaleType(null);
    } else {
      onSelectSaleType(value);
    }
  };

  return (
    <ul>
      {saleTypeOptions.map(({ label, value }) => {
        const count = saleTypes[value] || 0;
        const isSelected = selectedSaleType === value;
        return (
          <li
            key={value}
            className={`flex justify-between py-2 px-3 rounded cursor-pointer ${
              isSelected ? "bg-gray-600" : ""
            }`}
            onClick={() => handleClick(value)}
          >
            <span className={isSelected ? "text-white" : "text-gray-300"}>
              {label}
            </span>
            <span className={isSelected ? "text-white" : "text-gray-300"}>
              {count}개
            </span>
          </li>
        );
      })}
    </ul>
  );
}
