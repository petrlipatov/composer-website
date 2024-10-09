import { useState } from "react";

import { Menu } from "./Sections/Menu";
import { Page } from "./Sections/Page";
import { Content } from "./Sections/Content";
import { BackgroundImages } from "./Sections/BackgroundImages";

import { Logo } from "@/components/Logo";
import { VideoPopup } from "@/components/VideoPopup";
import { SHOWREEL_YT_ID } from "@/utils/constants";

export default function Home() {
  const [isPopupOpened, setPopupState] = useState(false);

  function openPopup() {
    setPopupState(true);
  }

  return (
    <Page>
      <Content>
        <Logo />
        <Menu openPopup={openPopup} />
        <BackgroundImages />

        {isPopupOpened && (
          <VideoPopup
            videoID={SHOWREEL_YT_ID}
            setIsVideoPopupOpened={setPopupState}
          />
        )}
      </Content>
    </Page>
  );
}
