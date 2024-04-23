import React, { useEffect, useRef, useState } from "react";
import s from "./Scrollbar.module.css";
import cn from "classnames";

const Scrollbar = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>();
  const [thumbHeight, setThumbHeight] = useState<number>(20);

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);

  function handleThumbResize() {
    if (scrollTrackRef.current && contentRef.current) {
      const { clientHeight: trackSize } = scrollTrackRef.current;
      const { clientHeight: contentVisible, scrollHeight: contentTotalHeight } =
        contentRef.current;

      setThumbHeight(
        Math.ceil((contentVisible / contentTotalHeight) * trackSize)
      );
    }
  }

  function handleThumbPosition() {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }

    const { scrollTop: contentTop, scrollHeight: contentHeight } =
      contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;

    let newTop = Math.ceil((contentTop / contentHeight) * trackHeight);
    newTop = Math.min(newTop, trackHeight - thumbHeight);

    const thumb = scrollThumbRef.current;

    requestAnimationFrame(() => {
      thumb.style.top = `${newTop}px`;
    });
  }

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      const { clientHeight: contentVisible, scrollHeight: contentTotalHeight } =
        content;

      if (contentTotalHeight <= contentVisible) {
        return setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      observer.current = new ResizeObserver(() => {
        handleThumbResize();
      });
      observer.current.observe(content);

      content.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(content);
        content.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [thumbHeight, scrollTrackRef?.current, contentRef?.current]);

  function handleScrollButton(direction: "up" | "down") {
    const { current: content } = contentRef;
    if (content) {
      const scrollAmount = direction === "down" ? 200 : -200;
      content.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <div className={s.container}>
      <div
        className={s.content}
        id="custom-scrollbars-content"
        ref={contentRef}
      >
        {children}
      </div>

      {isVisible && (
        <div className={s.scrollbar}>
          <button
            className={cn(s.button, s.buttonUp)}
            onClick={() => handleScrollButton("up")}
          />

          <div
            className={s.trackAndThumb}
            role="scrollbar"
            aria-controls="custom-scrollbars-content"
          >
            <div className={s.track} ref={scrollTrackRef} />
            <div
              className={s.thumb}
              style={{ height: `${thumbHeight}px` }}
              ref={scrollThumbRef}

              //   onMouseDownCapture={handleThumbMousedown}
            />
          </div>

          <button
            className={cn(s.button, s.buttonDown)}
            onClick={() => handleScrollButton("down")}
          />
        </div>
      )}
    </div>
  );
};

export default Scrollbar;
