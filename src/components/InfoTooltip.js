import React from "react";
import vSign from "../images/vSign.svg";
import xSign from "../images/xSign.svg";

export default function InfoTooltip(props, isRegistered) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen && "modal_open"
      }`}
    >

      <div className={"modal__container"}>
        <button
          type="button"
          aria-label="close-button"
          className="modal__close-button"
          onClick={props.onClose}
        ></button>
        {isRegistered ? 
          <>
            <img
              src={vSign}
              alt="success"
            ></img>
            <h2 className={"modal__title_type_tooltip"}>
              Success! You have now been registered.
            </h2>
          </>
         : 
          <>
            <img
              src={xSign}
              alt="failure"
            ></img>
            <h2 className={"modal__title"}>
              Oops, something went wrong! Please try again.
            </h2>
          </>
        }
      </div>
    </div>
  );
}
