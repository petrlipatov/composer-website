import { Link } from "react-router-dom";
import cn from "classnames";

import Logo from "../../components/Logo/Logo";

import s from "./Info.module.css";
import { useState } from "react";

function Info() {
  const [selectedTag, setSelectedTag] = useState(1);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.nav}>
          <Link to="/" className={s.pageTitle}>
            Info
          </Link>
          <Logo />
        </div>

        <div className={s.tagsSection}>
          <button
            className={cn(s.tag, selectedTag === 1 ? s.tagSelected : "")}
            onClick={() => setSelectedTag(1)}
          >
            About
          </button>
          <button
            className={cn(s.tag, selectedTag === 2 ? s.tagSelected : "")}
            onClick={() => setSelectedTag(2)}
          >
            Gallery
          </button>
          <button
            className={cn(s.tag, selectedTag === 3 ? s.tagSelected : "")}
            onClick={() => setSelectedTag(3)}
          >
            Tech Specs
          </button>
        </div>

        <div className={s.textSection}>
          <div className={s.heading}>composer</div>
          <ul className={s.list}>
            <li className={s.listItem}>
              &gt; Composing since 1996 in classical,
              <br /> experimental and popular genres
            </li>
            <li className={s.listItem}>&gt; Composing for video since 2012</li>
          </ul>

          <div className={s.heading}>sound engineer</div>
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

          <div className={s.heading}>musician</div>
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

        <div className={s.contactsSection}>
          <button className={s.button} style={{ backgroundColor: "#FF0101" }}>
            YouTube
          </button>
          <button className={s.button} style={{ backgroundColor: "#CD1CFB" }}>
            Instagram
          </button>
          <button className={s.button} style={{ backgroundColor: "#13C230" }}>
            WhatsApp
          </button>
          <button className={s.button} style={{ backgroundColor: "#4386F5" }}>
            Email
          </button>
          <button className={s.button} style={{ backgroundColor: "#1FD861" }}>
            Spotify
          </button>
          <button className={s.button} style={{ backgroundColor: "#EAB90A" }}>
            IMDB
          </button>
          <button className={s.button} style={{ backgroundColor: "#FC526A" }}>
            Apple Music
          </button>
          <button className={s.button} style={{ backgroundColor: "#FFDB4A" }}>
            Yandex Music
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;
