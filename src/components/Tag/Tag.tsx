import cn from "classnames";
import s from "./Tag.module.css";
import { Dispatch, SetStateAction } from "react";

type TagProps = {
  name: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
};

function Tag({ name, isSelected, isDisabled, onClick }) {
  return (
    <button
      type="button"
      className={cn(
        s.tag,
        isSelected ? s.tagSelected : "",
        isDisabled ? s.tagDisabled : ""
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {name}
    </button>
  );
}

export default Tag;
