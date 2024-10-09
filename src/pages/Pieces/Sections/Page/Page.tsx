import { useContext } from "react";
import { AudioPlayer } from "../AudioPlayer";

import { PlayerContext } from "../PiecesContext/PiecesContext";
import { VideoPopup } from "@/components/VideoPopup";

import s from "./Page.module.css";

export const Page = ({ children }) => {
  const { player, isVideoPopupOpened, videoID, setIsVideoPopupOpened } =
    useContext(PlayerContext);
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
