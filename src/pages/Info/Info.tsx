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
import { SECTION_TAGS } from "./_constants";

import s from "./Info.module.css";
import { Tags } from "./Sections/Tags/Tags";
import { SectionsRouter } from "./Sections/SectionsRouter/SectionsRouter";

function Info() {
  const [selectedTag, setSelectedTag] = useState(SECTION_TAGS.about);

  return (
    <Page>
      <Content>
        <Header>{PAGES.info}</Header>
        <Tags selected={selectedTag} setSelectedTag={setSelectedTag} />
        <SectionsRouter selected={selectedTag} />
      </Content>
    </Page>
  );
}

export default Info;
