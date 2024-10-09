import { SECTION_TAGS } from "../../_constants";
import { About } from "../About";
import { Contacts } from "../Contacts";
import { Gallery } from "../Gallery";
import { SoundSpecs } from "../SoundSpecs";

export const SectionsRouter = ({ selected }) => {
  switch (selected) {
    case SECTION_TAGS.about:
      return <About />;
    case SECTION_TAGS.contacts:
      return <Contacts />;
    case SECTION_TAGS.gallery:
      return <Gallery />;
    case SECTION_TAGS.specs:
      return <SoundSpecs />;
  }
};
