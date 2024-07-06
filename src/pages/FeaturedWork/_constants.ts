import { MutableRefObject } from "react";
import { ContextTypes } from "./_types";

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
    imageSrc: "/images/projects/six-empty-seats.webp",
    videoSrc: "",
    tracks: [
      {
        name: "Confusion",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:46",
      },
      {
        name: "Desolation",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "0:45",
      },
    ],
  },
  {
    name: "The Teachers",
    genre: "TV Drama",
    year: "2019",
    tags: ["Film", "Drama"],
    imageSrc: "/images/projects/teachers.webp",
    videoSrc: "",
    tracks: [
      {
        name: "Long Happy Life (by GROB)",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:16",
      },
      {
        name: "Moya Oborona (by GROB)",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "1:16",
      },
      {
        name: "Realisation",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "1:16",
      },
      {
        name: "Turn Of Events",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "2:57",
      },
    ],
  },
  {
    name: "Call Center",
    genre: "TV Series",
    year: "2020",
    tags: ["Film", "Drama", "Mystery", "Action", "Thriller"],
    imageSrc: "/images/projects/call-center.webp",
    videoSrc: "",
    tracks: [
      {
        name: "Count Down",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "0:11",
      },
      {
        name: "Into Action",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "2:39",
      },
      {
        name: "Unfixable",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "1:51",
      },
      {
        name: "Rejection",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "0:56",
      },
      {
        name: "Over",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "2:07",
      },
    ],
  },
  {
    name: "Scrunchie",
    genre: "Film",
    year: "2021",
    tags: ["Film", "Drama", "Comedy"],
    imageSrc: "/images/projects/scrunchie.webp",
    videoSrc: "",
    tracks: [
      {
        name: "Attraction",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:34",
      },
      {
        name: "Passion",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "1:09",
      },
    ],
  },
  {
    name: "To The Lake",
    genre: "Film",
    year: "2019",
    tags: ["Film", "Drama", "Action", "Thriller"],
    imageSrc: "/images/projects/to-the-lake.webp",
    videoSrc: "",
    tracks: [
      {
        name: "Keep It Low",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:15",
      },
      {
        name: "Danger Alert",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "0:56",
      },
    ],
  },
  {
    name: "Exclusion Zone",
    genre: "TV Series",
    year: "2019",
    tags: ["Film", "Drama", "Mystery", "Action", "Fantasy"],
    imageSrc: "/images/projects/exclusion-zone.webp",
    videoSrc: "",
    tracks: [
      {
        name: "Never",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "2:46",
      },
    ],
  },
  {
    name: "Horizon",
    genre: "TV Series",
    year: "2020",
    tags: ["Film", "Drama", "Mystery", "Action", "Thriller"],
    imageSrc: "/images/projects/horizon.webp",
    videoSrc: "",
    tracks: [
      {
        name: "Closer to the light",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "0:32",
      },
      {
        name: "Distorted",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "0:42",
      },
      {
        name: "Relief",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "1:58",
      },
    ],
  },
  {
    name: "One Day More",
    genre: "Video Game",
    year: "2021",
    tags: ["Video Game", "Fantasy", "Art", "Comedy"],
    imageSrc: "/images/projects/one-day-more.webp",
    videoSrc: "gJ9TwQn8awc",
    tracks: [
      {
        name: "Rehearsals",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:00",
      },
      {
        name: "Fantasy Afternoon",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "0:59",
      },
      {
        name: "Rush",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "1:26",
      },
      {
        name: "Shadow Upon All",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:05",
      },
      {
        name: "Electrification",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "0:58",
      },
      {
        name: "Crispy Streets",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "2:05",
      },
      {
        name: "Naive Sunlight",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:50",
      },
      {
        name: "See Ya",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "1:48",
      },
      {
        name: "Woops",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "1:38",
      },
    ],
  },
  {
    name: "Trains",
    genre: "Video Game",
    year: "2024",
    tags: ["Video Game", "Mystery", "Action", "Fantasy"],
    imageSrc: "/images/projects/trains.webp",
    videoSrc: "Mf5iJuDOZQw",
    tracks: [
      {
        name: "Pain Killer",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "0:47",
      },
    ],
  },
  {
    name: "Disha Zhang's Showcase",
    genre: "Dance Show Trailer",
    year: "2018",
    tags: ["Commercial", "Art", "Comedy"],
    imageSrc: "/images/projects/disha-zhangs.webp",
    videoSrc: "DEJJk2ZAh48",
    tracks: [
      {
        name: "Laundry Day",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "1:21",
      },
    ],
  },
  {
    name: "Solomon's Showcase",
    genre: "Dance Show Trailer",
    year: "2018",
    tags: ["Commercial", "Drama", "Art"],
    imageSrc: "/images/projects/solomon.webp",
    videoSrc: "_tZlL1URPSM",
    tracks: [
      {
        name: "Slow and Curious",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:58",
      },
    ],
  },
  {
    name: "Intersection Point",
    genre: "Dance Show Trailer",
    year: "2017",
    tags: ["Commercial", "Drama", "Art", "Action"],
    imageSrc: "/images/projects/intersection-point.webp",
    videoSrc: "s9qQPGEb1Bg",
    tracks: [
      {
        name: "Intersection Point",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "0:59",
      },
    ],
  },
  {
    name: "ProTrener",
    genre: "Commercial",
    year: "2021",
    tags: ["Commercial", "Action"],
    imageSrc: "/images/projects/protrener.webp",
    videoSrc: "2yrESIMpcOc",
    tracks: [
      {
        name: "Breakthrough",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "5:23",
      },
      {
        name: "Crunchy",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:18",
      },
      {
        name: "Step By Step",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "2:56",
      },
      {
        name: "Wake Up",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "2:10",
      },
      {
        name: "Workout Season",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "1:32",
      },
    ],
  },
  {
    name: "Ikea",
    genre: "Commercial",
    year: "2014, 2018",
    tags: ["Commercial", "Comedy"],
    imageSrc: "/images/projects/ikea.webp",
    videoSrc: "M9TZrDk7VCFyR4mG",
    tracks: [
      {
        name: "Don't You Dare",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "0:31",
      },
      {
        name: "Sunflakes",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "4:42",
      },
    ],
  },
  {
    name: "Marsh",
    genre: "Commercial",
    year: "2016",
    tags: ["Commercial", "Action", "Art"],
    imageSrc: "/images/projects/marsh.webp",
    videoSrc: "BbGFUthSN9U",
    tracks: [
      {
        name: "Blib",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "1:12",
      },
    ],
  },
];

