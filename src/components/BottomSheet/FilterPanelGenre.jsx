const genreOptions = [
  { label: "여행", value: 1 },
  { label: "풍경", value: 2 },
  { label: "인물", value: 3 },
  { label: "사물", value: 4 },
];

export default function FilterPanelGenre({
  counts = {},
  selectedGenres = [],
  onSelectGenres,
}) {
  const handleClick = (value) => {
    if (selectedGenres.includes(value)) {
      onSelectGenres(selectedGenres.filter((v) => v !== value));
    } else {
      onSelectGenres([...selectedGenres, value]);
    }
  };

  return (
    <ul>
      {genreOptions.map(({ label, value }) => {
        const count = counts[label] || 0;
        const isSelected = selectedGenres.includes(value);

        return (
          <li
            key={label}
            className={`flex justify-between py-2 cursor-pointer ${
              isSelected ? "bg-gray-500" : ""
            }`}
            onClick={() => handleClick(value)}
          >
            <span
              className={
                isSelected
                  ? "text-white text-400-14"
                  : "text-gray-300 text-400-14"
              }
            >
              {label}
            </span>
            <span
              className={
                isSelected
                  ? "text-white text-400-14"
                  : "text-gray-300 text-400-14"
              }
            >
              {count}개
            </span>
          </li>
        );
      })}
    </ul>
  );
}
