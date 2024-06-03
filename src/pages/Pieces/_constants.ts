import { MutableRefObject } from "react";
import { ContextTypes } from "./_types";

export const PIECES_GENRES = [
  "Piano",
  "Orchestral",
  "Vintage",
  "Electronic",
  "Folkish",
  "Lyrics",
  "No lyrics",
  "Epic",
  "Easy",
  "Eccentric",
  "Intense",
  "Smooth",
  "Translucent",
  "Vibrant",
  "Misty",
  "Dark",
];

export const PIECES = [
  {
    name: "I Thought It Would Be Fun1",
    tags: ["Piano", "Orchestral", "Vintage"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Worn Out2",
    tags: ["Piano", "Electronic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Threat Serenade3",
    tags: ["Dark", "Vibrant", "Misty"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "The End of Patience4",
    tags: ["Vibrant", "Misty", "Epic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/FULL-OF-WONDERING_1__1.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Revival of the Unknown5",
    tags: ["Folkish", "Lyrics", "No lyrics", "Epic", "Easy"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Power Drip6",
    tags: ["Epic", "Easy", "Eccentric"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/WORN-OUT.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "I Thought It Would Be Fun7",
    tags: ["Piano", "Orchestral", "Vintage"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Worn Out8",
    tags: ["Piano", "Electronic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Threat Serenade9",
    tags: ["Dark", "Vibrant", "Misty"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "The End of Patience10",
    tags: ["Vibrant", "Misty", "Epic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/FULL-OF-WONDERING_1__1.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Revival of the Unknown11",
    tags: ["Folkish", "Lyrics", "No lyrics", "Epic", "Easy"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Power Drip12",
    tags: ["Epic", "Easy", "Eccentric"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/WORN-OUT.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "I Thought It Would Be Fun13",
    tags: ["Piano", "Orchestral", "Vintage"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Worn Out14",
    tags: ["Piano", "Electronic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Threat Serenade15",
    tags: ["Dark", "Vibrant", "Misty"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "The End of Patience16",
    tags: ["Vibrant", "Misty", "Epic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/FULL-OF-WONDERING_1__1.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Revival of the Unknown17",
    tags: ["Folkish", "Lyrics", "No lyrics", "Epic", "Easy"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Power Drip18",
    tags: ["Epic", "Easy", "Eccentric"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/WORN-OUT.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "I Thought It Would Be Fun19",
    tags: ["Piano", "Orchestral", "Vintage"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Worn Out20",
    tags: ["Piano", "Electronic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Threat Serenade21",
    tags: ["Dark", "Vibrant", "Misty"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "The End of Patience22",
    tags: ["Vibrant", "Misty", "Epic"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/FULL-OF-WONDERING_1__1.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Revival of the Unknown23",
    tags: ["Folkish", "Lyrics", "No lyrics", "Epic", "Easy"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
  {
    name: "Power Drip24",
    tags: ["Epic", "Easy", "Eccentric"],
    imageSrc: "/images/pieces/track1.webp",
    audioSrc: "/audio/WORN-OUT.mp3",
    videoSrc: "u0dBG0AL3Cs",
  },
];

export const DEFAULT_CONTEXT: ContextTypes = {
  videoID: "",
  selectedTrackIndex: null,
  selectedTags: [],
  filteredPieces: [],
  currentAudioData: {
    index: null,
    name: "",
    tags: [],
    imageSrc: "",
    audioSrc: "",
    videoSrc: "",
  },
  isPlayerOpened: false,
  isVideoPopupOpened: false,
  audioPlayerRef: {
    current: null,
  } as MutableRefObject<HTMLAudioElement | null>,
  setVideoID: () => {},
  setSelectedTags: () => {},
  setCurrentAudioData: () => {},
  setIsPlayerOpened: () => {},
  setIsVideoPopupOpened: () => {},
  setSelectedTrackIndex: () => {},
};

export const TABLE_COLUMNS_MOBILE = 2;
export const TABLE_COLUMNS_DESKTOP = 3;

export const TRACK_LEFT_MARGIN_MOBILE = 8;
export const TRACK_LEFT_MARGIN_DESKTOP = 8;

export const TRACK_TOP_MARGIN_MOBILE = 8;
export const TRACK_TOP_MARGIN_DESKTOP = 2;

export const TRACK_ASPECT_RATIO = 190.5 / 211.12;
