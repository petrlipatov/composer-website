import PiecesMobile from "./Mobile/PiecesMobile";
// import { useContext } from "react";
// import { ScreenSizeContext } from "../../components/Layout/Layout";

// import Logo from "../../components/Logo/Logo";

function Pieces() {
  // const screenSize = useContext(ScreenSizeContext);

  return (
    <div>
      <PiecesMobile />
    </div>
  );
}

export default Pieces;

// return (
//   <>
//     {screenSize.width < 480 ? <PortfolioMobile /> : <div>Desktop comp</div>}
//   </>
// );
