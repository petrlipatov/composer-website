export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsPart = Math.floor(seconds % 60);

  // Используйте метод padStart(), чтобы добавить ведущий ноль, если секунды < 10
  const formattedTime = `${minutes}:${String(secondsPart).padStart(2, "0")}`;

  return formattedTime;
}
