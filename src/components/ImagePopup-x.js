import React from "react";
import Popup from "./Popup";

export default function ImagePopup(props, children) {
  return (
    //   <div
    //   className={`modal modal_type_${props.name} ${
    //     props.isOpen && "modal_open"
    //   }`}
    // >
    <Popup>
<figure>
  <img 
  src={props.imageLink}
  alt={props.imageText} 
  className="modal__image-container" 
  />
    <figcaption className="modal__image-caption">{props.imageText}</figcaption>
</figure>
    
      {/* <div className="modal__image-wrapper">  */}
         {/* <button
          type="button"
          aria-label="close-button"
          className="modal__close-button modal__close-button_type-preview"
          onClick={props.onClose}
        ></button>  */}
  


       
      {/* </div> */}
      </Popup>
    // </div>
  );
}