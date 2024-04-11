export type AudioTrackData = {
  name: string;
  tags: string[];
  imageSrc: string;
  audioSrc: string;
  videoSrc: string;
};

type ProjectAudioTrack = {
  name: string;
  audioSrc: string;
  videoSrc: string;
};

export type ProjectData = {
  name: string;
  imageSrc: string;
  tags: string[];
  tracks: ProjectAudioTrack[];
};
