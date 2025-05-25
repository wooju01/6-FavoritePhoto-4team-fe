import GradeTag from "../tag/GradeTag.jsx";

const gradeOptions = [
  { label: "COMMON", value: 1 },
  { label: "RARE", value: 2 },
  { label: "SUPER RARE", value: 3 },
  { label: "LEGENDARY", value: 4 },
];

export default function FilterPanelGrade({ grades = {}, selectedGrade = [], onSelectGrade }) {
  const handleClick = (value) => {
    if (selectedGrade.includes(value)) {
      onSelectGrade(selectedGrade.filter((v) => v !== value));
    } else {
      onSelectGrade([...selectedGrade, value]);
    }
  };

  return (
    <ul>
      {gradeOptions.map(({ label, value }) => {
        const count = grades[label] || 0;
        const isSelected = selectedGrade.includes(value);

        return (
          <li
            key={label}
            className={`flex justify-between py-2 cursor-pointer ${isSelected ? "bg-gray-500" : ""}`}
            onClick={() => handleClick(value)}
          >
            <GradeTag grade={label} size="xs" />
            <span>{count}개</span>
          </li>
        );
      })}
    </ul>
  );
}
