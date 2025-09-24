import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import Pagination from './components/Pagination';


const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortColumn, setSortColumn] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10); 

  
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR'];

 
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Transform the fetched data: split name and add a random department
        const transformedData = data.map(user => {
          const nameParts = user.name.split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ');
          const department = getRandomElement(departments);
          
          return { ...user, firstName, lastName, department };
        });
        
        setUsers(transformedData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); 
  const handleEdit = (user) => {
    setUserToEdit(user);
    setShowModal(true);
  };

  const handleSave = async (user) => {
    setLoading(true);
    try {
      let response;
      
      // Check for user.id to determine if it's an update or an add
      if (user.id) {
        // Logic for UPDATING an existing user (PUT request)
        response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        
        setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? user : u)));

      } else {
        // Logic for ADDING a new user (POST request)
        response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        // The API returns the new user object with an 'id'
        const newUser = await response.json(); 
        setUsers(prevUsers => [...prevUsers, newUser]);
      }
      
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setShowModal(false); 
      setUserToEdit(null); 
    }
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };


  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    if (!userToDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userToDelete}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
    
      setUsers(users.filter(user => user.id !== userToDelete));
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setUserToDelete(null); 
    }
  };

  
  const handleAddUser = () => {
    setUserToEdit(null); 
    setShowModal(true);
  };

  
  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
    
    const sortedUsers = [...users].sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? -1 : 1;
      if (a[column] > b[column]) return isAsc ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter(user => {
    const matchesDepartment = filterDepartment === 'All' || user.department === filterDepartment;
    const matchesSearch = searchTerm === '' || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesDepartment && matchesSearch;
  });
  

  const uniqueDepartments = ['All', ...new Set(users.map(user => user.department))];

 
  const handleFilterChange = (e) => {
    setFilterDepartment(e.target.value);
    setCurrentPage(1); 
  };
  
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  if (loading) {
    return (
      <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border align-center text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-4 shadow">Error: {error}</div>;
  }
  
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <div className="container my-5 p-4 rounded-4 bg-light shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold text-primary">User Management</h1>
          <div className="d-flex align-items-center">
            <div className="me-3">
              <label htmlFor="search-term" className="form-label mb-0 fw-bold text-muted">Search:</label>
              <input 
                type="text" 
                id="search-term" 
                className="form-control rounded-pill" 
                placeholder="Search by name or email" 
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="me-3">
              <label htmlFor="department-filter" className="form-label mb-0 fw-bold text-muted">Filter by Department:</label>
              <select id="department-filter" className="form-select rounded-pill" value={filterDepartment} onChange={handleFilterChange}>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary shadow-sm rounded-pill px-4" onClick={handleAddUser}>
              <i className="bi bi-plus-lg me-2"></i> Add User
            </button>
          </div>
        </div>
        
        <UserTable 
          users={currentUsers} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        <Pagination
          usersPerPage={usersPerPage}
          setUsersPerPage={setUsersPerPage}
          totalUsers={filteredUsers.length}
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        
        <UserForm
          show={showModal}
          onHide={() => setShowModal(false)}
          onSave={handleSave}
          userToEdit={userToEdit}
        />
        <DeleteConfirmationModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
};

export default App;