import PropTypes from 'prop-types';
import Modal from 'react-modal';

const UserModal = ({ isOpen, onRequestClose, user }) => {
    if (!user) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="User Details"
            className="bg-white p-6 rounded shadow-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <h2 className="text-2xl mb-4">User Details</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>
            {/* Add more user details here */}
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onRequestClose}>
                Close
            </button>
        </Modal>
    );
};
UserModal.propTypes = {
    user: PropTypes.object.isRequired,
    isOpen: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default UserModal;
