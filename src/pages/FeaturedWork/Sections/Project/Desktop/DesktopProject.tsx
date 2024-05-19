import { ProjectProps } from "../types";

import Artwork from "../../../../../components/Project/Artwork/Artwork";
import Title from "../../../../../components/Project/Title/Title";
import Description from "../../../../../components/Project/Description/Description";

import s from "./DesktopProject.module.css";
import ExtendedAudioPlayer from "../../ExtendedAudioPlayer/ExtendedAudioPlayer";
import Info from "../../../../../components/AudioPlayer/Extended/Info/Info";
import Scrollbar from "../../../../../components/AudioPlayer/Extended/Scrollbar/Scrollbar";
import AudioTrack from "../../../../../components/AudioPlayer/Extended/AudioTrack/AudioTrack";

const DesktopProject = ({
  index,
  data,
  isSelected,
  setSelectedProjectIndex,
}: ProjectProps) => {
  const handleVideoClick = () => {
    // console.log("lol");
  };

  return (
    <div className={s.container}>
      <div className={s.artworkContainer}>
        <Artwork src={data.imageSrc} />

        <div className={s.player}>
          <Info data={data} handleVideoClick={handleVideoClick} />
          <Scrollbar>
            {data.tracks.map((track, i) => {
              return (
                <AudioTrack
                  key={i}
                  index={i}
                  track={track}
                  isTrackPlaying={false}
                  isTrackSelected={false}
                  handleTrackClick={handleVideoClick}
                />
              );
            })}
          </Scrollbar>
        </div>
      </div>

      <Title>{data.name}</Title>
      <Description>{data.genre}</Description>
    </div>
  );
};

export default DesktopProject;
