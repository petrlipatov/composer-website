import { useState } from "react";

import { Content } from "./Sections/Content";
import { Page } from "./Sections/Page";
import { About } from "./Sections/About";
import { Contacts } from "./Sections/Contacts";
import { Gallery } from "./Sections/Gallery/Gallery";
import { SoundSpecs } from "./Sections/SoundSpecs/SoundSpecs";

import { Header } from "@/components/Header";
import { Tag } from "@/components/Tags";
import { PAGES } from "@/utils/constants";

import s from "./Info.module.css";

enum SECTION_TAGS {
  about,
  contacts,
  gallery,
  specs,
}

function Info() {
  const [selectedTag, setSelectedTag] = useState(SECTION_TAGS.about);

  return (
    <Page>
      <Content>
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
      </Content>
    </Page>
  );
}

export default Info;
