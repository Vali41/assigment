import React, { useState, useEffect } from 'react'; 

const UserForm = ({ show, onHide, onSave, userToEdit }) => {
  const [user, setUser] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    department: '' 
  });

  // useEffect to sync local state with the userToEdit prop
  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      setUser({ firstName: '', lastName: '', email: '', department: '' });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{userToEdit ? 'Edit User' : 'Add User'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input 
                  type="text" 
                  className="form-control rounded-pill" 
                  id="firstName" 
                  name="firstName" 
                  value={user.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input 
                  type="text" 
                  className="form-control rounded-pill" 
                  id="lastName" 
                  name="lastName" 
                  value={user.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control rounded-pill" 
                  id="email" 
                  name="email" 
                  value={user.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <input 
                  type="text" 
                  className="form-control rounded-pill" 
                  id="department" 
                  name="department" 
                  value={user.department} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary rounded-pill" onClick={onHide}>Close</button>
              <button type="submit" className="btn btn-primary rounded-pill">{userToEdit ? 'Save changes' : 'Add User'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserForm;