import { Dispatch, SetStateAction, Suspense, lazy } from "react";

import Modal from "../Modal/Modal";
import Preloader from "../Preloader/Preloader";

const YouTubePlayer = lazy(() => import("../YoutubePlayer/YoutubePlayer"));

type Props = {
  videoID: string;
  setIsVideoPopupOpened: Dispatch<SetStateAction<boolean>>;
};

function VideoPopup({ videoID, setIsVideoPopupOpened }: Props) {
  return (
    <Modal setPopupState={setIsVideoPopupOpened}>
      <Suspense fallback={<Preloader content={"🐥"} />}>
        <YouTubePlayer videoId={videoID} />
      </Suspense>
    </Modal>
  );
}

export default VideoPopup;
