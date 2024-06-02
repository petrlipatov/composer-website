import React from "react";
import cn from "classnames";
import s from "./PlayIcon.module.css";

const PlayIcon = ({ isAudioPlaying, customStyles, isFilled = false }) => {
  return (
    <svg
      viewBox="5 2 14 20"
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        s.defaultStyles,
        customStyles,
        isAudioPlaying ? s.disabled : ""
      )}
    >
      <polygon points="5 3 5 21 19 12 5 3" />
    </svg>
  );
};

export default PlayIcon;
