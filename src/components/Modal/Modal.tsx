import { Dispatch, SetStateAction, ReactNode, SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/Icons";
import { PRIMARY_ACCENT_COLOR } from "@/utils/constants";
import s from "./Modal.module.css";

type ModalProps = {
  setPopupState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

function Modal({ setPopupState, children }: ModalProps) {
  const rootContainer = document.getElementById("modal");

  const handlePopupClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setPopupState(false);
  };

  return createPortal(
    <div className={s.container} onClick={handlePopupClick}>
      <div className={s.content}>
        <button className={s.closeButton} onClick={handlePopupClick}>
          <CloseIcon color={PRIMARY_ACCENT_COLOR} />
        </button>

        {children}
      </div>
    </div>,
    rootContainer
  );
}

export default Modal;
