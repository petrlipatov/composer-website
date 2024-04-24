import { Link } from "react-router-dom";

import Logo from "../../components/Logo/Logo";

import image from "../../assets/images/portrait.jpg";
import whatsappSrc from "../../assets/images/whatsapp.svg";

import s from "./Info.module.css";
import { useEffect, useRef } from "react";

function Info() {
  const textContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (textContainerRef.current != undefined) {
      const isOverflown = ({ clientHeight, scrollHeight }) => {
        console.log("scrollHeight", scrollHeight);
        console.log("clientHeight", clientHeight);
        return scrollHeight > clientHeight;
      };

      const resizeText = ({
        element,
        minSize = 8,
        maxSize = 25,
        step = 1,
        unit = "px",
      }) => {
        let i = minSize;
        let overflow = false;

        const parent = element;

        while (!overflow && i < maxSize) {
          element.style.fontSize = `${i}${unit}`;
          overflow = isOverflown(parent);

          if (!overflow) i += step;
        }

        element.style.fontSize = `${i - step}${unit}`;
        console.log(element.style.fontSize);
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
          <Logo />
        </div>

        <div className={s.imagesSection}>
          <img className={s.image} src={image} />
          <img className={s.image} src={image} />
        </div>

        <div className={s.textSection} ref={textContainerRef}>
          <div className={s.heading}>Composer: </div>
          <ul className={s.list}>
            <li className={s.listItem}>Classical music background </li>
            <li className={s.listItem}>
              Composing since 1996 in neoclassical, experimental and popular
              genres
            </li>
            <li className={s.listItem}>Composing for video since 2012</li>
          </ul>

          <div className={s.heading}>Sound Engineer:</div>
          <ul className={s.list}>
            <li className={s.listItem}>
              Studied music technology at London College of Music, first class
              honours graduate
            </li>
            <li className={s.listItem}>Recording and mixing since 2006</li>
            <li className={s.listItem}>
              Worked and collected experience at music studios in London,
              Berlin, New York and Moscow
            </li>
            <li className={s.listItem}>
              Had a long talk with Michael Brauer at Electric Lady Studios, NYC
              in 2012 which changed my perception of mixing and life - forever
              thankful for kindness and wisdom
            </li>
          </ul>

          <div className={s.heading}>Musician:</div>
          <ul className={s.list}>
            <li className={s.listItem}>Performed on stage since 1996</li>
            <li className={s.listItem}>
              1996-2004: Conservatory class of fortepiano
            </li>
            <li className={s.listItem}>
              2003-2012: Classes of drums and vocals,
            </li>
            <li className={s.listItem}>
              Self-taught guitar and bass guitar player
            </li>
            <li className={s.listItem}>2006-2013: Leader of an indie band</li>
          </ul>
        </div>
      </div>
      <div className={s.contactsSection}>
        <div>LIZATIKH@GMAIL.COM</div>
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
