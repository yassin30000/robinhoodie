import React from 'react';
import { useCustomModal } from '../../context/Modal2';
function OpenCustomModalButton({
    modalComponent, // Component to render inside the modal
    buttonText, // Text of the button that opens the modal
    onButtonClick, // Optional: Callback function that will be called once the button that opens the modal is clicked
    onModalClose, // Optional: Callback function that will be called once the modal is closed
    buttonHTML,
    
}) {
    const { setModalContent, setOnModalClose } = useCustomModal(); // Use your custom modal context

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onButtonClick) onButtonClick();
    };

    return (
        
        <button onClick={onClick}>{ buttonHTML }{buttonText}</button>
    );
}

export default OpenCustomModalButton;
