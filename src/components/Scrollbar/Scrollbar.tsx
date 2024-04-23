import React, { useEffect, useRef, useState } from "react";
import s from "./Scrollbar.module.css";
import cn from "classnames";

const Scrollbar = ({ children }: { children: React.ReactNode }) => {
  const [thumbHeight, setThumbHeight] = useState<number>(20);

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);

  function handleResize() {
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
      observer.current = new ResizeObserver(() => {
        handleResize();
      });
      observer.current.observe(content);
      content.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(content);
        content.removeEventListener("scroll", handleThumbPosition);
        console.log("вызваны функции на анмаунте");
      };
    }
  }, []);

  //

  return (
    <div className={s.container}>
      <div
        className={s.content}
        id="custom-scrollbars-content"
        ref={contentRef}
      >
        {children}
      </div>

      <div className={s.scrollbar}>
        <button className={cn(s.button, s.buttonUp)}></button>

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
          />
        </div>

        <button className={cn(s.button, s.buttonDown)}></button>
      </div>
    </div>
  );
};

export default Scrollbar;
