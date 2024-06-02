import cn from "classnames";

import CloseIcon from "../../Icons/CloseIcon/CloseIcon";

import { DISABLED_COLOR, PRIMARY_ACCENT_COLOR } from "../../../utils/constants";

import s from "./ClearButton.module.css";

type Props = {
  isDisabled: boolean;
  handleClearTagsClick: () => void;
};

function ClearButton({ isDisabled, handleClearTagsClick }: Props) {
  const color = isDisabled ? DISABLED_COLOR : PRIMARY_ACCENT_COLOR;

  return (
    <button
      className={cn(s.clearButton, isDisabled ? s.disabled : "")}
      onClick={handleClearTagsClick}
      disabled={isDisabled}
    >
      <CloseIcon color={color} className={s.icon} />
      No Filter
    </button>
  );
}

export default ClearButton;
