const statusOptions = [
  { label: "교환중", value: "PENDING" },
  { label: "판매중", value: "AVAILABLE" },
];

export default function FilterPanelStatus({
  statuses = {},
  selectedStatuses = [],
  onSelectStatuses,
}) {
  const handleClick = (value) => {
    if (selectedStatuses.includes(value)) {
      onSelectStatuses(selectedStatuses.filter((v) => v !== value));
    } else {
      onSelectStatuses([...selectedStatuses, value]);
    }
  };

  return (
    <ul>
      {statusOptions.map(({ label, value }) => {
        const count = statuses[value] || 0;
        const isSelected = selectedStatuses.includes(value);
        return (
          <li
            key={value}
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
