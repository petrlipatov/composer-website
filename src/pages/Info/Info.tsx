import { useState } from "react";

import About from "./Sections/About/About";
import Contacts from "./Sections/Contacts/Contacts";

import s from "./Info.module.css";
import Gallery from "./Sections/Gallery/Gallery";
import Header from "../../components/Header/Header";
import SoundSpecs from "./Sections/SoundSpecs/SoundSpecs";
import Tag from "../../components/Tags/Tag/Tag";
import { PAGES } from "../../utils/constants";

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
        <Header>{PAGES.info}</Header>

        <div className={s.tagsSection}>
          <Tag
            onClick={() => setSelectedTag(SECTION_TAGS.about)}
            isSelected={selectedTag === SECTION_TAGS.about}
          >
            About
          </Tag>

          <Tag
            onClick={() => setSelectedTag(SECTION_TAGS.contacts)}
            isSelected={selectedTag === SECTION_TAGS.contacts}
          >
            Contacts
          </Tag>

          <Tag
            onClick={() => setSelectedTag(SECTION_TAGS.gallery)}
            isSelected={selectedTag === SECTION_TAGS.gallery}
          >
            Gallery
          </Tag>

          <Tag
            onClick={() => setSelectedTag(SECTION_TAGS.specs)}
            isSelected={selectedTag === SECTION_TAGS.specs}
          >
            Sound Specs
          </Tag>
        </div>

        {selectedTag === SECTION_TAGS.about && <About />}
        {selectedTag === SECTION_TAGS.contacts && <Contacts />}
        {selectedTag === SECTION_TAGS.gallery && <Gallery />}
        {selectedTag === SECTION_TAGS.specs && <SoundSpecs />}

        <div className={s.gallerySection}></div>
      </div>
    </div>
  );
}

export default Info;
