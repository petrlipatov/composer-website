export type ProjectData = {
  name: string;
  genre: string;
  year: string;
  imageSrc: string;
  videoSrc: string;
  tags: string[];
  tracks: {
    name: string;
    duration: string;
    audioSrc: string;
  }[];
};
