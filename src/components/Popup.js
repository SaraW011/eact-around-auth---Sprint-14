//popup onClose method credit Gennadiy Barsegyan reviewer
import React from "react";
// import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
  // here is `useEffect` for the `Escape` listener
  React.useEffect(() => {
    // with this we prevent adding the listener if the popup is not opened
    if (!isOpen) return;
    // we should define the handler inside `useEffect`,
    //so that it wouldn’t lose the reference to be able to remove it
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    // don’t forget to remove the listener in the `clean-up` function -unmount
    return () => document.removeEventListener("keydown", closeByEscape);
    // here we watch `isOpen` to add the listener only when it’s opened

  }, [isOpen, onClose]);

  // here is the overlay handler
  React.useEffect(() => {
    const handleOverlay = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleOverlay);
    // code on unmount
    return () => document.removeEventListener("keydown", handleOverlay);
  }, [isOpen, onClose]); // dependencies array

  // then we add the main wrapper with class `modal` and `modal_open`
  return (
    <div
      className={`modal ${isOpen ? "modal_open" : ""} modal modal_type_${name}`}
      onClick={onClose}
    >
{/* contents */}

<div className="modal__image-wrapper">
        {/* here will be anything you add as `children`
         */}
        {/* add the close button */}
        <button
          type="button"
          aria-label="close-button"
          className="modal__close-button modal__close-button_type-preview"
          onClick={onClose}
        ></button>


{/* {children} */}

      </div>
    </div>
  );
};

export default Popup;
