import { MutableRefObject } from "react";
import { ContextTypes } from "./_types";
import { PLAYER_STATUS, SHOWREEL_YT_ID } from "../../utils/constants";

export const PROJECTS_GENRES = [
  "Film",
  "Commercial",
  "Video Game",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Drama",
  "Art",
  "Comedy",
  "Action",
];

export const PROJECTS = [
  {
    name: "Six Empty Seats",
    genre: "TV Drama",
    year: "2021",
    tags: ["Film", "Drama", "Mystery", "Action", "Thriller"],
    image: "/images/projects/six-empty-seats.webp",
    video: SHOWREEL_YT_ID,
    tracks: [
      {
        name: "Confusion",
        audio: "/audio/confusion.mp3",
        duration: "1:46",
      },
      {
        name: "Desolation",
        audio: "/audio/desolation.mp3",
        duration: "0:45",
      },
    ],
  },
  {
    name: "The Teachers",
    genre: "TV Drama",
    year: "2019",
    tags: ["Film", "Drama"],
    image: "/images/projects/teachers.webp",
    video: SHOWREEL_YT_ID,
    tracks: [
      {
        name: "Long Happy Life (by GROB)",
        audio: "/audio/long-happy-life-by-grob.mp3",
        duration: "1:16",
      },
      {
        name: "Moya Oborona (by GROB)",
        audio: "/audio/moya-oborona-by-grob.mp3",
        duration: "1:16",
      },
      {
        name: "Realisation",
        audio: "/audio/realisation.mp3",
        duration: "1:16",
      },
      {
        name: "Turn Of Events",
        audio: "/audio/turn-of-events.mp3",
        duration: "2:57",
      },
    ],
  },
  {
    name: "Call Center",
    genre: "TV Series",
    year: "2020",
    tags: ["Film", "Drama", "Mystery", "Action", "Thriller"],
    image: "/images/projects/call-center.webp",
    video: SHOWREEL_YT_ID,
    tracks: [
      {
        name: "Count Down",
        audio: "/audio/count-down.mp3",
        duration: "0:11",
      },
      {
        name: "Into Action",
        audio: "/audio/into-action.mp3",
        duration: "2:39",
      },
      {
        name: "Unfixable",
        audio: "/audio/unfixible.mp3",
        duration: "1:51",
      },
      {
        name: "Rejection",
        audio: "/audio/rejection.mp3",
        duration: "0:56",
      },
      {
        name: "Over",
        audio: "/audio/over.mp3",
        duration: "2:07",
      },
    ],
  },
  {
    name: "Scrunchie",
    genre: "Film",
    year: "2021",
    tags: ["Film", "Drama", "Comedy"],
    image: "/images/projects/scrunchie.webp",
    video: SHOWREEL_YT_ID,
    tracks: [
      {
        name: "Attraction",
        audio: "/audio/attraction.mp3",
        duration: "1:34",
      },
      {
        name: "Passion",
        audio: "/audio/passion.mp3",
        duration: "1:09",
      },
    ],
  },
  {
    name: "To The Lake",
    genre: "Film",
    year: "2019",
    tags: ["Film", "Drama", "Action", "Thriller"],
    image: "/images/projects/to-the-lake.webp",
    video: SHOWREEL_YT_ID,
    tracks: [
      {
        name: "Keep It Low",
        audio: "/audio/keep-it-low.mp3",
        duration: "1:15",
      },
      {
        name: "Danger Alert",
        audio: "/audio/danger-alert.mp3",
        duration: "0:56",
      },
    ],
  },
  {
    name: "Exclusion Zone",
    genre: "TV Series",
    year: "2019",
    tags: ["Film", "Drama", "Mystery", "Action", "Fantasy"],
    image: "/images/projects/exclusion-zone.webp",
    video: SHOWREEL_YT_ID,
    tracks: [
      {
        name: "Never",
        audio: "/audio/never.mp3",
        duration: "2:46",
      },
    ],
  },
  {
    name: "Horizon",
    genre: "TV Series",
    year: "2020",
    tags: ["Film", "Drama", "Mystery", "Action", "Thriller"],
    image: "/images/projects/horizon.webp",
    video: SHOWREEL_YT_ID,
    tracks: [
      {
        name: "Closer to the light",
        audio: "/audio/closer-to-the-light.mp3",
        duration: "0:32",
      },
      {
        name: "Distorted",
        audio: "/audio/distorted.mp3",
        duration: "0:42",
      },
      {
        name: "Relief",
        audio: "/audio/relief.mp3",
        duration: "1:58",
      },
    ],
  },
  {
    name: "One Day More",
    genre: "Video Game",
    year: "2021",
    tags: ["Video Game", "Fantasy", "Art", "Comedy"],
    image: "/images/projects/one-day-more.webp",
    video: "gJ9TwQn8awc",
    tracks: [
      {
        name: "Rehearsals",
        audio: "/audio/rehearsals.mp3",
        duration: "1:00",
      },
      {
        name: "Fantasy Afternoon",
        audio: "/audio/fantasy-afternoon.mp3",
        duration: "0:59",
      },
      {
        name: "Rush",
        audio: "/audio/rush.mp3",
        duration: "1:26",
      },
      {
        name: "Shadow Upon All",
        audio: "/audio/shadow-upon-all.mp3",
        duration: "3:05",
      },
      {
        name: "Electrification",
        audio: "/audio/electification.mp3",
        duration: "0:58",
      },
      {
        name: "Crispy Streets",
        audio: "/audio/crispy-streets.mp3",
        duration: "2:05",
      },
      {
        name: "Naive Sunlight",
        audio: "/audio/naive-sunlight.mp3",
        duration: "1:50",
      },
      {
        name: "See Ya",
        audio: "/audio/see-ya.mp3",
        duration: "1:48",
      },
      {
        name: "Woops",
        audio: "/audio/woops.mp3",
        duration: "1:38",
      },
    ],
  },
  {
    name: "Trains",
    genre: "Video Game",
    year: "2024",
    tags: ["Video Game", "Mystery", "Action", "Fantasy"],
    image: "/images/projects/trains.webp",
    video: "Mf5iJuDOZQw",
    tracks: [
      {
        name: "Pain Killer",
        audio: "/audio/pain-killer.mp3",
        duration: "0:47",
      },
    ],
  },
  {
    name: "Disha Zhang's Showcase",
    genre: "Dance Show Trailer",
    year: "2018",
    tags: ["Commercial", "Art", "Comedy"],
    image: "/images/projects/disha-zhangs.webp",
    video: "DEJJk2ZAh48",
    tracks: [
      {
        name: "Laundry Day",
        audio: "/audio/laundry-day.mp3",
        duration: "1:21",
      },
    ],
  },
  {
    name: "Solomon's Showcase",
    genre: "Dance Show Trailer",
    year: "2018",
    tags: ["Commercial", "Drama", "Art"],
    image: "/images/projects/solomon.webp",
    video: "_tZlL1URPSM",
    tracks: [
      {
        name: "Slow and Curious",
        audio: "/audio/slow-and-curious.mp3",
        duration: "1:58",
      },
    ],
  },
  {
    name: "Intersection Point",
    genre: "Dance Show Trailer",
    year: "2017",
    tags: ["Commercial", "Drama", "Art", "Action"],
    image: "/images/projects/intersection-point.webp",
    video: "s9qQPGEb1Bg",
    tracks: [
      {
        name: "Intersection Point",
        audio: "/audio/intersection-point.mp3",
        duration: "0:59",
      },
    ],
  },
  {
    name: "ProTrener",
    genre: "Commercial",
    year: "2021",
    tags: ["Commercial", "Action"],
    image: "/images/projects/protrener.webp",
    video: "2yrESIMpcOc",
    tracks: [
      {
        name: "Breakthrough",
        audio: "/audio/breakthrough.mp3",
        duration: "5:23",
      },
      {
        name: "Crunchy",
        audio: "/audio/crunchy.mp3",
        duration: "3:18",
      },
      {
        name: "Step By Step",
        audio: "/audio/step-by-step.mp3",
        duration: "2:56",
      },
      {
        name: "Wake Up",
        audio: "/audio/wake-up.mp3",
        duration: "2:10",
      },
      {
        name: "Workout Season",
        audio: "/audio/workout-season.mp3",
        duration: "1:32",
      },
    ],
  },
  {
    name: "Ikea",
    genre: "Commercial",
    year: "2014, 2018",
    tags: ["Commercial", "Comedy"],
    image: "/images/projects/ikea.webp",
    video: "M9TZrDk7VCFyR4mG",
    tracks: [
      {
        name: "Don't You Dare",
        audio: "/audio/don't-you-dare.mp3",
        duration: "0:31",
      },
      {
        name: "Sunflakes",
        audio: "/audio/sunflakes.mp3",
        duration: "4:42",
      },
    ],
  },
  {
    name: "Marsh",
    genre: "Commercial",
    year: "2016",
    tags: ["Commercial", "Action", "Art"],
    image: "/images/projects/marsh.webp",
    video: "BbGFUthSN9U",
    tracks: [
      {
        name: "Blib",
        audio: "/audio/blip.mp3",
        duration: "1:12",
      },
    ],
  },
];

