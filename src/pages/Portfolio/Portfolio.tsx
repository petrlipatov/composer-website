import PortfolioMobile from "./Mobile/PortfolioMobile";
import { useContext } from "react";
import { ScreenSizeContext } from "../../components/Layout/Layout";

function Portfolio() {
  const screenSize = useContext(ScreenSizeContext);

  return (
    <>
      {screenSize.width < 480 ? <PortfolioMobile /> : <div>Desktop comp</div>}
    </>
  );
}

export default Portfolio;
