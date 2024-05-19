import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import closeIconSrc from "./../../assets/images/close-icon.svg";
import React, { Dispatch, SetStateAction, ReactNode } from "react";

type ModalProps = {
  setPopupState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

function Modal({ setPopupState, children }: ModalProps) {
  const rootContainer = document.getElementById("modal");

  const handlePopupTouch = () => {
    setPopupState(false);
  };

  return createPortal(
    <div
      className={s.container}
      onTouchStart={handlePopupTouch}
      onClick={handlePopupTouch}
    >
      <div className={s.content}>
        <button
          className={s.closeIcon}
          style={{ backgroundImage: `url(${closeIconSrc})` }}
          onClick={handlePopupTouch}
        />
        {children}
      </div>
    </div>,
    rootContainer
  );
}

export default Modal;
