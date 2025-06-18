import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = e => {
    // Предотвращаем закрытие модалки при клике внутри контента
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={handleContentClick}
        className="bg-white rounded shadow-md w-full max-w-xl max-h-[80vh] overflow-y-auto relative"
      >
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
