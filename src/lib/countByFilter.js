// FilterDropdown 사용할 때 쓰려고 만듦

/**
 * BE에서 데이터 불러왔을 때의 등급/장르 형태는  { photoCard: { gradeId: 1 } } 이런 식이다.
 *
 * 이걸 [  { gradeId: 1, count: 100 }, ... ] 이런 형태로 바꿔야 한다.
 */

export function countByKey(data, key) {
  const result = {};

  // 등급별 개수를 세기 위해 반복문을 돌린다
  data.forEach((card) => {
    const filterName = card.photoCard?.[key]; // 장르, 등급 등 필터링할 걸 불러오고

    // 객체 안에 filterName이 있으면 원래 있던 값을 가져오고 없으면 0으로 간주한 뒤 기존 값에 +1
    if (filterName) {
      result[filterName] = (result[filterName] || 0) + 1;
    }
  });

  return result;

  // 여기까지 하면 이렇게 나옴
  // const result = countByKey(data, "gradeId")
  // const data = { 1: 100, 2: 50, 3: 200, ... }
}

// 이제 출력 형태를 바꿔야 함
// Object.entries(객체)와 map을 써서 형태를 바꿈.
export function formatCountedData(data, key) {
  return Object.entries(data).map(([id, count]) => ({
    [key]: Number(id),
    count,
  }));

  // entries 결과: [ ["1", 100], ["2", 50], ["3", 200] ]
  // map 결과: { gradeId: 1, count: 100 }
}
