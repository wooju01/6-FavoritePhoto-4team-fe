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
    const filters = typeof rawFilters.grade === "string"
      ? parseFilters(rawFilters)
      : rawFilters;

    const query = {};
    if (Array.isArray(filters.grade) && filters.grade.length) {
      query.grade = filters.grade.join(",");
    }
    if (Array.isArray(filters.genre) && filters.genre.length) {
      query.genre = filters.genre.join(",");
    }
    if (Array.isArray(filters.sale) && filters.sale.length) {
      query.sale = filters.sale.join(",");
    }
    if (Array.isArray(filters.saleType) && filters.saleType.length) {
      query.saleType = filters.saleType.join(",");
    }

    console.log("query sent to fetcher:", query);
    const data = await fetcher(query, true);
    console.log("response from fetcher:", data);


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
