import { useState } from "react";

export function useFilterSheet(fetcher) {
  const [counts, setCounts] = useState({});
  const [filteredCount, setFilteredCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const parseFilters = (filtersObj) => {
    const parsed = {};
    if (filtersObj.grade) parsed.grade = filtersObj.grade.split(",").map(Number);
    if (filtersObj.genre) parsed.genre = filtersObj.genre.split(",").map(Number);
    if (filtersObj.sale) parsed.sale = filtersObj.sale.split(",");
    if (filtersObj.saleType) parsed.saleType = filtersObj.saleType.split(","); 
    return parsed;
  };

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const data = await fetcher({}, true);
      setCounts(data.counts || {});

      
      if (data.counts?.saleType) {
        const totalCount = data.counts.saleType.reduce((acc, item) => acc + item.count, 0);
        setFilteredCount(totalCount);
      } else if (data.pagination?.totalItems !== undefined) {
        setFilteredCount(data.pagination.totalItems);
      } else if (data.totalItems !== undefined) {
        setFilteredCount(data.totalItems);
      } else {
        setFilteredCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

const fetchFilteredCount = async (rawFilters) => {
  setLoading(true);
  try {
    // rawFilters 는 { grade: "1,2", ... } 또는 { grade: [1,2], ... } 형태가 올 수 있음
    // 만약 문자열이면 배열로 바꾸고, 배열이면 그대로 사용
    const filters = {
      grade: typeof rawFilters.grade === "string"
        ? rawFilters.grade.split(",").map(Number)
        : rawFilters.grade || [],
      genre: typeof rawFilters.genre === "string"
        ? rawFilters.genre.split(",").map(Number)
        : rawFilters.genre || [],
      sale: typeof rawFilters.sale === "string"
        ? rawFilters.sale.split(",")
        : rawFilters.sale || [],
      saleType: typeof rawFilters.saleType === "string"
        ? rawFilters.saleType.split(",")
        : rawFilters.saleType || [],
    };

    const query = {};
    if (filters.grade.length) query.grade = filters.grade.join(",");
    if (filters.genre.length) query.genre = filters.genre.join(",");
    if (filters.sale.length) query.sale = filters.sale.join(",");
    if (filters.saleType.length) query.saleType = filters.saleType.join(",");

    const data = await fetcher(query, true);

    // filteredCount 설정 로직
    if (Array.isArray(data.sales)) {
      setFilteredCount(data.sales.length);
    } else if (data.pagination?.totalItems !== undefined) {
      setFilteredCount(data.pagination.totalItems);
    } else if (data.totalItems !== undefined) {
      setFilteredCount(data.totalItems);
    } else if (data.counts?.saleType) {
      const totalCount = data.counts.saleType.reduce((acc, item) => acc + item.count, 0);
      setFilteredCount(totalCount);
    } else {
      setFilteredCount(0);
    }
  } finally {
    setLoading(false);
  }
};



  return {
    counts,
    filteredCount,
    loading,
    fetchCounts,
    fetchFilteredCount,
  };
}
