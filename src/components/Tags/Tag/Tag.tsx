import cn from "classnames";
import s from "./Tag.module.css";
import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

function Tag({ children, isSelected, isDisabled = false, onClick }: TagProps) {
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

export default Tag;
