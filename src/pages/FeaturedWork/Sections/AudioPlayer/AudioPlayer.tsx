import useIsMobile from "../../../../utils/hooks/useIsMobile";
import DesktopAudioPlayer from "./Desktop/DesktopAudioPlayer";
import MobileAudioPlayer from "./Mobile/MobileAudioPlayer";

function AudioPlayer() {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <div>Loading...</div>;
  }

  return isMobile ? <MobileAudioPlayer /> : <DesktopAudioPlayer />;
}

export default AudioPlayer;
