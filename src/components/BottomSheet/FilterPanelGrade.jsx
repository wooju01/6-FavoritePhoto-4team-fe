import GradeTag from "../tag/GradeTag.jsx";

const gradeOptions = [
  { label: "COMMON", value: 1 },
  { label: "RARE", value: 2 },
  { label: "SUPER RARE", value: 3 },
  { label: "LEGENDARY", value: 4 },
];

export default function FilterPanelGrade({
  grades = {},
  selectedGrade = [],
  onSelectGrade,
}) {
  // value로 label 찾는 헬퍼
  const getLabelByValue = (value) => {
    const option = gradeOptions.find((opt) => opt.value === Number(value));
    return option ? option.label : "";
  };

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
        
        const count = grades[getLabelByValue(value)] || 0;
        const isSelected = selectedGrade.includes(value);
        return (
          <li
            key={label}
            className={`flex justify-between py-2 cursor-pointer ${
              isSelected ? "bg-gray-500" : ""
            }`}
            onClick={() => handleClick(value)}
          >
            <GradeTag grade={value} size="xs" />
            <span>{count}개</span>
          </li>
        );
      })}
    </ul>
  );
}
