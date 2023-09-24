import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal2.css'; // Make sure to change the CSS file name

const CustomModalContext = React.createContext();

export function CustomModalProvider({ children }) {
    const modalRef = useRef();
    const [modalContent, setModalContent] = useState(null);
    // Callback function that will be called when the modal is closing
    const [onModalClose, setOnModalClose] = useState(null);

    const closeModal = () => {
        setModalContent(null); // Clear the modal contents
        // If the callback function is truthy, call the callback function and reset it to null:
        if (typeof onModalClose === 'function') {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
        modalRef, // Reference to modal div
        modalContent, // React component to render inside the modal
        setModalContent, // Function to set the React component to render inside the modal
        setOnModalClose, // Function to set the callback function called when the modal is closing
        closeModal // Function to close the modal
    };

    return (
        <>
            <CustomModalContext.Provider value={contextValue}>
                {children}
            </CustomModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function CustomModal() {
    const { modalRef, modalContent, closeModal } = useContext(CustomModalContext);
    // If there is no div referenced by the modalRef or modalContent is not a truthy value, render nothing:
    if (!modalRef || !modalRef.current || !modalContent) return null;

    // Render the following component to the div referenced by the modalRef
    return ReactDOM.createPortal(
        <div id="custom-modal">
            <div id="custom-modal-background" onClick={closeModal} />
            <div id="custom-modal-content">
                {modalContent}
            </div>
        </div>,
        modalRef.current
    );
}

export const useCustomModal = () => useContext(CustomModalContext);
