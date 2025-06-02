import GradeTag from "../tag/GradeTag.jsx";

const gradeOptions = [
  { label: "COMMON", value: 1 },
  { label: "RARE", value: 2 },
  { label: "SUPER RARE", value: 3 },
  { label: "LEGENDARY", value: 4 },
];

export default function FilterPanelGrade({
  grades = {},
  selectedGrade = null, // 단일 선택이라 null 또는 숫자
  onSelectGrade,
}) {
  const getLabelByValue = (value) => {
    const option = gradeOptions.find((opt) => opt.value === Number(value));
    return option ? option.label : "";
  };

  const handleClick = (value) => {
    if (selectedGrade === value) {
      onSelectGrade(null); // 선택 해제
    } else {
      onSelectGrade(value); // 선택
    }
  };

  return (
    <ul>
      {gradeOptions.map(({ label, value }) => {
        const count = grades[getLabelByValue(value)] || 0;
        const isSelected = selectedGrade === value;
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
