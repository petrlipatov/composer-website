import closeIconSrc from "../../../assets/images/close-icon.svg";
import s from "./ClearButton.module.css";

type Props = {
  handleClearTagsClick: () => void;
};

function ClearButton({ handleClearTagsClick }: Props) {
  return (
    <div className={s.clearButton} onClick={handleClearTagsClick}>
      <img className={s.closeIcon} src={closeIconSrc} />
      No filter
    </div>
  );
}

export default ClearButton;
