import React, { useEffect, useRef, useState } from "react";
import s from "./Scrollbar.module.css";
import cn from "classnames";

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

    // const thumbTop = thumb.offsetTop;
    // const thumbParent = thumb.offsetParent as HTMLElement;
    // const rect = thumbParent.getBoundingClientRect();
    // const relativeY = touch.clientY - thumbTop;
    const relativeY = touch.clientY;

    // console.log(relativeY);

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

  //   const handleThumbMousemove = (e: TouchEvent) => {
  //     if (contentRef.current) {
  //       e.preventDefault();
  //       e.stopPropagation();

  //       console.log(e);

  //       const touch = e?.touches[0];

  //       if (isDragging) {
  //         const {
  //           scrollHeight: contentTotalHeight,
  //           clientHeight: contentVisibleHeight,
  //         } = contentRef.current;

  //         // console.log(touch.clientY);

  //         const deltaY =
  //           (touch.clientY - scrollStartPosition) *
  //           (contentVisibleHeight / thumbHeight);

  //         const newScrollTop = Math.min(
  //           initialContentScrollTop + deltaY,
  //           contentTotalHeight - contentVisibleHeight
  //         );

  //         console.log("newScrollTop", newScrollTop);

  //         contentRef.current.scrollTop = newScrollTop;
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     document.addEventListener("mousemove", handleThumbMousemove);
  //     // document.addEventListener("touchend", handleTouchEnd);
  //     return () => {
  //       document.removeEventListener("mousemove", handleThumbMousemove);
  //       //   document.removeEventListener("touchend", handleTouchEnd);
  //     };
  //   }, []);

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
        <div
          className={s.scrollbar}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <button className={cn(s.button, s.buttonUp)} />

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

          <button className={cn(s.button, s.buttonDown)} />
        </div>
      )}
    </div>
  );
};

export default Scrollbar;

// function handleScrollButton(direction: "up" | "down") {
//     const { current: content } = contentRef;
//     if (content) {
//       const scrollAmount = direction === "down" ? 200 : -200;
//       content.scrollBy({ top: scrollAmount, behavior: "smooth" });
//     }
//   }

//           <button
//             className={cn(s.button, s.buttonUp)}
//             onClick={() => handleScrollButton("up")}
//           />

//           <button
//             className={cn(s.button, s.buttonDown)}
//             onClick={() => handleScrollButton("down")}
//           />
