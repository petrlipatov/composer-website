export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsPart = Math.round(seconds % 60);
  const formattedTime = `${minutes}:${String(secondsPart).padStart(2, "0")}`;

  return formattedTime;
}
