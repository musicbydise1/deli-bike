'use client';

import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  // Функция для смены страницы
  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Функция для формирования массива номеров страниц с эллипсисами, если нужно
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage > 4 && currentPage < totalPages - 3) {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Предыдущая страница"
        >
          <AiOutlineLeft />
        </button>
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={index} className="ellipsis">
              {page}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ),
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Следующая страница"
        >
          <AiOutlineRight />
        </button>
      </div>

      <div className="rows-per-page">
        <span>Показывать по: </span>
        <select value={rowsPerPage} onChange={e => onRowsPerPageChange(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <style jsx>{`
        .pagination-container {
          margin-top: 1rem;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        .pagination button {
          padding: 0.5rem 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
          transition: background 0.3s ease;
          min-width: 2.5rem;
        }
        .pagination button.active {
          background: #0070f3;
          color: #fff;
          border-color: #0070f3;
        }
        .pagination button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .pagination .ellipsis {
          padding: 0.5rem 0.75rem;
          color: #666;
        }
        .rows-per-page {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .rows-per-page select {
          padding: 0.25rem 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
