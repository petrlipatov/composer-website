import React from "react";
import cn from "classnames";
import s from "./PauseIcon.module.css";

const PauseIcon = ({ isAudioPlaying, customStyles, isFilled = false }) => {
  return (
    <svg
      viewBox="0 0 18 14"
      xmlns="http://www.w3.org/2000/svg"
      fill={isFilled ? "#000000" : "none"}
      stroke={isFilled ? "none" : "#000000"}
      className={cn(
        s.defaultStyles,
        customStyles,
        isAudioPlaying ? "" : s.disabled
      )}
    >
      <rect x="1" y="0" width="5" height="14" rx="0" />
      <rect x="9" y="0" width="5" height="14" rx="0" />
    </svg>
  );
};

export default PauseIcon;
