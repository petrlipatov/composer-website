import { ProjectData } from "../../../../pages/FeaturedWork/_types";
import s from "./Title.module.css";

type Props = {
  selectedTrackIndex: number;
  currentProject: ProjectData;
};

function Title({ selectedTrackIndex, currentProject }: Props) {
  return (
    <div className={s.title}>
      {selectedTrackIndex === undefined
        ? currentProject?.tracks[0].name
        : currentProject?.tracks[selectedTrackIndex]?.name}
    </div>
  );
}

export default Title;
