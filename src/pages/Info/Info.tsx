import { useState } from "react";

import { Tags } from "./Sections/Tags/Tags";
import { Content } from "./Sections/Content";
import { Page } from "./Sections/Page";
import { SectionsRouter } from "./Sections/SectionsRouter";
import { Header } from "@/components/Header";
import { PAGES } from "@/utils/constants";
import { SECTION_TAGS } from "./_constants";

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
