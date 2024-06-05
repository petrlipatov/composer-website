import { BLACK_COLOR } from "../../../../utils/constants";
import Button from "../../../Buttons/Button/Button";
import CloseIcon from "../../../Icons/CloseIcon/CloseIcon";

import s from "./CloseButton.module.css";

type Props = {
  onClick: () => void;
};

function CloseButton({ onClick }: Props) {
  return (
    <Button className={s.closeButton} onClick={onClick}>
      <CloseIcon className={s.closeIcon} color={BLACK_COLOR} />
    </Button>
  );
}

export default CloseButton;
