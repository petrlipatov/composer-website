import { useEffect } from "react";

const useAudioPlayerListeners = (audioPlayer, setIsAudioPlaying) => {
  useEffect(() => {
    const onPlayingHandler = () => setIsAudioPlaying(true);
    const onPauseHandler = () => setIsAudioPlaying(false);
    const onEndedHandler = () => setIsAudioPlaying(false);

    if (audioPlayer) {
      audioPlayer.addEventListener("playing", onPlayingHandler);
      audioPlayer.addEventListener("pause", onPauseHandler);
      audioPlayer.addEventListener("ended", onEndedHandler);
    }

    return () => {
      if (audioPlayer) {
        audioPlayer.removeEventListener("playing", onPlayingHandler);
        audioPlayer.removeEventListener("pause", onPauseHandler);
        audioPlayer.removeEventListener("ended", onEndedHandler);
      }
    };
  }, [audioPlayer, setIsAudioPlaying]);
};

export default useAudioPlayerListeners;
