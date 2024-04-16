export type AudioTrackData = {
  name: string;
  tags: string[];
  imageSrc: string;
  audioSrc: string;
  videoSrc: string;
};

export type ProjectData = {
  name: string;
  description: string;
  imageSrc: string;
  tags: string[];
  tracks: {
    name: string;
    duration: string;
    audioSrc: string;
    videoSrc: string;
  }[];
};
