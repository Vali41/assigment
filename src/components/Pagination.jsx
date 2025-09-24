import React from 'react';

const Pagination = ({  paginate, currentPage, totalPages, usersPerPage, setUsersPerPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleItemsPerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <nav className="d-flex justify-content-between align-items-center mt-4">
      <div className="d-flex align-items-center">
        <span className="me-2 text-muted">Items per page:</span>
        <select className="form-select form-select-sm rounded-pill" value={usersPerPage} onChange={handleItemsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <ul className="pagination rounded-pill overflow-hidden shadow-sm mb-0">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;