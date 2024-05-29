import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useLayoutEffect,
} from "react";

function useWidthResizeListener(
  ref: MutableRefObject<HTMLDivElement>,
  setElementWidth: Dispatch<SetStateAction<number>>
) {
  useLayoutEffect(() => {
    const updateSectionWidth = () => {
      if (ref.current) {
        setElementWidth(ref.current.offsetWidth);
      }
    };

    updateSectionWidth();

    window.addEventListener("resize", updateSectionWidth);

    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [ref, setElementWidth]);
}

export default useWidthResizeListener;
