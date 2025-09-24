import React from 'react';

const UserTable = ({ users, onEdit, onDelete, sortColumn, sortDirection, onSort }) => {
  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-1" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-1" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5a.5.5 0 0 1 .5-.5"/>
      </svg>
    );
  };
  
  return (
    <div className="table-responsive bg-white rounded-4 shadow-sm p-3">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr>
            {['firstName', 'lastName', 'email', 'department'].map(col => (
              <th key={col} className="align-middle text-nowrap" onClick={() => onSort(col)} style={{ cursor: 'pointer' }}>
                {col === 'firstName' ? 'First Name' : col === 'lastName' ? 'Last Name' : col} {renderSortIcon(col)}
              </th>
            ))}
            <th className="text-end align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td className="align-middle text-nowrap">{user.firstName}</td>
                <td className="align-middle text-nowrap">{user.lastName}</td>
                <td className="align-middle text-nowrap">{user.email}</td>
                <td className="align-middle text-nowrap">{user.department}</td>
                <td className="text-end align-middle">
                  <button className="btn btn-sm btn-primary rounded-pill me-2 px-3" onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger rounded-pill px-3" onClick={() => onDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;