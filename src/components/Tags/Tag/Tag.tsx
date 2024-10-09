import { ReactNode } from "react";
import cn from "classnames";
import s from "./Tag.module.css";

type TagProps = {
  children: ReactNode;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export function Tag({
  children,
  isSelected,
  isDisabled = false,
  onClick,
}: TagProps) {
  return (
    <button
      type="button"
      className={cn(
        s.tag,
        isSelected ? s.selected : "",
        isDisabled ? s.disabled : ""
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
