import { TvIcon } from "@/components/Icons";
import s from "./VideoButton.module.css";

type Props = {
  handleVideoClick: () => void;
};

export function VideoButton({ handleVideoClick }: Props) {
  return (
    <div className={s.container} onClick={handleVideoClick}>
      <TvIcon className={s.videoIcon} />
      <button className={s.button}>Watch video</button>
    </div>
  );
}
