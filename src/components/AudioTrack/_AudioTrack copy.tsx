// import s from "./AudioTrack.module.css";
// import playSrc from "../../assets/images/play-button.svg";
// import {
//   useState,
//   forwardRef,
//   RefObject,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import imgSrc from "../../assets/images/imgPlayer.webp";
// import AudioPlayerView from "../AudioPlayerView/AudioPlayerView";

// type AudioTrackProps = {
//   index: number;
//   name: string;
//   link: string;
//   isAudioTrackSelected: boolean;
//   setSelectedAudioTrack: Dispatch<SetStateAction<number>>;
// };

// const AudioTrack = forwardRef(
//   (
//     {
//       index,
//       name,
//       link,
//       isAudioTrackSelected,
//       setSelectedAudioTrack,
//     }: AudioTrackProps,
//     ref: RefObject<HTMLAudioElement>
//   ) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const handleTrackClick = () => {
//       setIsOpen(!isOpen);
//     };

//     return (
//       <div className={s.audioElementContainer}>
//         <div className={s.trackLabel} onClick={handleTrackClick}>
//           <img
//             className={s.playButton}
//             style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
//             src={playSrc}
//             alt="play-logo"
//           />
//           <p className={s.title}>{`${name}`}</p>
//         </div>

//         <div
//           className={s.contentContainer}
//           style={{ display: isOpen ? "flex" : "none" }}
//         >
//           <div className={s.content}>
//             <div className={s.audioPlayerContainer}>
//               <AudioPlayerView
//                 index={index}
//                 link={link}
//                 isAudioTrackSelected={isAudioTrackSelected}
//                 setSelectedAudioTrack={setSelectedAudioTrack}
//                 ref={ref}
//               />
//             </div>
//             <img className={s.videoPlayer} src={imgSrc} loading="lazy" />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default AudioTrack;
