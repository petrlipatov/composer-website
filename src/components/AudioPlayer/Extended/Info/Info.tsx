import { ProjectData } from "../../../../pages/FeaturedWork/_types";

import videoIcon from "../../../../assets/images/tv.svg";

import s from "./Info.module.css";

type Props = { data: ProjectData; handleVideoClick: (e: any) => void };

function Info({ data, handleVideoClick }: Props) {
  return (
    <div className={s.projectInfoSection}>
      <img className={s.artwork} src={data?.imageSrc} />
      <div className={s.projectInfoContainer}>
        <div className={s.projectDetailsBlock}>
          <div>{data?.name}</div>
          <div>{data?.genre}</div>
          <div>{data?.year}</div>
        </div>
        <div className={s.videoButtonContainer} onClick={handleVideoClick}>
          <img className={s.videoIcon} src={videoIcon} />
          <div>watch compilation</div>
        </div>
      </div>
    </div>
  );
}

export default Info;
