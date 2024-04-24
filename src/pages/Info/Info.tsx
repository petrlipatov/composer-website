import { Link } from "react-router-dom";

import Logo from "../../components/Logo/Logo";

import image from "../../assets/images/portrait.jpg";

import s from "./Info.module.css";

function Info() {
  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.nav}>
          <Link to="/" className={s.pageTitle}>
            Info
          </Link>
          <Logo />
        </div>

        <div className={s.grid}>
          <div className={s.imagesSection}>
            <img className={s.image} src={image} />
            <img className={s.image} src={image} />
          </div>

          <div className={s.textSection}>
            <div className={s.heading}>Composer: </div>

            <ul className={s.list}>
              <li className={s.listItem}>Classical music background </li>
              <li className={s.listItem}>
                Composing since 1996 in neoclassical, experimental and popular
                genres.
              </li>
              <li className={s.listItem}>Composing for video since 2012</li>
            </ul>

            <div className={s.heading}>Sound Engineer:</div>

            <ul className={s.list}>
              <li className={s.listItem}>
                Studied music technology at London College of Music, first class
                honours graduated
              </li>
              <li className={s.listItem}>
                Worked and collected experience at music studios in London,
                Berlin, New York and Moscow
              </li>
              <li className={s.listItem}>Recording and mixing since 2006</li>
              <li className={s.listItem}>
                Had a long talk with Michael Brauer at Electric Studios, NYC in
                2012 which changed my perception of mixing and life - forever
                thankful for kindness, wisdom and hospitality.
              </li>
            </ul>

            <div className={s.heading}>Musician:</div>

            <ul className={s.list}>
              <li className={s.listItem}>Performed music since 1996</li>
              <li className={s.listItem}>
                Conservatory class of fortepiano (1996-2004)
              </li>
              <li className={s.listItem}>
                Classes of drums and vocals (2003-2012)
              </li>
              <li className={s.listItem}>
                Self-taught basic guitar and bass guitar player
              </li>
              <li className={s.listItem}>2006-2013 Leader of an indie band</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
