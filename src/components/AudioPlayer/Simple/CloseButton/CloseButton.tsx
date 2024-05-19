import closeIconSrc from "../../../../assets/images/close-icon_black.svg";

import s from "./CloseButton.module.css";

type Props = {
  handleCloseClick: () => void;
};

function CloseButton({ handleCloseClick }: Props) {
  return (
    <img
      className={s.closeIcon}
      src={closeIconSrc}
      onClick={handleCloseClick}
    />
  );
}

export default CloseButton;
