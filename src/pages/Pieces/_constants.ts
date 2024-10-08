import { SHOWREEL_YT_ID } from "../../utils/constants";
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
    image: "/images/pieces/cats-and-dogs.webp",
    audio: "/audio/cats-and-dogs.mp3",
    video: SHOWREEL_YT_ID,
  },
  {
    name: "Dance Ballet",
    tags: ["Easy", "Folkish", "Lyrics", "Vibrant"],
    image: "/images/pieces/dance-ballet.webp",
    audio: "/audio/dance-ballet.mp3",
    video: "_m8Im8d2Lnk",
  },
  {
    name: "Day In May",
    tags: ["Lyrics", "Piano", "Smooth", "Vibrant"],
    image: "/images/pieces/day-in-may.webp",
    audio: "/audio/day-in-may.mp3",
    video: "7Xg8likIl5k",
  },
  {
    name: "Everyman's Thoughts",
    tags: ["No lyrics", "Misty", "Smooth", "Piano"],
    image: "/images/pieces/everymans-thoughts.webp",
    audio: "/audio/everymens-thoughts.mp3",
    video: "F3ix2q9BCrU",
  },
  {
    name: "Full Of Wondering",
    tags: ["No lyrics", "Misty", "Electronic", "Piano", "Smooth"],
    image: "/images/pieces/full-of-wondering.webp",
    audio: "/audio/full-of-wodering.mp3",
    video: SHOWREEL_YT_ID,
  },
  {
    name: "Functional",
    tags: ["Electronic", "Lyrics", "Eccentric", "Intense", "Vibrant", "Dark"],
    image: "/images/pieces/functional.webp",
    audio: "/audio/functional.mp3",
    video: "-AgpIzB6b0A",
  },
  {
    name: "Going Far Away",
    tags: ["Lyrics", "Folkish", "Vintage", "Misty", "Easy"],
    image: "/images/pieces/going-far-away.webp",
    audio: "/audio/going-far-away.mp3",
    video: SHOWREEL_YT_ID,
  },
  {
    name: "I Don't know",
    tags: ["Eccentric", "Vibrant", "Folkish", "Lyrics", "Piano"],
    image: "/images/pieces/i-dont-know.webp",
    audio: "/audio/i-dont-know.mp3",
    video: "MrHxTiygKts",
  },
  {
    name: "I Thought It Would Be fun",
    tags: ["Smooth", "Translucent", "Lyrics", "Piano"],
    image: "/images/pieces/i-thought-it-would-be-fun.webp",
    audio: "/audio/i-thought-it-would-be-fun.mp3",
    video: "A3FFk9WAqt0",
  },
  {
    name: "Journey Around The Fortune",
    tags: ["No lyrics", "Intense", "Misty", "Easy", "Folkish", "Vintage"],
    image: "/images/pieces/journey-around-the-fortune.webp",
    audio: "/audio/journey-around-the-fortune.mp3",
    video: SHOWREEL_YT_ID,
  },
  {
    name: "Piano Play",
    tags: ["No lyrics", "Intense", "Dark", "Misty", "Piano", "Orchestral"],
    image: "/images/pieces/piano-play.webp",
    audio: "/audio/piano-play.mp3",
    video: SHOWREEL_YT_ID,
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
    audio: "/audio/plavno.mp3",
    video: "A39qBuer1T4",
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
    audio: "/audio/power-drip.mp3",
    video: "SeLDca5TCw8",
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
    audio: "/audio/pulse.mp3",
    video: "2gngOKKHxFs",
  },
  {
    name: "Revival Of The Unknown",
    tags: ["No lyrics", "Epic", "Vibrant", "Dark", "Orchestral"],
    image: "/images/pieces/revival-of-the-unknown.webp",
    audio: "/audio/revival-of-the-unknown.mp3",
    video: "tFB_pqg_HTY",
  },
  {
    name: "Soon",
    tags: ["Electronic", "Misty", "Easy", "Smooth", "Translucent", "Lyrics"],
    image: "/images/pieces/soon.webp",
    audio: "/audio/skoro.mp3",
    video: "y3-9oUOCoKM",
  },
  {
    name: "The End Of Patiance",
    tags: ["No lyrics", "Intense", "Misty", "Piano"],
    image: "/images/pieces/the-end-of-patiance.webp",
    audio: "/audio/the-end-of-patience.mp3",
    video: SHOWREEL_YT_ID,
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
    audio: "/audio/threat-serenade.mp3",
    video: SHOWREEL_YT_ID,
  },
  {
    name: "Tomorrow",
    tags: ["Eccentric", "Vibrant", "Epic", "Lyrics", "Piano", "Orchestral"],
    image: "/images/pieces/tomorrow.webp",
    audio: "/audio/tomorrow.mp3",
    video: "MrHxTiygKts",
  },
  {
    name: "Worn Out",
    tags: ["Dark", "Misty", "No lyrics", "Vintage"],
    image: "/images/pieces/worn-out.webp",
    audio: "/audio/worn-out.mp3",
    video: SHOWREEL_YT_ID,
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
export const SCROLL_WIDTH_DESKTOP = 15;

export const TRACK_ASPECT_RATIO = 190.5 / 211.12;
