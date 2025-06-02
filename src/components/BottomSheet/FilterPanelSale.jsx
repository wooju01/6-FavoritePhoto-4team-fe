const saleOptions = [
  { label: "판매중", value: "AVAILABLE" },
  { label: "판매완료", value: "SOLDOUT" },
];

export default function FilterPanelSale({
  sales = {},
  selectedSale = null,
  onSelectSale,
}) {
  const handleClick = (value) => {
    if (selectedSale === value) {
      onSelectSale(null);
    } else {
      onSelectSale(value);
    }
  };

  return (
    <ul>
      {saleOptions.map(({ label, value }) => {
        const count = sales[value] || 0;
        const isSelected = selectedSale === value;
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
