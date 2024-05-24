import useIsMobile from "../../../../utils/hooks/useIsMobile";
import DesktopAudioPlayer from "./Desktop/DesktopAudioPlayer";
import MobileAudioPlayer from "./Mobile/MobileAudioPlayer";

function AudioPlayer() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileAudioPlayer /> : <DesktopAudioPlayer />;
}

export default AudioPlayer;
