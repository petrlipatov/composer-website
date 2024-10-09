import { SECTION_TAGS } from "../../_constants";
import { Tag } from "@/components/Tags";
import s from "./Tags.module.css";

export const Tags = ({ selected, setSelectedTag }) => {
  return (
    <div className={s.tagsSection}>
      {Object.values(SECTION_TAGS).map((sectionName) => {
        return (
          <Tag
            onClick={() => setSelectedTag(sectionName)}
            isSelected={selected === sectionName}
            key={sectionName}
          >
            {sectionName}
          </Tag>
        );
      })}
    </div>
  );
};
