import React from "react";

export default function Popup({ name, isOpen, onClose,  children, handleOverlay }) {
  // `useEffect` for the `Escape` listener
  React.useEffect(() => {
    // prevent adding the listener if the popup is not opened
    if (!isOpen) return;
    // define the handler inside `useEffect`,
    // so that it wouldn’t lose the reference to be able to remove it
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    // unmount:
    return () => document.removeEventListener("keydown", closeByEscape);
    // dependencies array add the listener only when it’s opened:
  }, [isOpen, onClose]);


  // // overlay handler
  // React.useEffect(() => {
  //   // if (!isOpen) return;
  //   function handleOverlay(e){
  //     e.stopPropagation();
  //     if (   
  //       e.target === e.currentTarget 
  //     //   e.target.classList.contains("modal_open") ||
  //     // e.target.classList.contains(`modal__container`)
  //     ) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("click", handleOverlay);
  //   return () => document.removeEventListener("click", handleOverlay);
  // }, [isOpen, onClose]);


  // add main wrapper with class `modal` and `modal_open`
  return (
    <div
    className={`modal modal_type_${name} ${
          isOpen && "modal_open"
        }`}
      // onClose={handleOverlay}
    >
      {children}
    </div>
  );
}
