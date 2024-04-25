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
      const isOverflown = ({ clientHeight, scrollHeight }) => {
        return scrollHeight > clientHeight;
      };

      const resizeText = ({
        element,
        minSize = 9,
        maxSize = 22,
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
  }, [textContainerRef.current]);

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
              &gt; Composing since 1996 in neoclassical, experimental and
              popular genres
            </li>
            <li className={s.listItem}>&gt; Composing for video since 2012</li>
          </ul>

          <div className={s.heading}>Sound Engineer</div>
          <ul className={s.list}>
            <li className={s.listItem}>
              &gt; Studied music technology at London College of Music, first
              class honours graduate
            </li>
            <li className={s.listItem}>Recording and mixing since 2006</li>
            <li className={s.listItem}>
              &gt; Worked and collected experience at music studios in London,
              Berlin, New York and Moscow
            </li>
            <li className={s.listItem}>
              &gt; Had a long talk with Michael Brauer at Electric Lady Studios,
              NYC in 2012 which changed my perception of mixing and life -
              forever thankful for kindness and wisdom
            </li>
          </ul>

          <div className={s.heading}>Musician</div>
          <ul className={s.list}>
            <li className={s.listItem}>&gt; Performed on stage since 1996</li>
            <li className={s.listItem}>
              &gt; 1996-2004: Conservatory class of fortepiano
            </li>
            <li className={s.listItem}>
              &gt; 2003-2012: Drums and vocals classes
            </li>
            <li className={s.listItem}>
              &gt; Self-taught guitar and bass player
            </li>
            <li className={s.listItem}>
              &gt; 2006-2013: Leader of an indie band
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
