import { Dispatch, MutableRefObject, SetStateAction } from "react";

export function updateBufferedAndElapsedTime(
  audioPlayer: HTMLAudioElement,
  setBuffered: Dispatch<SetStateAction<number>>,
  setElapsed: Dispatch<SetStateAction<number>>
) {
  const currentTime = Math.round(audioPlayer.currentTime);
  const bufferedRanges = audioPlayer.buffered;
  const hasBufferedRanges = bufferedRanges && bufferedRanges.length > 0;

  if (hasBufferedRanges) {
    const lastBufferedIndex = bufferedRanges.length - 1;
    const bufferedEndTime = Math.round(bufferedRanges.end(lastBufferedIndex));
    if (currentTime <= bufferedEndTime) {
      setBuffered(bufferedEndTime);
      setElapsed(currentTime);
    } else {
      audioPlayer.currentTime = bufferedEndTime;
      setElapsed(bufferedEndTime);
      setBuffered(bufferedEndTime);
    }
  }
}

export const handleScrubberChange = (
  e,
  audioPlayerRef: MutableRefObject<HTMLAudioElement>,
  progressBarTransitionSetter: Dispatch<SetStateAction<boolean>>
) => {
  progressBarTransitionSetter(false);
  const newTime = e.target.value;
  if (audioPlayerRef.current) {
    audioPlayerRef.current.currentTime = newTime;
  }

  setTimeout(() => {
    progressBarTransitionSetter(true);
  }, 300);
};
