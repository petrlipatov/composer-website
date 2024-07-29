import { ContextTypes } from "./_types";

export enum PLAYER_STATUS {
  PLAYING = "playing",
  PAUSED = "paused",
  LOADING = "loading",
  ENDED = "ended",
}

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
    image: "/images/pieces/cats-and-dogs.webp",
    audio: "/audio/Free_Test_Data_2MB_MP3.mp3",
    video: "",
  },
  {
    name: "Dance Ballet",
    tags: ["Easy", "Folkish", "Lyrics", "Vibrant"],
    image: "/images/pieces/dance-ballet.webp",
    audio: "/audio/Theory-of-Light-Master.mp3",
    video: "_m8Im8d2Lnk",
  },
  {
    name: "Day In May",
    tags: ["Lyrics", "Piano", "Smooth", "Vibrant"],
    image: "/images/pieces/day-in-may.webp",
    audio: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    video: "2hriLCdEiKbirCoW",
  },
  {
    name: "Everyman's Thoughts",
    tags: ["No lyrics", "Misty", "Smooth", "Piano"],
    image: "/images/pieces/everymans-thoughts.webp",
    audio: "/audio/FULL-OF-WONDERING_1__1.mp3",
    video: "gR8xy9Rp18PkrTL7",
  },
  {
    name: "Full Of Wondering",
    tags: ["No lyrics", "Misty", "Electronic", "Piano", "Smooth"],
    image: "/images/pieces/full-of-wondering.webp",
    audio: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    video: "",
  },
  {
    name: "Functional",
    tags: ["Electronic", "Lyrics", "Eccentric", "Intense", "Vibrant", "Dark"],
    image: "/images/pieces/functional.webp",
    audio: "/audio/WORN-OUT.mp3",
    video: "4xpeUZSsv0dqxEmI",
  },
  {
    name: "Going Far Away",
    tags: ["Lyrics", "Folkish", "Vintage", "Misty", "Easy"],
    image: "/images/pieces/going-far-away.webp",
    audio: "/audio/Free_Test_Data_2MB_MP3.mp3",
    video: "",
  },
  {
    name: "I Don't know",
    tags: ["Eccentric", "Vibrant", "Folkish", "Lyrics", "Piano"],
    image: "/images/pieces/i-dont-know.webp",
    audio: "/audio/Theory-of-Light-Master.mp3",
    video: "62eWmeyfvLFtpTVV",
  },
  {
    name: "I Thought It Would Be fun",
    tags: ["Smooth", "Translucent", "Lyrics", "Piano"],
    image: "/images/pieces/i-thought-it-would-be-fun.webp",
    audio: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    video: "v8CXQucfPXK8FXr5",
  },
  {
    name: "Journey Around The Fortune",
    tags: ["No lyrics", "Intense", "Misty", "Easy", "Folkish", "Vintage"],
    image: "/images/pieces/journey-around-the-fortune.webp",
    audio: "/audio/FULL-OF-WONDERING_1__1.mp3",
    video: "",
  },
  {
    name: "Piano Play",
    tags: ["No lyrics", "Intense", "Dark", "Misty", "Piano", "Orchestral"],
    image: "/images/pieces/piano-play.webp",
    audio: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    video: "",
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
    image: "/images/pieces/plavno.webp",
    audio: "/audio/Free_Test_Data_2MB_MP3.mp3",
    video: "nMMuIKhTiLIuD5O1",
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
    image: "/images/pieces/power-drip.webp",
    audio: "/audio/Theory-of-Light-Master.mp3",
    video: "VdD77SkglZq2YfDf",
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
    image: "/images/pieces/pulse.webp",
    audio: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    video: "fVNN92Y5_xLgChXO",
  },
  {
    name: "Revival Of The Unknown",
    tags: ["No lyrics", "Epic", "Vibrant", "Dark", "Orchestral"],
    image: "/images/pieces/revival-of-the-unknown.webp",
    audio: "/audio/FULL-OF-WONDERING_1__1.mp3",
    video: "yzJAZPhaEWULzKYG",
  },
  {
    name: "Soon",
    tags: ["Electronic", "Misty", "Easy", "Smooth", "Translucent", "Lyrics"],
    image: "/images/pieces/soon.webp",
    audio: "/audio/PIANO-PLAY-MORE-NATURAL.mp3",
    video: "vd_BRPzzu34qYK-u",
  },
  {
    name: "The End Of Patiance",
    tags: ["No lyrics", "Intense", "Misty", "Piano"],
    image: "/images/pieces/the-end-of-patiance.webp",
    audio: "/audio/WORN-OUT.mp3",
    video: "",
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
    image: "/images/pieces/threat-serenade.webp",
    audio: "/audio/Free_Test_Data_2MB_MP3.mp3",
    video: "",
  },
  {
    name: "Tomorrow",
    tags: ["Eccentric", "Vibrant", "Epic", "Lyrics", "Piano", "Orchestral"],
    image: "/images/pieces/tomorrow.webp",
    audio: "/audio/Theory-of-Light-Master.mp3",
    video: "afM1KTzX2i5GTnoI",
  },
  {
    name: "Worn Out",
    tags: ["Dark", "Misty", "No lyrics", "Vintage"],
    image: "/images/pieces/worn-out.webp",
    audio: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
    video: "",
  },
];

export const DEFAULT_CONTEXT: ContextTypes = {
  player: {
    status: "paused",
    isOpened: false,
    data: {
      index: null,
      name: "",
      tags: [],
      image: "",
      audio: "",
      video: "",
    },
  },
  videoID: "",
  selectedTrackIndex: null,
  selectedTags: [],
  filteredPieces: [],
  isVideoPopupOpened: false,
  setVideoID: () => {},
  setSelectedTags: () => {},
  setIsVideoPopupOpened: () => {},
  setSelectedTrackIndex: () => {},
};

export const TABLE_COLUMNS_MOBILE = 2;
export const TABLE_COLUMNS_DESKTOP = 3;

export const TRACK_LEFT_MARGIN_MOBILE = 8;
export const TRACK_LEFT_MARGIN_DESKTOP = 16;

export const TRACK_TOP_MARGIN_MOBILE = 8;
export const TRACK_TOP_MARGIN_DESKTOP = 2;

export const SCROLL_WIDTH_MOBILE = 0;
export const SCROLL_WIDTH_DESKTOP = 13;

export const TRACK_ASPECT_RATIO = 190.5 / 211.12;
