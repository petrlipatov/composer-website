import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import closeIconSrc from "./../../assets/images/close-icon.svg";
import React, {
  useLayoutEffect,
  useRef,
  RefObject,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { gsap } from "gsap";

type ModalProps = {
  setPopupState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

function Modal({ setPopupState, children }: ModalProps) {
  const rootContainer = document.getElementById("modal");
  const tlPopup = useRef(gsap.timeline());
  const popupRef: RefObject<HTMLDivElement> = useRef(null);

  useLayoutEffect(function popupAnimation() {
    // const ctx = gsap.context(() => {
    gsap.set(popupRef.current, {
      autoAlpha: 0,
    });

    tlPopup.current.to(popupRef.current, {
      display: "flex",
      autoAlpha: 1,
    });
    // }, pageRef);
    // return () => ctx.revert();
  }, []);

  const handlePopupTouch = async (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await tlPopup.current.reverse();
    setPopupState(false);
  };

  return createPortal(
    <div
      className={styles.container}
      onTouchStart={handlePopupTouch}
      onTouchMove={handlePopupTouch}
      onTouchEnd={handlePopupTouch}
      data-animate="popup"
      ref={popupRef}
    >
      <button
        className={styles.closeIcon}
        style={{ backgroundImage: `url(${closeIconSrc})` }}
        onClick={() => {
          tlPopup.current.reverse();
        }}
      />
      {children}
    </div>,
    rootContainer
  );
}

export default Modal;
