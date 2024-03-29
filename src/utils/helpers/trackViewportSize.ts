export function trackViewportSize(stateSetter) {
  const handleResize = () => {
    const { innerHeight, innerWidth } = window;
    stateSetter({ height: innerHeight, width: innerWidth });
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
