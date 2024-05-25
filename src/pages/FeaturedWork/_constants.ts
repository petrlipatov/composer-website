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
    tags: ["Film"],
    imageSrc: "/images/projects/project1.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
      {
        name: "Glowing Dreams",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Journey into Twilight Forest",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Stardust1",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
      {
        name: "Stardust2",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #2",
    genre: "TV Drama",
    year: "2021",
    tags: ["Ad"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "Echoes of Eternity",
        imageSrc: "/images/track1.webp",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Dance of Fiery Petals",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Melody of Celestial Spheres",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
      {
        name: "Moonlit Glow over the Ocean",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Secrets of Forgotten Temples",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #3",
    genre: "TV Drama",
    year: "2021",
    tags: ["Mystery", "Thriller"],
    imageSrc: "/images/projects/project1.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "Whirlwind of Thoughts",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Call of Distant Galaxies",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Quest for Lost Echo",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #4",
    genre: "TV Drama",
    year: "2021",
    tags: ["Piano", "Orchestral", "Vintage"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #5",
    genre: "TV Drama",
    year: "2021",
    tags: ["Comedy", "Action"],
    imageSrc: "/images/projects/project1.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #6",
    genre: "TV Drama",
    year: "2021",
    tags: ["Game", "Fantasy"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #7",
    genre: "TV Drama",
    year: "2021",
    tags: ["Game", "Fantasy"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #8",
    genre: "TV Drama",
    year: "2021",
    tags: ["Game", "Fantasy"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #9",
    genre: "TV Drama",
    year: "2021",
    tags: ["Game", "Fantasy"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #10",
    genre: "TV Drama",
    year: "2021",
    tags: ["Game", "Fantasy"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #11",
    genre: "TV Drama",
    year: "2021",
    tags: ["Game", "Fantasy"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
      },
    ],
  },
  {
    name: "Project #12",
    genre: "TV Drama",
    year: "2021",
    tags: ["Game", "Fantasy"],
    imageSrc: "/images/projects/project2.webp",
    videoSrc: "u0dBG0AL3Cs",
    tracks: [
      {
        name: "I Thought It Would Be Fun",
        audioSrc: "/audio/Free_Test_Data_2MB_MP3.mp3",
        duration: "3:00",
      },
      {
        name: "Worn Out",
        audioSrc: "/audio/Theory-of-Light-Master.mp3",
        duration: "3:00",
      },
      {
        name: "Threat Serenade",
        audioSrc: "/audio/GOING-FAR-AWAY-_VINTAGE-HARMONY__1_.mp3",
        duration: "3:00",
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
