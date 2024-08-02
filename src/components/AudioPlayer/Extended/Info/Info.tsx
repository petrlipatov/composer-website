import TvIcon from "../../../Icons/TvIcon/TvIcon";

import { ProjectData } from "../../../../pages/FeaturedWork/_types";

import s from "./Info.module.css";

type Props = { data: ProjectData; handleVideoClick: (e: any) => void };

function Info({ data, handleVideoClick }: Props) {
  return (
    <div className={s.projectInfoSection}>
      <img className={s.artwork} src={data?.image} />
      <div className={s.projectInfoContainer}>
        <div className={s.projectDetailsBlock}>
          <div>{data?.name}</div>
          <div>{data?.genre}</div>
          <div>{data?.year}</div>
        </div>
        <div className={s.videoButtonContainer} onClick={handleVideoClick}>
          <TvIcon className={s.videoIcon} />
          <div>watch compilation</div>
        </div>
      </div>
    </div>
  );
}

export default Info;