export const DEFAULT_CONTEXT: ContextTypes = {
  videoID: "",
  selectedTags: [],
  player: {
    status: PLAYER_STATUS.PAUSED,
    data: {
      name: "",
      genre: "",
      year: "",
      image: "",
      video: "",
      tags: [],
      tracks: [],
    },
    selectedTrackIndex: null,
    isOpened: false,
  },
  filteredProjects: [],
  audioPlayerRef: {
    current: null,
  } as MutableRefObject<HTMLAudioElement | null>,
  selectedProjectIndex: null,

  setSelectedTags: () => {},
  setVideoID: () => {},
  setIsVideoPopupOpened: () => {},
  setSelectedProjectIndex: () => {},
  dispatchPlayerAction: () => {},
};

export const TABLE_COLUMNS_MOBILE = 2;
export const TABLE_COLUMNS_DESKTOP = 3;

export const PROJECT_LEFT_MARGIN_MOBILE = 8;
export const PROJECT_LEFT_MARGIN_DESKTOP = 12;

export const PROJECT_TOP_MARGIN_MOBILE = 4;
export const PROJECT_TOP_MARGIN_DESKTOP = 16;

export const PROJECT_ASPECT_RATIO_MOBILE = 0.65;
export const PROJECT_ASPECT_RATIO_DESKTOP = 0.7;
