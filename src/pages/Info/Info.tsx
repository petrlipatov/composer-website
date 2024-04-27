import { Link } from "react-router-dom";
import cn from "classnames";

import Logo from "../../components/Logo/Logo";

import s from "./Info.module.css";
import { useState } from "react";

enum SECTION_TAGS {
  about,
  contacts,
  gallery,
  specs,
}

function Info() {
  const [selectedTag, setSelectedTag] = useState(SECTION_TAGS.about);

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
            className={cn(
              s.tag,
              selectedTag === SECTION_TAGS.about ? s.tagSelected : ""
            )}
            onClick={() => setSelectedTag(SECTION_TAGS.about)}
          >
            About
          </button>
          <button
            className={cn(
              s.tag,
              selectedTag === SECTION_TAGS.contacts ? s.tagSelected : ""
            )}
            onClick={() => setSelectedTag(SECTION_TAGS.contacts)}
          >
            Contacts
          </button>
          <button
            className={cn(
              s.tag,
              selectedTag === SECTION_TAGS.gallery ? s.tagSelected : ""
            )}
            onClick={() => setSelectedTag(SECTION_TAGS.gallery)}
          >
            Gallery
          </button>
          <button
            className={cn(
              s.tag,
              selectedTag === SECTION_TAGS.specs ? s.tagSelected : ""
            )}
            onClick={() => setSelectedTag(SECTION_TAGS.specs)}
          >
            Tech Specs
          </button>
        </div>

        {selectedTag === SECTION_TAGS.about && (
          <div className={s.textSection}>
            <div className={s.heading}>Composer</div>
            <ul className={s.list}>
              <li className={s.listItem}>
                &gt; Composing since 1996 in classical,
                <br /> experimental and popular genres
              </li>
              <li className={s.listItem}>
                &gt; Composing for video since 2012
              </li>
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
              <li className={s.listItem}>
                &gt; Recording and mixing since 2006
              </li>
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

            <div className={s.aboutLinksSection}>
              <button
                className={s.aboutLinkButton}
                style={{ backgroundColor: "#FF0101" }}
              >
                YouTube
              </button>
              <button
                className={s.aboutLinkButton}
                style={{ backgroundColor: "#CD1CFB" }}
              >
                Instagram
              </button>
              <button
                className={s.aboutLinkButton}
                style={{ backgroundColor: "#EAB90A" }}
              >
                IMDB
              </button>
              <button
                className={s.aboutLinkButton}
                style={{ backgroundColor: "#1FD861" }}
              >
                Spotify
              </button>
            </div>
          </div>
        )}

        {selectedTag === SECTION_TAGS.contacts && (
          <div className={s.contactsSection}>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#13C230" }}
            >
              WhatsApp
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#99A0F8" }}
            >
              Email
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#4793D0" }}
            >
              Telegram
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#2D69C9" }}
            >
              LinkedIn
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#EAB90A" }}
            >
              IMDB
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#FF0101" }}
            >
              YouTube
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#CD1CFB" }}
            >
              Instagram
            </button>

            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#1FD861" }}
            >
              Spotify
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#FC526A" }}
            >
              Apple Music
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#FFDB4A" }}
            >
              Yandex Music
            </button>

            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#FFFFFF" }}
            >
              VEVO
            </button>

            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#963EF6" }}
            >
              Deezer
            </button>
            <button
              className={s.contactsButton}
              style={{ backgroundColor: "#65CFD9" }}
            >
              Amazon music
            </button>
          </div>
        )}

        <div className={s.gallerySection}></div>
      </div>
    </div>
  );
}

export default Info;
