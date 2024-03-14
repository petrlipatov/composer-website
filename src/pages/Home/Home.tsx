import MobileHome from "./Mobile/MobileHome";
import { useContext } from "react";
import { ScreenSizeContext } from "../../components/Layout/Layout";

export default function Home() {
  const screenSize = useContext(ScreenSizeContext);
  return (
    <>{screenSize.width < 420 ? <MobileHome /> : <div>Desktop comp</div>}</>
  );
}
