import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 ${className}`}
    >
      {totalResults !== undefined && (
        <p className="text-xs text-[#737873]">
          Showing page <span className="font-semibold text-[#242824]">{currentPage}</span> of{' '}
          <span className="font-semibold text-[#242824]">{totalPages}</span> ({totalResults}{' '}
          total results)
        </p>
      )}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E3E6E0] bg-[#FFFFFF] text-[#242824] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFAF7] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-xs text-[#737873]"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#365B45] text-white shadow-xs'
                  : 'border border-[#E3E6E0] bg-[#FFFFFF] text-[#242824] hover:bg-[#FAFAF7]'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E3E6E0] bg-[#FFFFFF] text-[#242824] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFAF7] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
