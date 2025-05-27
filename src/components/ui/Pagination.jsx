import clsx from "clsx";

const ChevronIcon = ({ direction = "right", isDisabled = false }) => {
  const rotations = {
    left: "rotate-180",
    right: "",
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={clsx(
        "w-4 h-4 transition-colors",
        isDisabled ? "text-gray-400" : "text-white",
        rotations[direction]
      )}
    >
      <path
        fill="currentColor"
        d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
      />
    </svg>
  );
};

const ELLIPSIS_STRING = "...";
const MAX_VISIBLE_ITEMS_DEFAULT = 7; // 기본 화면에서 표시할 최대 페이지 아이템 수 (예: 1, 2, 3, ..., 8, 9, 10)
const MAX_VISIBLE_ITEMS_S = 5; // 작은 화면(md 미만)에서 표시할 최대 페이지 아이템 수 (예: 1, 2, ..., 9, 10

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pagesPerBlock = 10,
}) => {
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);

  const startPageOfCurrentBlock = (currentBlock - 1) * pagesPerBlock + 1;
  const endPageOfCurrentBlock = Math.min(
    currentBlock * pagesPerBlock,
    totalPages
  );

  const handlePageItemClick = (page) => {
    if (page >= 1 && page <= totalPages && typeof onPageChange === "function") {
      onPageChange(page);
    }
  };

  const getDisplayedPageItems = (rawPageNumbers, isSmallBreakpoint) => {
    const numRawPages = rawPageNumbers.length;
    if (numRawPages === 0) return [];

    const maxVisible = isSmallBreakpoint
      ? MAX_VISIBLE_ITEMS_S
      : MAX_VISIBLE_ITEMS_DEFAULT;

    if (numRawPages <= maxVisible) {
      return rawPageNumbers;
    }

    // 말줄임표를 사용해야 하는 경우
    // 작은 화면: 앞 2개, 뒤 2개 (총 4개 + 말줄임표 1개 = 5개)
    // 기본 화면: 앞 3개, 뒤 3개 (총 6개 + 말줄임표 1개 = 7개)
    const leadingCount = isSmallBreakpoint ? 2 : 3;
    const trailingCount = isSmallBreakpoint ? 2 : 3;

    const items = [];
    // 앞부분 페이지 추가
    for (let i = 0; i < leadingCount; i++) {
      items.push(rawPageNumbers[i]);
    }
    items.push(ELLIPSIS_STRING);
    // 뒷부분 페이지 추가
    for (let i = numRawPages - trailingCount; i < numRawPages; i++) {
      items.push(rawPageNumbers[i]);
    }
    return items;
  };

  const rawPageNumbersInBlock = [];
  if (totalPages > 0) {
    for (let i = startPageOfCurrentBlock; i <= endPageOfCurrentBlock; i++) {
      rawPageNumbersInBlock.push(i);
    }
  }

  // isSmallBreakpoint 값에 따라 다른 최대 페이지 아이템 수를 적용
  const pageItemsForDefault = getDisplayedPageItems(
    [...rawPageNumbersInBlock],
    false // isSmallBreakpoint = false
  );
  const pageItemsForS = getDisplayedPageItems(
    [...rawPageNumbersInBlock],
    true // isSmallBreakpoint = true
  );

  const renderPageItem = (item, index) => {
    if (item === ELLIPSIS_STRING) {
      return (
        <div
          key={`ellipsis-${index}`}
          className={clsx(
            "flex items-center justify-center text-white",
            "w-[14px] h-[19px] text-400-16", // 기본 크기 유지 또는 반응형 조절
            "h-[40px] md:h-[45px] lg:h-[50px]" // 높이는 버튼과 동일하게 유지
          )}
          aria-hidden="true"
        >
          {ELLIPSIS_STRING}
        </div>
      );
    }

    const pageNumber = Number(item);
    const isActive = pageNumber === currentPage;
    return (
      <button
        key={`page-${pageNumber}`}
        onClick={() => handlePageItemClick(pageNumber)}
        className={clsx(
          "flex items-center justify-center rounded-[2px] text-center text-700-16 transition-colors",
          "py-[9px] px-[13px] md:py-[11px] md:px-[16px] lg:py-[13px] lg:px-[20px]", // 패딩
          "w-[40px] h-[40px] md:w-[45px] md:h-[45px] lg:w-[50px] lg:h-[50px]", // 크기
          isActive
            ? "bg-my-black border border-gray-200 text-white" // 활성 상태
            : "border-none text-white hover:bg-gray-700" // 비활성 상태
        )}
        aria-current={isActive ? "page" : undefined}
        aria-label={`페이지 ${pageNumber}`}
      >
        {pageNumber}
      </button>
    );
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return (
    <div
      className={clsx(
        "flex items-center",
        "gap-[10px] md:gap-[15px] lg:gap-[20px]" // 반응형 간격
      )}
    >
      <button
        onClick={() => handlePageItemClick(currentPage - 1)}
        disabled={isFirstPage}
        className={clsx(
          "flex items-center justify-center w-[24px] h-[24px] transition-colors",
          isFirstPage ? "cursor-not-allowed" : "hover:bg-gray-700"
        )}
        aria-label="이전 페이지"
      >
        <ChevronIcon direction="left" isDisabled={isFirstPage} />
      </button>

      {/* 기본 화면 (md 이상) */}
      <div className="hidden md:flex items-center gap-[10px] md:gap-[15px] lg:gap-[20px]">
        {pageItemsForDefault.map((item, index) => renderPageItem(item, index))}
      </div>

      {/* 작은 화면 (md 미만) */}
      <div className="flex md:hidden items-center gap-[10px]">
        {pageItemsForS.map((item, index) => renderPageItem(item, index))}
      </div>

      <button
        onClick={() => handlePageItemClick(currentPage + 1)}
        disabled={isLastPage}
        className={clsx(
          "flex items-center justify-center w-[24px] h-[24px] transition-colors",
          isLastPage ? "cursor-not-allowed" : "hover:bg-gray-700"
        )}
        aria-label="다음 페이지"
      >
        <ChevronIcon direction="right" isDisabled={isLastPage} />
      </button>
    </div>
  );
};

export default Pagination;
