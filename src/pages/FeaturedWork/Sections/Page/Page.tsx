import { useContext } from "react";
import s from "./Page.module.css";
import { FeaturedWorkContext } from "../FeaturedWorkContext";
import { VideoPopup } from "@/components/VideoPopup";
import { AudioPlayer } from "../AudioPlayer";

export const Page = ({ children }) => {
  const { player, isVideoPopupOpened, videoID, setIsVideoPopupOpened } =
    useContext(FeaturedWorkContext);

  return (
    <div className={s.page}>
      {children}
      {player.isOpened && <AudioPlayer />}

      {isVideoPopupOpened && (
        <VideoPopup
          videoID={videoID}
          setIsVideoPopupOpened={setIsVideoPopupOpened}
        />
      )}
    </div>
  );
};
