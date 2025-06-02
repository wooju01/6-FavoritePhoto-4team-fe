export default function FilterPanelGenre({ counts = {}, selectedGenre, onSelectGenre }) {
  const genreOptions = [
    { label: "여행", value: 1 },
    { label: "풍경", value: 2 },
    { label: "인물", value: 3 },
    { label: "사물", value: 4 },
  ];

  const handleClick = (value) => {
    if (selectedGenre === value) {
      onSelectGenre(null);
    } else {
      onSelectGenre(value);
    }
  };

  return (
    <ul>
      {genreOptions.map(({ label, value }) => {
        const count = counts[value] || 0;
        const isSelected = selectedGenre === value;

        return (
          <li
            key={label}
            className={`flex justify-between py-2 cursor-pointer ${
              isSelected ? "bg-gray-500" : ""
            }`}
            onClick={() => handleClick(value)}
          >
            <span className={isSelected ? "text-white" : "text-gray-300"}>{label}</span>
            <span className={isSelected ? "text-white" : "text-gray-300"}>
              {count}개
            </span>
          </li>
        );
      })}
    </ul>
  );
}
