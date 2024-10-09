import { Page } from "./Sections/Page";
import { Content } from "./Sections/Content";
import { Tags } from "./Sections/Tags";
import { PiecesContext } from "./Sections/PiecesContext";
import { AudioTracks } from "./Sections/AudioTracks";
import { Header } from "@/components/Header";
import { PAGES } from "@/utils/constants";

export default function Pieces() {
  return (
    <PiecesContext>
      <Page>
        <Content>
          <Header>{PAGES.pieces}</Header>
          <Tags />
          <AudioTracks />
        </Content>
      </Page>
    </PiecesContext>
  );
}