export const DEFAULT_CONTEXT: ContextTypes = {
  videoID: "",
  isPlayerOpened: false,
  selectedTags: [],
  currentProject: {
    name: "",
    genre: "",
    year: "",
    imageSrc: "",
    videoSrc: "",
    tags: [],
    tracks: [],
  },
  filteredProjects: [],
  audioPlayerRef: {
    current: null,
  } as MutableRefObject<HTMLAudioElement | null>,
  selectedProjectIndex: null,
  selectedTrackIndex: null,
  setSelectedTags: () => {},
  setCurrentProject: () => {},
  setVideoID: () => {},
  setIsPlayerOpened: () => {},
  setIsVideoPopupOpened: () => {},
  setSelectedProjectIndex: () => {},
  setSelectedTrackIndex: () => {},
};

export const TABLE_COLUMNS_MOBILE = 2;
export const TABLE_COLUMNS_DESKTOP = 3;

export const PROJECT_LEFT_MARGIN_MOBILE = 8;
export const PROJECT_LEFT_MARGIN_DESKTOP = 16;

export const PROJECT_TOP_MARGIN_MOBILE = 4;
export const PROJECT_TOP_MARGIN_DESKTOP = 16;

export const PROJECT_ASPECT_RATIO_MOBILE = 0.65;
export const PROJECT_ASPECT_RATIO_DESKTOP = 0.7;
