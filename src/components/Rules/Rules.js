import React from "react";
import "./Rules.css";
import Guide from '../../assets/image-rules.svg'
import Close from '../../assets/icon-close.svg'

const Popup = ({ isOpen, onClose }) => {
    return isOpen ? (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>RULES</h3>
                <img src={Guide} alt="Guide" />
                <button className="close-button" onClick={onClose}>
                <img src={Close} alt="Close" />
                </button>
               
            </div>
        </div>
    ) : null;
};

export default Popup;
