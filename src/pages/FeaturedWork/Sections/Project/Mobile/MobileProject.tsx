import { useEffect, useContext } from "react";
import cn from "classnames";

import { Title, Description, Artwork } from "@/components/Project";
import { TvIcon, HeadphonesIcon } from "@/components/Icons";
import { HorizontalOverlayButton } from "@/components/Buttons";

import {
  FeaturedWorkContext,
  FeaturedWorkDispatchContext,
} from "../../FeaturedWorkContext";

import { FIRST_TRACK_INDEX } from "@/utils/constants";
import { ProjectProps } from "../types";
import { EXTENDED_PLAYER_ACTION_TYPE } from "../../../_types";

import s from "./MobileProject.module.css";

export const MobileProject = ({
  index,
  data,
  isSelected,
  setSelectedProjectIndex,
}: ProjectProps) => {
  const { setVideoID, setIsVideoPopupOpened } = useContext(FeaturedWorkContext);
  const dispatchPlayerAction = useContext(FeaturedWorkDispatchContext);

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
