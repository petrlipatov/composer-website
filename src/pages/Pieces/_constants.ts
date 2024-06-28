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
    name: "Cats and Dogs",
    tags: ["Dark", "Misty", "No lyrics", "Vintage"],
    imageSrc: "/images/pieces/cats-and-dogs.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "",
  },
  {
    name: "Dance Ballet",
    tags: ["Easy", "Folkish", "Lyrics", "Vibrant"],
    imageSrc: "/images/pieces/dance-ballet.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "_m8Im8d2Lnk",
  },
  {
    name: "Day In May",
    tags: ["Lyrics", "Piano", "Smooth", "Vibrant"],
    imageSrc: "/images/pieces/day-in-may.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "2hriLCdEiKbirCoW",
  },
  {
    name: "Everyman's Thoughts",
    tags: ["No lyrics", "Misty", "Smooth", "Piano"],
    imageSrc: "/images/pieces/everymans-thoughts.webp",
    audioSrc: "/audio/FULL-OF-WONDERING_1__1.mp3",
    videoSrc: "gR8xy9Rp18PkrTL7",
  },
  {
    name: "Full Of Wondering",
    tags: ["No lyrics", "Misty", "Electronic", "Piano", "Smooth"],
    imageSrc: "/images/pieces/full-of-wondering.webp",
    audioSrc: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    videoSrc: "",
  },
  {
    name: "Functional",
    tags: ["Electronic", "Lyrics", "Eccentric", "Intense", "Vibrant", "Dark"],
    imageSrc: "/images/pieces/functional.webp",
    audioSrc: "/audio/WORN-OUT.mp3",
    videoSrc: "4xpeUZSsv0dqxEmI",
  },
  {
    name: "Going Far Away",
    tags: ["Lyrics", "Folkish", "Vintage", "Misty", "Easy"],
    imageSrc: "/images/pieces/going-far-away.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "",
  },
  {
    name: "I Don't know",
    tags: ["Eccentric", "Vibrant", "Folkish", "Lyrics", "Piano"],
    imageSrc: "/images/pieces/i-dont-know.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "62eWmeyfvLFtpTVV",
  },
  {
    name: "I Thought It Would Be fun",
    tags: ["Smooth", "Translucent", "Lyrics", "Piano"],
    imageSrc: "/images/pieces/i-thought-it-would-be-fun.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "v8CXQucfPXK8FXr5",
  },
  {
    name: "Journey Around The Fortune",
    tags: ["No lyrics", "Intense", "Misty", "Easy", "Folkish", "Vintage"],
    imageSrc: "/images/pieces/journey-around-the-fortune.webp",
    audioSrc: "/audio/FULL-OF-WONDERING_1__1.mp3",
    videoSrc: "",
  },
  {
    name: "Piano Play",
    tags: ["No lyrics", "Intense", "Dark", "Misty", "Piano", "Orchestral"],
    imageSrc: "/images/pieces/piano-play.webp",
    audioSrc: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    videoSrc: "",
  },
  {
    name: "Plavno",
    tags: [
      "Eccentric",
      "Intense",
      "Vibrant",
      "Epic",
      "Folkish",
      "Lyrics",
      "Piano",
      "Orchestral",
    ],
    imageSrc: "/images/pieces/plavno.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "nMMuIKhTiLIuD5O1",
  },
  {
    name: "Power Drip",
    tags: [
      "Electronic",
      "No lyrics",
      "Misty",
      "Smooth",
      "Translucent",
      "Piano",
      "Orchestral",
      "Vibrant",
    ],
    imageSrc: "/images/pieces/power-drip.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "VdD77SkglZq2YfDf",
  },
  {
    name: "Pulse",
    tags: [
      "Eccentric",
      "Vibrant",
      "Folkish",
      "Easy",
      "Lyrics",
      "Orchestral",
      "Vintage",
    ],
    imageSrc: "/images/pieces/pulse.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "fVNN92Y5_xLgChXO",
  },
  {
    name: "Revival Of The Unknown",
    tags: ["No lyrics", "Epic", "Vibrant", "Dark", "Orchestral"],
    imageSrc: "/images/pieces/revival-of-the-unknown.webp",
    audioSrc: "/audio/FULL-OF-WONDERING_1__1.mp3",
    videoSrc: "yzJAZPhaEWULzKYG",
  },
  {
    name: "Soon",
    tags: ["Electronic", "Misty", "Easy", "Smooth", "Translucent", "Lyrics"],
    imageSrc: "/images/pieces/soon.webp",
    audioSrc: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    videoSrc: "vd_BRPzzu34qYK-u",
  },
  {
    name: "The End Of Patiance",
    tags: ["No lyrics", "Intense", "Misty", "Piano"],
    imageSrc: "/images/pieces/the-end-of-patiance.webp",
    audioSrc: "/audio/WORN-OUT.mp3",
    videoSrc: "",
  },
  {
    name: "Threat Serenade",
    tags: [
      "Electronic",
      "No lyrics",
      "Eccentric",
      "Intense",
      "Dark",
      "Misty",
      "Orchestral",
    ],
    imageSrc: "/images/pieces/threat-serenade.webp",
    audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
    videoSrc: "",
  },
  {
    name: "Tomorrow",
    tags: ["Eccentric", "Vibrant", "Epic", "Lyrics", "Piano", "Orchestral"],
    imageSrc: "/images/pieces/tomorrow.webp",
    audioSrc: "/audio/Theory-of-Light-Master.mp3",
    videoSrc: "afM1KTzX2i5GTnoI",
  },
  {
    name: "Worn Out",
    tags: ["Dark", "Misty", "No lyrics", "Vintage"],
    imageSrc: "/images/pieces/worn-out.webp",
    audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    videoSrc: "",
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
export const TRACK_LEFT_MARGIN_DESKTOP = 16;

export const TRACK_TOP_MARGIN_MOBILE = 8;
export const TRACK_TOP_MARGIN_DESKTOP = 2;

export const TRACK_ASPECT_RATIO = 190.5 / 211.12;
