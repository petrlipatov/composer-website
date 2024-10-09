import { Button } from "@/components/Buttons";
import { CloseIcon } from "@/components/Icons";
import { BLACK_COLOR } from "@/utils/constants";
import s from "./CloseButton.module.css";

type Props = {
  onClick: () => void;
};

export function CloseButton({ onClick }: Props) {
  return (
    <Button className={s.closeButton} onClick={onClick}>
      <CloseIcon className={s.closeIcon} color={BLACK_COLOR} />
    </Button>
  );
}
