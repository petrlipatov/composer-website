import { Header } from "@/components/Header";
import { Tags } from "./Sections/Tags/Tags";
import { Projects } from "./Sections/Projects";
import { Page } from "./Sections/Page";
import { Content } from "./Sections/Content";
import { FeaturedWorkContextProvider } from "./Sections/FeaturedWorkContext";
import { PAGES } from "@/utils/constants";

function FeaturedWork() {
  return (
    <FeaturedWorkContextProvider>
      <Page>
        <Content>
          <Header>{PAGES.featured}</Header>
          <Tags />
          <Projects />
        </Content>
      </Page>
    </FeaturedWorkContextProvider>
  );
}

export default FeaturedWork;
