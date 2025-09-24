const DeleteConfirmationModal = ({ show, onHide, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="btn-close btn-close-dark" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary rounded-pill" onClick={onHide}>Cancel</button>
            <button type="button" className="btn btn-danger rounded-pill" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmationModal;