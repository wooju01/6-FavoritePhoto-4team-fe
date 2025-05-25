const saleOptions = [
  { label: "판매중", value: true },
  { label: "판매완료", value: false },
];

export default function FilterPanelSale({
  sales = {},
  selectedSale = [],
  onSelectSale,
}) {
  const handleClick = (value) => {
    if (selectedSale.includes(value)) {
      onSelectSale(selectedSale.filter((v) => v !== value));
    } else {
      onSelectSale([...selectedSale, value]);
    }
  };

  return (
    <ul>
      {saleOptions.map(({ label, value }) => {
        const count = sales[value] || 0;  
        const isSelected = selectedSale.includes(value);
        return (
          <li
            key={label}
            className={`flex justify-between py-2 cursor-pointer ${
              isSelected ? "bg-gray-500" : ""
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
