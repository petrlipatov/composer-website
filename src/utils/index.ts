export function calcViewportSize(stateSetter) {
  const handleResize = () => {
    stateSetter(window.innerHeight);
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
