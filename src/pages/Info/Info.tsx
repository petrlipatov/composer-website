import { Link } from "react-router-dom";

import Logo from "../../components/Logo/Logo";

import image from "../../assets/images/portrait.jpg";
import whatsappSrc from "../../assets/images/whatsapp.svg";

import s from "./Info.module.css";
import { useLayoutEffect, useRef } from "react";

function Info() {
  const textContainerRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (textContainerRef.current != undefined) {
      const isOverflown = ({
        clientHeight,
        clientWidth,
        scrollHeight,
        scrollWidth,
      }) => {
        return scrollHeight > clientHeight || scrollWidth > clientWidth;
      };

      const resizeText = ({
        element,
        minSize = 8,
        maxSize = 25,
        step = 0.1,
        unit = "px",
      }) => {
        let i = minSize;
        let overflow = false;

        while (!overflow && i < maxSize) {
          element.style.fontSize = `${i}${unit}`;
          overflow = isOverflown(element);
          if (!overflow) i += step;
        }

        element.style.fontSize = `${i - step}${unit}`;
      };
      resizeText({ element: textContainerRef.current });
    }
  }, [textContainerRef.current, textContainerRef.current?.clientHeight]);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.nav}>
          <Link to="/" className={s.pageTitle}>
            Info
          </Link>
          <Logo noTitle={true} />
        </div>

        {/* <div className={s.imagesSection}>
          <img className={s.image} src={image} />
          <img className={s.image} src={image} />
        </div> */}

        <div className={s.textSection} ref={textContainerRef}>
          <div className={s.heading}>Composer</div>
          <ul className={s.list}>
            <li className={s.listItem}>&gt; Classical music background</li>
            <li className={s.listItem}>
              &gt; Composing since ’96 in classical,
              <br /> experimental and popular genres
            </li>
            <li className={s.listItem}>&gt; Composing for video since 2012</li>
          </ul>

          <div className={s.heading}>Sound Engineer</div>
          <ul className={s.list}>
            <li className={s.listItem}>
              &gt; Studied music technology
              <br />
              at London College of Music,
              <br />
              first class honours graduate
            </li>
            <li className={s.listItem}>&gt; Recording and mixing since 2006</li>
            <li className={s.listItem}>
              &gt; Worked and collected experience
              <br /> at music studios in London,
              <br /> Berlin, New York and Moscow
            </li>
            <li className={s.listItem}>
              &gt; Had a long talk with Michael Brauer
              <br />
              at Electric Lady Studios, NYC in 2012
              <br />
              who changed my perception of mixing,
              <br />
              forever thankful
            </li>
          </ul>

          <div className={s.heading}>Musician</div>
          <ul className={s.list}>
            <li className={s.listItem}>
              &gt; 1996-2004 Fortepiano
              <br /> Conservatory class
            </li>
            <li className={s.listItem}>
              &gt; 2003-2012 Drums and vocals classes
            </li>
            <li className={s.listItem}>&gt; Guitar and bass - self-taught</li>
            <li className={s.listItem}>&gt; Performed on stage since 2002</li>
            <li className={s.listItem}>
              &gt; 2006-2013 Leader of an indie band
            </li>
          </ul>
        </div>
      </div>
      <div className={s.contactsSection}>
        {/* <div>LIZATIKH@GMAIL.COM</div> */}
        <div className={s.iconsContainer}>
          <img className={s.icon} src={whatsappSrc} />
          <img className={s.icon} src={whatsappSrc} />
          <img className={s.icon} src={whatsappSrc} />
          <img className={s.icon} src={whatsappSrc} />
          <img className={s.icon} src={whatsappSrc} />
          <img className={s.icon} src={whatsappSrc} />
        </div>
      </div>
    </div>
  );
}

export default Info;
