import { Dispatch, SetStateAction, useEffect } from "react";
// import { TRANSITION } from "../constants";

const useAudioEventsForProgressBar = (
  audioPlayer: HTMLAudioElement,
  setDuration: Dispatch<SetStateAction<number>>,
  setElapsedTime: Dispatch<SetStateAction<number>>,
  setBuffered: Dispatch<SetStateAction<number>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    function updateBufferedAndElapsedTime() {
      const currentTime = Math.round(audioPlayer.currentTime);
      const bufferedRanges = audioPlayer.buffered;
      const hasBufferedRanges = bufferedRanges && bufferedRanges.length > 0;

      if (hasBufferedRanges) {
        const lastBufferedIndex = bufferedRanges.length - 1;
        const bufferedEndTime = Math.round(
          bufferedRanges.end(lastBufferedIndex)
        );
        if (currentTime <= bufferedEndTime) {
          setBuffered(bufferedEndTime);
          setElapsedTime(currentTime);
        } else {
          audioPlayer.currentTime = bufferedEndTime;
          setElapsedTime(bufferedEndTime);
          setBuffered(bufferedEndTime);
        }
      }
    }

    if (audioPlayer) {
      audioPlayer.onloadedmetadata = () => {
        setDuration(audioPlayer.duration);
        setElapsedTime(0);
        setBuffered(0);
      };
      audioPlayer.ontimeupdate = updateBufferedAndElapsedTime;
      audioPlayer.onwaiting = () => setIsLoading(true);
      audioPlayer.onplaying = () => setIsLoading(false);
      audioPlayer.onstalled = () => setIsLoading(false);
      audioPlayer.onerror = () => setIsLoading(false);
      audioPlayer.onended = () => setElapsedTime(0);
    }

    return () => {
      if (audioPlayer) {
        audioPlayer.onloadedmetadata = null;
        audioPlayer.ontimeupdate = null;
        audioPlayer.onwaiting = null;
        audioPlayer.onplaying = null;
        audioPlayer.onstalled = null;
        audioPlayer.onerror = null;
        audioPlayer.onended = null;
      }
    };
  }, [audioPlayer, setDuration, setElapsedTime, setBuffered, setIsLoading]);
};

export default useAudioEventsForProgressBar;
