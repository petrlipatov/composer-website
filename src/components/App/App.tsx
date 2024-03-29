import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader";

const Home = lazy(() => import("../../pages/Home/Home"));
const Pieces = lazy(() => import("../../pages/Pieces/Pieces"));
const Info = lazy(() => import("../../pages/Info/Info"));
const FeaturedWork = lazy(
  () => import("../../pages/FeaturedWork/FeaturedWork")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Preloader content={"🦙"} />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="/pieces"
          element={
            <Suspense fallback={<Preloader content={"🦙"} />}>
              <Pieces />
            </Suspense>
          }
        />

        <Route
          path="/work"
          element={
            <Suspense fallback={<Preloader content={"🦙"} />}>
              <FeaturedWork />
            </Suspense>
          }
        />

        <Route
          path="/info"
          element={
            <Suspense fallback={<Preloader content={"🦙"} />}>
              <Info />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
