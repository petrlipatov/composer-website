import { ProjectData } from "@/pages/FeaturedWork/_types";
import s from "./ExtendedTitle.module.css";

type Props = {
  selectedTrackIndex: number;
  currentProject: ProjectData;
};

export function ExtendedTitle({ selectedTrackIndex, currentProject }: Props) {
  return (
    <div className={s.title}>
      {selectedTrackIndex === undefined
        ? currentProject?.tracks[0].name
        : currentProject?.tracks[selectedTrackIndex]?.name}
    </div>
  );
}
