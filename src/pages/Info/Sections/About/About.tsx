import { PORTRAIT_IMAGE, YOUTUBE_LINK } from "../../_constants";
import s from "./About.module.css";

export function About() {
  return (
    <section className={s.about}>
      <div className={s.aboutText}>
        <div className={s.heading}>Composer</div>
        <ul className={s.list}>
          <li className={s.listItem}>
            &gt; Composing since 1996 in classical,
            <br /> experimental and popular genres
          </li>
          <li className={s.listItem}>&gt; Composing for video since 2012</li>
        </ul>

        <div className={s.heading}>Sound engineer</div>
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
            &gt; Had a perception changing talk
            <br />
            with Michael Brauer at Electric Lady
            <br />
            Studios NYC in 2012, forever thankful
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
          <li className={s.listItem}>
            &gt; Guitar and bass &mdash; self-taught
          </li>
          <li className={s.listItem}>&gt; Performed on stage since 2002</li>
          <li className={s.listItem}>&gt; 2006-2013 Leader of an indie band</li>
        </ul>
      </div>

      <div>
        <img className={s.image} src={PORTRAIT_IMAGE} />
        <div className={s.linksSection}>
          <a
            href={YOUTUBE_LINK}
            className={s.linkButton}
            style={{ backgroundColor: "#FF0101" }}
            target="_blank"
          >
            YouTube
          </a>
          <button
            className={s.linkButton}
            style={{ backgroundColor: "#CD1CFB" }}
          >
            Instagram
          </button>
          <button
            className={s.linkButton}
            style={{ backgroundColor: "#EAB90A" }}
          >
            IMDB
          </button>
          <button
            className={s.linkButton}
            style={{ backgroundColor: "#1FD861" }}
          >
            Spotify
          </button>
        </div>
      </div>
    </section>
  );
}
