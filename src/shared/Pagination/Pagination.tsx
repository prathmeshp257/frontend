import React, { FC } from "react";
import { CustomLink } from "data/types";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

export interface PaginationProps {
  className?: string;
  currentPage: number;
  setCurrentPage: any;
  scrollToView: any;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  currentPage,
  setCurrentPage,
  scrollToView,
  totalPages,
  onNext,
  onPrev,
}) => {
  const renderPaginationItem = (label: string, href: string, index: number) => {
     const pageNumber = index + 1;
     const isActive = pageNumber === currentPage;
    const handleClick = () => {
      setCurrentPage(pageNumber);
      scrollToView();
    };

    if (isActive) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
          onClick={handleClick}
        >
          {label}
        </span>
      );
    } else {
      return (
        <button
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
          onClick={handleClick}
        >
          {label}
        </button>
      );
    }  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      >
        <i className="las la-angle-left"></i>
      </button>
      {[...Array(totalPages)].map((_, index) =>
        renderPaginationItem((index + 1).toString(), `#${index + 1}`, index)
      )}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      >
        <i className="las la-angle-right"></i>
      </button>
    </nav>
  );
};

export default Pagination;
