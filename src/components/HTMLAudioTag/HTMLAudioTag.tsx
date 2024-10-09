import { RefObject, forwardRef } from "react";

export const HTMLAudioTag = forwardRef(
  (_, ref: RefObject<HTMLAudioElement>) => {
    return (
      <audio preload="metadata" ref={ref}>
        <source src={""} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  }
);
