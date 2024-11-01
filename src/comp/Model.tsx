import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-7xl max-h-[90vh] overflow-y-auto">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
        X
      </button>
      {children}
    </div>
  </div>
  );
};


export default Modal;
