import { useEffect, useContext } from "react";
import cn from "classnames";

import Title from "../../../../../components/Project/Title/Title";
import Description from "../../../../../components/Project/Description/Description";
import Artwork from "../../../../../components/Project/Artwork/Artwork";
import TvIcon from "../../../../../components/Icons/TvIcon/TvIcon";
import HeadphonesIcon from "../../../../../components/Icons/HeadphonesIcon/HeadphonesIcon";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import { FIRST_TRACK_INDEX } from "../../../../../utils/constants";

import { ProjectProps } from "../types";

import s from "./MobileProject.module.css";
import HorizontalOverlayButton from "../../../../../components/Buttons/HorizontalOverlayButton/HorizontalOverlayButton";

import { EXTENDED_PLAYER_ACTION_TYPE } from "../../../_types";

const MobileProject = ({
  index,
  data,
  isSelected,
  setSelectedProjectIndex,
}: ProjectProps) => {
  const { dispatchPlayerAction, setVideoID, setIsVideoPopupOpened } =
    useContext(FeaturedWorkContext);

  // const audioPlayer = audioPlayerRef.current;

  console.log("моб");

  useEffect(() => {
    if (isSelected) {
      const timer = setTimeout(() => {
        setSelectedProjectIndex(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSelected, setSelectedProjectIndex, index]);

  function handleProjectClick() {
    setSelectedProjectIndex(index);
  }

  function handleListenClick() {
    console.log("test");
    dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_PLAYED });
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.PROJECT_DATA_SET,
      payload: data,
    });
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.TRACK_SELECTED,
      payload: FIRST_TRACK_INDEX,
    });

    dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_OPENED });
  }

  function handleWatchClick() {
    setVideoID(data.video);
    setIsVideoPopupOpened(true);
  }

  const projectButtonsClasses = cn(s.projectButtons, {
    [s.projectButtonsActive]: isSelected,
  });

  return (
    <>
      <div className={s.container} onClick={handleProjectClick}>
        <Artwork src={data.image} />

        <div className={projectButtonsClasses}>
          <HorizontalOverlayButton onClick={handleListenClick}>
            <HeadphonesIcon className={s.icon} />
            <div className={s.iconCaption}>Listen</div>
          </HorizontalOverlayButton>

          <HorizontalOverlayButton onClick={handleWatchClick}>
            <TvIcon className={s.icon} />
            <div className={s.iconCaption}>Watch</div>
          </HorizontalOverlayButton>
        </div>
      </div>

      <Title>{data.name}</Title>
      <Description>{data.genre}</Description>
    </>
  );
};

export default MobileProject;
