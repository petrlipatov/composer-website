import cn from "classnames";
import s from "./Tag.module.css";

function Tag({ name, isSelected, onClick }) {
  return (
    <div
      className={cn(s.tag, isSelected ? s.tagSelected : "")}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default Tag;
