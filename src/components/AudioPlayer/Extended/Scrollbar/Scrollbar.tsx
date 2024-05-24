import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { throttle } from "../../../../utils/helpers/throttle";
import s from "./Scrollbar.module.css";

const Scrollbar = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>();
  const [thumbHeight, setThumbHeight] = useState<number>(20);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialContentScrollTop, setInitialContentScrollTop] =
    useState<number>(0);

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

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    e.stopPropagation();

    const touch = e.touches[0];

    const thumb = scrollThumbRef.current;
    if (!thumb) return;

    const relativeY = touch.clientY;

    setScrollStartPosition(relativeY);

    if (contentRef.current)
      setInitialContentScrollTop(contentRef.current.scrollTop);

    setIsDragging(true);
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const {
        scrollHeight: contentTotalHeight,
        clientHeight: contentVisibleHeight,
      } = contentRef.current;

      const touch = e.changedTouches[0];

      const deltaY =
        (touch.clientY - scrollStartPosition) *
        (contentVisibleHeight / thumbHeight);

      const newScrollTop = Math.min(
        initialContentScrollTop + deltaY,
        contentTotalHeight - contentVisibleHeight
      );

      contentRef.current.scrollTop = newScrollTop;
    }
  };

  const throttledHandleTouchMove = throttle(handleTouchMove, 50);

  function handleScrollButton(direction: "up" | "down") {
    const { current: content } = contentRef;
    if (content) {
      const scrollAmount = direction === "down" ? 200 : -200;
      content.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <div className={s.container}>
      <div className={s.content} ref={contentRef}>
        {children}
      </div>

      {isVisible && (
        <div
          className={s.scrollbar}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={throttledHandleTouchMove}
        >
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
