import { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import Logo from "../../components/Logo/Logo";

import About from "./Sections/About/About";
import Contacts from "./Sections/Contacts/Contacts";

import s from "./Info.module.css";
import Gallery from "./Sections/Gallery/Gallery";

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
            Sound Specs
          </button>
        </div>

        {selectedTag === SECTION_TAGS.about && <About />}
        {selectedTag === SECTION_TAGS.contacts && <Contacts />}
        {selectedTag === SECTION_TAGS.gallery && <Gallery />}

        <div className={s.gallerySection}></div>
      </div>
    </div>
  );
}

export default Info;
