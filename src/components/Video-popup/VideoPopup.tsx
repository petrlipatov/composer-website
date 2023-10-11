import { createPortal } from "react-dom";

function VideoPopup() {
  const rootContainer = document.getElementById("modal");

  return createPortal(
    <>
      <h1>Player</h1>
    </>,
    rootContainer
  );
}

export default VideoPopup;
